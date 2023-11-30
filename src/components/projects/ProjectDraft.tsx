import { observer } from "mobx-react-lite";
import { Projects as Project } from "../../gql/graphql";
import TestObjective from "./test_components/TestObjective";
import { useLocation, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ProjectFacebookAudienceContext, ProjectsContext } from "../../stores/stores";
import { useMutation } from "@tanstack/react-query";
import _ from "lodash";
import TestBranding from "./test_components/TestBranding";
import TestPlatform from "./test_components/TestPlatform";
import TestRuntime from "./test_components/TestRuntime";
import TestAudience from "./test_components/TestAudience";
import TestCreatives from "./test_components/TestCreatives";
import TestLandingPages from "./test_components/TestLandingPages";
import '../../css/project_draft.css'
import TestThemes from "./test_components/creatives/TestThemes";
import ProjectFacebookCreativeTemplateDetail from '../../pages/projects/ProjectFacebookCreativeTemplateDetail'
import TestMatrixEditor from './test_components/creatives/TestMatrixEditor'

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
  const configurationMenu = [{
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
        steps: [8, 9],
        isComplete: Boolean(project.themes?.length === 3),
        icon: 'mdi mdi-file-document-edit'
      },
      {
        label: 'Landing page',
        value: 'landing_page',
        steps: [10],
        isComplete: false,
        icon: 'mdi mdi-beaker'
      }
    ]
  }]
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
              <li key={item.value}>
                <details open>
                  <summary><span className={item.icon}></span>{item.label}</summary>
                  <ul>
                    {item.children.map((child) =>
                      <li key={child.value} className={`project-menu-item ${child.steps?.includes(step) && 'active'}`} onClick={() => { setSearchParams({ step: child.steps[0].toString() }) }} ><a><span className={child.icon}></span>{child.label} {child.isComplete && <span className="mdi mdi-check-circle text-success" />}</a></li>
                    )}
                  </ul>
                </details>
              </li>
            )}
          </ul>
        </div>
        <div className="flex-initial w-full md:w-8/12">
          {step === 1 && <TestObjective project={project} onSave={onSave} />}
          {step === 2 && <TestBranding project={project} onSave={onSave} />}
          {step === 3 && <TestPlatform project={project} onSave={onSave} />}
          {step === 4 && <TestAudience project={project} onSave={onSave} onAudienceComplete={(complete: boolean) => setAudienceComplete(complete)} />}
          {step === 5 && <TestRuntime project={project} onSave={onSave} />}
          {step === 6 && <TestCreatives project={project} onSave={onSave} />}
          {step === 7 && projectFacebookCreativeTemplateId && <ProjectFacebookCreativeTemplateDetail projectFacebookCreativeTemplateId={projectFacebookCreativeTemplateId} />}
          {step === 8 && <TestThemes project={project} onSave={onSave} />}
          {step === 9 && <TestMatrixEditor project={project} onSave={onSave} />}
          {step === 10 && <TestLandingPages project={project} onSave={onSave} />}
          <div className="mt-5 flex gap-4">
            {step > 1 && <button className="btn action-button secondary text-base text-black" onClick={() => setSearchParams({ step: (step - 1).toString() })}>
              <span className="mdi mdi-chevron-left text-base" /> Go Back
            </button>
            }
            {step < 10 && step != 6 &&
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