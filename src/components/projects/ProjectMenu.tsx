import { useMutation } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProjectFacebookAudienceContext, ProjectsContext, ToastsContext } from "../../stores/stores";
import _ from "lodash";
import { ProjectDraftMenu, NextButtonConfig } from "./ProjectDraft";
import { useEffect } from "react";
import { Projects as Project, Projects_Set_Input } from "../../gql/graphql";
import ProjectStatusView from "../lib/ProjectStatus";
import { ProjectStatus } from "../../stores/projects";
import { ToastType } from "../../stores/toast";

const ProjectMenu = observer(({ step, project, currentStep, saveProject }: { step: number, project: Project, currentStep: (arg0: ProjectDraftMenu) => void, saveProject: (arg0: Projects_Set_Input) => void}) => {
  const projectStore = useContext(ProjectsContext)
  const toastsStore = useContext(ToastsContext)
  const projectFacebookAudienceStore = useContext(ProjectFacebookAudienceContext)
  const setSearchParams = useSearchParams()[1]
  const sendReviewCompleteMessageMutation = useMutation({
    mutationKey: ['sendReviewCompleteMessageMutation'],
    mutationFn: () => projectStore.sendReviewCompleteSlackMessage({ projectId: project?.id, returnUrl: window.location.href }),
    onSuccess: () => { saveProject({}); toastsStore.addToast({ message: 'Project successfully sent for review!', type: ToastType.SUCCESS })  }
  })
  const [configurationMenu, setConfigurationMenu] = useState<ProjectDraftMenu[]>([])
  useEffect(() => {
    setConfigurationMenu([{
      label: 'Configuration',
      value: 'configuration',
      icon: 'mdi mdi-cog',
      children: [
        {
          label: 'Test Objective',
          steps: [1],
          isComplete: Boolean(project?.name && project?.objective && project?.project_type),
          value: 'test_objective',
          icon: 'mdi mdi-flask-outline'
        },
        {
          label: 'Brandness',
          value: 'brandness',
          steps: [2],
          isComplete: Boolean(project?.branding),
          icon: 'mdi mdi-brush-variant'
        },
        {
          label: 'Platform',
          value: 'platform',
          steps: [3],
          isComplete: Boolean(project?.platform),
          icon: 'mdi mdi-facebook'
        },
        {
          label: 'Audience',
          value: 'audience',
          steps: [4],
          isComplete: project.facebook_audiences.length > 0 && !project.facebook_audiences.find((item) => !projectFacebookAudienceStore.checkIsAudienceComplete(item)),
          icon: 'mdi mdi-account-group-outline'
        },
        {
          label: 'Runtime',
          value: 'runtime',
          steps: [5],
          isComplete: Boolean(project?.duration),
          icon: 'mdi mdi-clock-outline'
        }
      ]
    },
    {
      label: 'Creative',
      value: 'creative',
      icon: 'mdi mdi-brush',
      children: [
        {
          label: 'Ad template',
          steps: [6, 7],
          isComplete: Boolean(project?.project_facebook_creative_templates?.length),
          value: 'ad_template',
          icon: 'mdi mdi-image-multiple'
        },
        {
          label: 'Ad copy matrix',
          value: 'ad_copy_matrix',
          steps: [8, 9, 10],
          goToStep: () => goToAdCopyStep(),
          isComplete: Boolean(project && ((project?.themes && step === 8 && project?.themes.length > 2) || project?.themes[0]?.angles[0]?.facebook_creatives?.length > 0 )),
          icon: 'mdi mdi-file-document-edit'
        },
        {
          label: 'Landing page',
          value: 'landing_page',
          steps: [11, 12],
          isComplete: Boolean(project && project.landing_pages.length > 0),
          icon: 'mdi mdi-beaker'
        }
      ]
    },
    {
      label: 'Review',
      value: 'review',
      icon: 'mdi mdi-eye',
      steps: [13],
      children: [],
      isComplete: isReviewComplete(),
      overrideNext: project?.status !== ProjectStatus.DRAFT ? null : {
        name: 'submit for review',
        onNext: async () => sendReviewCompleteMessageMutation.mutateAsync()
      } as NextButtonConfig
    },
    {
      label: 'Publish',
      value: 'publish',
      icon: 'mdi mdi-send-outline',
      children: [],
      steps: [14]
    }])
  }, [project, step])

  function isCurrentStepComplete(menu: ProjectDraftMenu[]) {
    for (const item of menu) {
      if (item.steps?.includes(step!)) {
        currentStep(item)
      } else if (item.children) {
        isCurrentStepComplete(item.children)
      }
    }
  }
  

  useEffect(() => {
    isCurrentStepComplete([...configurationMenu])
  }, [configurationMenu, step])
  function isReviewComplete() {
    if (!project?.name_approved || !project?.platform_approved || !project?.brandness_approved || !project?.project_type_approved || !project?.duration_approved || !project?.objective_approved) {
      return false
    }
    if (_.find(project?.themes, (theme) => !theme.approved)) {
      return false
    }
    if (project?.landing_pages.length === 0 || _.find(project?.landing_pages, (page) => !page.approved)) {
      return false
    }
    return true
  }
  function goToAdCopyStep() {
    if (project?.themes && project.themes.length > 2) {
      if (project?.themes[0].angles[0]?.facebook_creatives[0]) {
        return 10
      }
      return 9
    }
    return 8
  }
  return (
    <>
      <div className="ml-6 mb-4"><ProjectStatusView project={project} /></div>
      {/* {project?.status === ProjectStatus.REVIEW && <div className="badge block ml-6 mb-4 bg-info text-white border-none">Your project is in review.</div>} */}
      <div className="badge p-4 ml-6 badge-success text-white">
        last updated: {new Date(project?.updated_at).toLocaleString()}
      </div>
      <ul className="menu w-56">
        {configurationMenu.map((item) =>
          <div key={item.value} className="flex justify-end">
            {item.steps && item.steps[0] === step && <li className="flex flex-col" style={{ background: 'linear-gradient(351deg, #AB2160 -4.8%, #EF4136 94.68%)', borderRadius: '4px 0px 0px 4px', width: 6 }}><span></span></li>}
            <li className={`w-full step-parent ${item.steps && item.steps[0] === step && 'active'}`} onClick={() => item.children?.length === 0 && setSearchParams({ step: item.steps![0].toString() })}>
              <details open={item.children?.flatMap((item) => item.steps).includes(step!)}>
                <summary><span className={item.icon}></span>{item.label}{item?.isComplete && <span className="mdi mdi-check-circle text-success" />}</summary>
                <ul>
                  {item.children?.map((child) =>
                    <li key={child.value} className={`project-menu-item ${child.steps?.includes(step!) && 'active'}`} onClick={() => { setSearchParams({ step: child.goToStep ? child.goToStep().toString() : child.steps![0].toString() }) }} ><a><span className={child.icon}></span>{child.label} {child.isComplete && <span className="mdi mdi-check-circle text-success" />}</a></li>
                  )}
                </ul>
              </details>
            </li>
          </div>
        )}
      </ul>
    </>
  )
})

export default ProjectMenu