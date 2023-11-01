import { observer } from "mobx-react-lite";
import { Projects as Project } from "../../gql/graphql";
import TestObjective from "./test_components/TestObjective";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ProjectsContext } from "../../stores/stores";
import { useMutation } from "@tanstack/react-query";
import _ from "lodash";
import TestBranding from "./test_components/TestBranding";
import TestPlatform from "./test_components/TestPlatform";
import TestRuntime from "./test_components/TestRuntime";
import TestAudience from "./test_components/TestAudience";

const ProjectDraft = observer(({ project, onUpdate }: { project: Project, onUpdate: () => void }) => {
  const [searchParams] = useSearchParams();
  const projectStore = useContext(ProjectsContext)
  const navigate = useNavigate()
  const [updatedAt, setUpdatedAt] = useState(project.updated_at)
  const [step, setStep] = useState(parseInt(searchParams.get('step') || '1'))
  const projectMutation = useMutation({
    mutationFn: (payload: object) => projectStore.updateProject({ projectId: project.id, payload: { ...project, ...payload } }),
    onSuccess: (data) => { setUpdatedAt(data?.updated_at); onUpdate() }
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
        step: 1,
        isComplete: project.name && project.objective,
        value: 'test_objective',
        icon: 'mdi mdi-flask-outline'
      },
      {
        label: 'Brandness',
        value: 'brandness',
        step: 2,
        isComplete: project.branding,
        icon: 'mdi mdi-brush-variant'
      },
      {
        label: 'Platform',
        value: 'platform',
        step: 3,
        isComplete: project.platform,
        icon: 'mdi mdi-facebook'
      },
      {
        label: 'Audience',
        value: 'audience',
        step: 4,
        icon: 'mdi mdi-account-group-outline'
      },
      {
        label: 'Runtime',
        value: 'runtime',
        step: 5,
        isComplete: project.start_time && project.stop_time,
        icon: 'mdi mdi-clock-outline'
      }
    ]
  }]
  useEffect(() => {
    navigate(`/project/${project.id}?step=${step}`, { replace: true })
  }, [step])
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
                      <li key={child.value} className={`project-menu-item ${child.step === step && 'active'}`} onClick={() => setStep(child.step)}><a><span className={child.icon}></span>{child.label} {child.isComplete && <span className="mdi mdi-check-circle text-success" />}</a></li>
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
          {step === 4 && <TestAudience />}
          {step === 5 && <TestRuntime project={project} onSave={onSave} />}
          <div className="mt-5 flex gap-4">
            {step > 1 && <button className="btn action-button secondary text-base text-black" onClick={() => setStep((prev) => prev -= 1)}>
              <span className="mdi mdi-chevron-left text-base" /> Go Back
            </button>
            }
            {step != 5 &&
              <button className="btn action-button text-base" onClick={() => setStep((prev) => prev += 1)}>
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