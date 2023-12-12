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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentStepItem, setCurrentStepItem] = useState<any>()
  const projectMutation = useMutation({
    mutationFn: (payload: object) => projectStore.updateProject({ id: project.id, payload: payload as Project }),
    onSuccess: () => {
      setUpdatedAt(Date.now());
      onUpdate();
    }
  })
  const onSave = _.debounce((payload: object) => {
    projectMutation.mutate(payload)
  }, 1000)
  interface ProjectDraftMenu {
    label: string,
    value: string,
    icon: string,
    step?: number,
    children: { label: string, steps: number[], isComplete: boolean, value: string, icon: string, goToStep?: () => number }[]
  }
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
    step: 12,
    children: [
    ]
  },
  {
    label: 'Publish',
    value: 'publish',
    icon: 'mdi mdi-send-outline',
    step: 13,
    children: [
    ]
  }]
  function goToAdCopyStep() {
    if (project.themes && project?.themes.length > 2) {
      if (project.themes[0].angles[0]?.facebook_creatives[0]) {
        return 10
      }
      return 9
    }
    return 8
  }
  function findCurrentStepItem() {
    for (const item of configurationMenu) {
      for (const child of item.children) {
        if (child.steps.includes(step)) {
          setCurrentStepItem(child)
          break
        }
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
    onSave({}) // dummy project update
  }, [location])
  useEffect(() => {
    if (project.facebook_audiences?.length) {
      setAudienceComplete(projectFacebookAudienceStore.checkIsAudienceComplete(project.facebook_audiences[0]))
    }
    setAdTemplateComplete(project.project_facebook_creative_templates?.length ? true : false)
    findCurrentStepItem()
  }, [project])
  useEffect(() => {
    findCurrentStepItem()
  }, [audienceComplete, adTemplateComplete])
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
                {item.step === step && <li className="flex flex-col" style={{ background: 'linear-gradient(351deg, #AB2160 -4.8%, #EF4136 94.68%)', borderRadius: '4px 0px 0px 4px', width: 6 }}><span></span></li> }
                <li className={`w-full step-parent ${item.step === step && 'active'}`} onClick={() => item.children.length === 0 && setSearchParams({ step: item.step!.toString() })}>
                  <details open={item.children.flatMap((item) => item.steps).includes(step)}>
                    <summary><span className={item.icon}></span>{item.label}</summary>
                    <ul>
                      {item.children.map((child) =>
                        <li key={child.value} className={`project-menu-item ${child.steps?.includes(step) && 'active'}`} onClick={() => { setSearchParams({ step: child.goToStep ? child.goToStep().toString() : child.steps[0].toString() }) }} ><a><span className={child.icon}></span>{child.label} {child.isComplete && <span className="mdi mdi-check-circle text-success" />}</a></li>
                      )}
                    </ul>
                  </details>
                </li>
              </div>
            )}
          </ul>
        </div>
        <div className="flex-initial w-full md:w-8/12">
          {step === 1 && <ProjectStepContainer title="What type of test are you creating"><TestObjective project={project} onSave={onSave} /></ProjectStepContainer>}
          {step === 2 && <ProjectStepContainer title="Are you looking for an unbranded or branded test?"><TestBranding project={project} onSave={onSave} /></ProjectStepContainer>}
          {step === 3 && <ProjectStepContainer title="Where would you like to test?"><TestPlatform project={project} onSave={onSave} /></ProjectStepContainer>}
          {step === 4 && <ProjectStepContainer title="Create your own audience"><TestAudience project={project} onSave={onSave} onAudienceComplete={(complete: boolean) => setAudienceComplete(complete)} /></ProjectStepContainer>}
          {step === 5 && <ProjectStepContainer title="Set your test duration"><TestRuntime project={project} onSave={onSave} /></ProjectStepContainer>}
          {step === 6 && <ProjectStepContainer title="Choose an ad template"><TestCreatives project={project} onSave={onSave} /></ProjectStepContainer>}
          {step === 7 && projectFacebookCreativeTemplateId && <ProjectStepContainer title="Edit/Remove your template below"><ProjectFacebookCreativeTemplateDetail projectFacebookCreativeTemplateId={projectFacebookCreativeTemplateId} /></ProjectStepContainer>}
          {step === 8 && <ProjectStepContainer title="Answer your big questions"><TestThemes project={project} onSave={onSave} /></ProjectStepContainer>}
          {step === 9 && <ProjectStepContainer title=""><TestMatrix project={project} onSave={onSave} /></ProjectStepContainer>}
          {step === 10 && <ProjectStepContainer title="Build your test matrix"><TestMatrixEditor project={project} onSave={onSave} /></ProjectStepContainer>}
          {step === 11 && <ProjectStepContainer title="Choose a landing page template"><TestLandingPages project={project} onSave={onSave} /></ProjectStepContainer>}
          {step === 12 && <ProjectStepContainer title="Review your test"><UserReview project={project} onSave={onSave} /></ProjectStepContainer>}
          <div className="mt-5 flex gap-4">
            {step > 1 && <button className="btn action-button secondary text-base text-black" onClick={() => setSearchParams({ step: (step - 1).toString() })}>
              <span className="mdi mdi-chevron-left text-base" /> Go Back
            </button>
            }
            {step < 12 && step != 6 &&
              <button className="btn action-button text-base" onClick={() => setSearchParams({ step: (step + 1).toString() })} disabled={!currentStepItem?.isComplete}>
                Next <span className="mdi mdi-chevron-right text-base" />
              </button>
            }
          </div>
        </div>
      </div>
    </>
  )
})

export default ProjectDraft