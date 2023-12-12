import { observer } from "mobx-react-lite";
import { Projects as Project } from "../../gql/graphql";
import TestObjective from "./test_components/configuration/TestObjective";
import { useLocation, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ProjectFacebookAudienceContext, ProjectsContext } from "../../stores/stores";
import { useMutation } from "@tanstack/react-query";
import _ from "lodash";
import TestBranding from "./test_components/configuration/TestBranding";
import TestPlatform from "./test_components/configuration/TestPlatform";
import TestRuntime from "./test_components/configuration/TestRuntime";
import TestAudience from "./test_components/configuration/TestAudience";
import TestCreatives from "./test_components/creative/TestCreatives";
import TestLandingPages from "./test_components/creative/TestLandingPages";
import '../../css/project_draft.css'
import TestThemes from "./test_components/creative/TestThemes";
import ProjectFacebookCreativeTemplateDetail from '../../pages/projects/ProjectFacebookCreativeTemplateDetail'
import TestMatrixEditor from './test_components/creative/TestMatrixEditor'
import TestMatrix from "./test_components/creative/TestMatrix";
import UserReview from "./test_components/review/UserReview";
import ProjectStepContainer from "./ProjectStepContainer";

export interface NextButtonConfig {
  name: string,
  onNext: () => void
}

export interface ProjectDraftMenu {
  label: string,
  value: string,
  icon: string,
  steps?: number[],
  overrideNext?: NextButtonConfig,
  goToStep?: () => number,
  isComplete?: boolean,
  children?: ProjectDraftMenu[]
}

const ProjectDraft = observer(({ project, onUpdate }: { project: Project, onUpdate: () => void }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const projectStore = useContext(ProjectsContext)
  const projectFacebookAudienceStore = useContext(ProjectFacebookAudienceContext)
  const [audienceComplete, setAudienceComplete] = useState(false)
  const [adTemplateComplete, setAdTemplateComplete] = useState(false)
  const [updatedAt, setUpdatedAt] = useState(project.updated_at)
  const [projectFacebookCreativeTemplateId, setProjectFacebookCreativeTemplateId] = useState('')
  const [step, setStep] = useState(parseInt(searchParams.get('step') || '1'))
  const [currentStepItem, setCurrentStepItem] = useState<ProjectDraftMenu | null | undefined>()
  const projectMutation = useMutation({
    mutationFn: (payload: object) => projectStore.updateProject({ id: project.id, payload: payload as Project }),
    onSuccess: (data) => {
      if (data) {
        setUpdatedAt(Date.now());
        onUpdate();
        findCurrentStepItem(configurationMenu)
      }
    }
  })
  const onSave = _.debounce((payload: object) => {
    projectMutation.mutate(payload)
  }, 1000)
  const configurationMenu: ProjectDraftMenu[] = [{
    label: 'Configuration',
    value: 'configuration',
    icon: 'mdi mdi-cog',
    children: [
      {
        label: 'Test Objective',
        steps: [1],
        isComplete: Boolean(project.name && project.objective),
        value: 'test_objective',
        icon: 'mdi mdi-flask-outline'
      },
      {
        label: 'Brandness',
        value: 'brandness',
        steps: [2],
        isComplete: Boolean(project.branding),
        icon: 'mdi mdi-brush-variant'
      },
      {
        label: 'Platform',
        value: 'platform',
        steps: [3],
        isComplete: Boolean(project.platform),
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
        isComplete: Boolean(project.start_time && project.stop_time),
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
        isComplete: Boolean(project.themes?.length > 2),
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
    overrideNext: {
      name: 'Submit for review',
      onNext: () => projectStore.sendReviewCompleteSlackMessage({ projectId: project.id, returnUrl: window.location.href })
    }
  },
  {
    label: 'Publish',
    value: 'publish',
    icon: 'mdi mdi-send-outline',
    children: [],
    steps: [13]
  }]

  function isReviewComplete () {
    if (!project.name_approved || !project.platform_approved || !project.brandness_approved || !project.project_type_approved || !project.start_stop_time_approved || !project.objective_approved) {
      return false
    }
    if (_.find(project.themes, (theme) => !theme.approved)) {
      return false
    }
    if (_.find(project.landing_pages, (page) => !page.approved)) {
      return false
    }
    return true
  }
  function goToAdCopyStep() {
    if (project.themes && project?.themes.length > 2) {
      if (project.themes[0].angles[0]?.facebook_creatives[0]) {
        return 10
      }
      return 9
    }
    return 8
  }
  function findCurrentStepItem(items: ProjectDraftMenu[]) {
    for (const item of items) {
      if (item.steps?.includes(step)) {
        setCurrentStepItem({ ...item })
        return
      } else if (item.children) {
        findCurrentStepItem(item.children)
      }
    }
  }
  useEffect(() => {
    const stepParam = searchParams.get('step')
    const projectFacebookCreativeTemplateIdParam = searchParams.get('project_facebook_creative_template_id')
    if (stepParam) {
      setStep(parseInt(stepParam))
    } if (projectFacebookCreativeTemplateIdParam) {
      setProjectFacebookCreativeTemplateId(projectFacebookCreativeTemplateIdParam)
    }
    findCurrentStepItem(configurationMenu)
    onSave({}) // dummy project update
  }, [location])
  useEffect(() => {
    if (project.facebook_audiences?.length) {
      setAudienceComplete(projectFacebookAudienceStore.checkIsAudienceComplete(project.facebook_audiences[0]))
    }
    setAdTemplateComplete(project.project_facebook_creative_templates?.length ? true : false)
    findCurrentStepItem(configurationMenu)
  }, [project])
  return (
    <>
      <div className="flex flex-wrap justify-between gap-y-12 gap-x-4">
        <div className="flex-initial">
          <div className="badge p-4 ml-6 badge-success text-white">
            last updated: {new Date(updatedAt).toLocaleString()}
          </div>
          <ul className="menu w-56">
            {configurationMenu.map((item) =>
              <div key={item.value} className="flex justify-end">
                {item.steps && item.steps[0] === step && <li className="flex flex-col" style={{ background: 'linear-gradient(351deg, #AB2160 -4.8%, #EF4136 94.68%)', borderRadius: '4px 0px 0px 4px', width: 6 }}><span></span></li>}
                <li className={`w-full step-parent ${item.steps && item.steps[0] === step && 'active'}`} onClick={() => item.children?.length === 0 && setSearchParams({ step: item.steps![0].toString() })}>
                  <details open={item.children?.flatMap((item) => item.steps).includes(step)}>
                    <summary><span className={item.icon}></span>{item.label}</summary>
                    <ul>
                      {item.children?.map((child) =>
                        <li key={child.value} className={`project-menu-item ${child.steps?.includes(step) && 'active'}`} onClick={() => { setSearchParams({ step: child.goToStep ? child.goToStep().toString() : child.steps![0].toString() }) }} ><a><span className={child.icon}></span>{child.label} {child.isComplete && <span className="mdi mdi-check-circle text-success" />}</a></li>
                      )}
                    </ul>
                  </details>
                </li>
              </div>
            )}
          </ul>
        </div>
        <div className="flex-initial w-full md:w-8/12">
          {step === 1 && <ProjectStepContainer currentStepItem={currentStepItem} currentStep={step} title="What type of test are you creating"><TestObjective project={project} onSave={onSave} /></ProjectStepContainer>}
          {step === 2 && <ProjectStepContainer currentStepItem={currentStepItem} currentStep={step} title="Are you looking for an unbranded or branded test?"><TestBranding project={project} onSave={onSave} /></ProjectStepContainer>}
          {step === 3 && <ProjectStepContainer currentStepItem={currentStepItem} currentStep={step} title="Where would you like to test?"><TestPlatform project={project} onSave={onSave} /></ProjectStepContainer>}
          {step === 4 && <ProjectStepContainer currentStepItem={currentStepItem} currentStep={step} title="Create your own audience"><TestAudience project={project} onSave={onSave} onAudienceComplete={(complete: boolean) => setAudienceComplete(complete)} /></ProjectStepContainer>}
          {step === 5 && <ProjectStepContainer currentStepItem={currentStepItem} currentStep={step} title="Set your test duration"><TestRuntime project={project} onSave={onSave} /></ProjectStepContainer>}
          {step === 6 && <ProjectStepContainer currentStepItem={currentStepItem} currentStep={step} title="Choose an ad template"><TestCreatives project={project} onSave={onSave} /></ProjectStepContainer>}
          {step === 7 && projectFacebookCreativeTemplateId && <ProjectStepContainer currentStepItem={currentStepItem} currentStep={step} title="Edit/Remove your template below"><ProjectFacebookCreativeTemplateDetail projectFacebookCreativeTemplateId={projectFacebookCreativeTemplateId} /></ProjectStepContainer>}
          {step === 8 && <ProjectStepContainer currentStepItem={currentStepItem} currentStep={step} title="Answer your big questions"><TestThemes project={project} onSave={onSave} /></ProjectStepContainer>}
          {step === 9 && <ProjectStepContainer currentStepItem={currentStepItem} currentStep={step} title=""><TestMatrix project={project} onSave={onSave} /></ProjectStepContainer>}
          {step === 10 && <ProjectStepContainer currentStepItem={currentStepItem} currentStep={step} title="Build your test matrix"><TestMatrixEditor project={project} onSave={onSave} /></ProjectStepContainer>}
          {step === 11 && <ProjectStepContainer currentStepItem={currentStepItem} currentStep={step} title="Choose a landing page template"><TestLandingPages project={project} onSave={onSave} /></ProjectStepContainer>}
          {step === 12 && <ProjectStepContainer currentStepItem={currentStepItem} currentStep={step} title="Review your test"><UserReview project={project} onSave={onSave} /></ProjectStepContainer>}

        </div>
      </div>
    </>
  )
})

export default ProjectDraft