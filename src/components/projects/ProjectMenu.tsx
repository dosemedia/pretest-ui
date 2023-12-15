import { useMutation } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProjectFacebookAudienceContext, ProjectsContext } from "../../stores/stores";
import _ from "lodash";
import { ProjectDraftMenu, NextButtonConfig } from "./ProjectDraft";
import { ProjectStepChildProps } from "./ProjectStepContainer";

const ProjectMenu: React.FC<ProjectStepChildProps> = observer((props: ProjectStepChildProps) => {
  const projectStore = useContext(ProjectsContext)
  const projectFacebookAudienceStore = useContext(ProjectFacebookAudienceContext)
  const setSearchParams = useSearchParams()[1]
  const [audienceComplete] = useState(projectFacebookAudienceStore.checkIsAudienceComplete(props.project?.facebook_audiences[0]))
  const [adTemplateComplete] = useState(props.project?.project_facebook_creative_templates?.length ? true : false)
  const sendReviewCompleteMessageMutation = useMutation({
    mutationKey: ['sendReviewCompleteMessageMutation'],
    mutationFn: () => projectStore.sendReviewCompleteSlackMessage({ projectId: props.project?.id, returnUrl: window.location.href }),
    onSuccess: () => { if(props.onSave) props.onSave({}) }
  })
  const configurationMenu: ProjectDraftMenu[] = !props.project ? [] : [{
    label: 'Configuration',
    value: 'configuration',
    icon: 'mdi mdi-cog',
    children: [
      {
        label: 'Test Objective',
        steps: [1],
        isComplete: Boolean(props.project?.name && props.project?.objective),
        value: 'test_objective',
        icon: 'mdi mdi-flask-outline'
      },
      {
        label: 'Brandness',
        value: 'brandness',
        steps: [2],
        isComplete: Boolean(props.project?.branding),
        icon: 'mdi mdi-brush-variant'
      },
      {
        label: 'Platform',
        value: 'platform',
        steps: [3],
        isComplete: Boolean(props.project?.platform),
        icon: 'mdi mdi-facebook'
      },
      {
        label: 'Audience',
        value: 'audience',
        steps: [4],
        isComplete: Boolean(audienceComplete),
        icon: 'mdi mdi-account-group-outline'
      },
      {
        label: 'Runtime',
        value: 'runtime',
        steps: [5],
        isComplete: Boolean(props.project?.start_time && props.project?.stop_time),
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
        isComplete: adTemplateComplete,
        value: 'ad_template',
        icon: 'mdi mdi-image-multiple'
      },
      {
        label: 'Ad copy matrix',
        value: 'ad_copy_matrix',
        steps: [8, 9, 10],
        goToStep: () => goToAdCopyStep(),
        isComplete: Boolean(props.project?.themes?.length > 2),
        icon: 'mdi mdi-file-document-edit'
      },
      {
        label: 'Landing page',
        value: 'landing_page',
        steps: [11],
        isComplete: false,
        icon: 'mdi mdi-beaker'
      }
    ]
  },
  {
    label: 'Review',
    value: 'review',
    icon: 'mdi mdi-eye',
    steps: [12],
    children: [],
    isComplete: isReviewComplete(),
    overrideNext: props.project?.status === 'review' ? null : {
      name: 'Submit for review',
      onNext: async () => sendReviewCompleteMessageMutation.mutateAsync()
    } as NextButtonConfig
  },
  {
    label: 'Publish',
    value: 'publish',
    icon: 'mdi mdi-send-outline',
    children: [],
    steps: [13]
  }]
  function isReviewComplete() {
    if (!props.project?.name_approved || !props.project?.platform_approved || !props.project?.brandness_approved || !props.project?.project_type_approved || !props.project?.start_stop_time_approved || !props.project?.objective_approved) {
      return false
    }
    if (_.find(props.project?.themes, (theme) => !theme.approved)) {
      return false
    }
    if (_.find(props.project?.landing_pages, (page) => !page.approved)) {
      return false
    }
    return true
  }
  function goToAdCopyStep() {
    if (props.project?.themes && props.project.themes.length > 2) {
      if (props.project?.themes[0].angles[0]?.facebook_creatives[0]) {
        return 10
      }
      return 9
    }
    return 8
  }
  return (
    <>
      <div className="badge p-4 ml-6 badge-success text-white">
        last updated: {new Date(props.project?.updated_at).toLocaleString()}
      </div>
      <ul className="menu w-56">
        {configurationMenu.map((item) =>
          <div key={item.value} className="flex justify-end">
            {item.steps && item.steps[0] === props.step && <li className="flex flex-col" style={{ background: 'linear-gradient(351deg, #AB2160 -4.8%, #EF4136 94.68%)', borderRadius: '4px 0px 0px 4px', width: 6 }}><span></span></li>}
            <li className={`w-full step-parent ${item.steps && item.steps[0] === props.step && 'active'}`} onClick={() => item.children?.length === 0 && setSearchParams({ step: item.steps![0].toString() })}>
              <details open={item.children?.flatMap((item) => item.steps).includes(props.step)}>
                <summary><span className={item.icon}></span>{item.label}</summary>
                <ul>
                  {item.children?.map((child) =>
                    <li key={child.value} className={`project-menu-item ${child.steps?.includes(props.step!) && 'active'}`} onClick={() => { setSearchParams({ step: child.goToStep ? child.goToStep().toString() : child.steps![0].toString() }) }} ><a><span className={child.icon}></span>{child.label} {child.isComplete && <span className="mdi mdi-check-circle text-success" />}</a></li>
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