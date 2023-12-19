import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { ProjectStatus, TestTypeMenu, testTypeMenu } from "../../../../stores/projects";
import { ProjectStepChildProps } from "../../ProjectStepContainer";

const TestObjective: React.FC<ProjectStepChildProps> = observer((props: ProjectStepChildProps) => {
  const [name, setName] = useState(props.project?.name || '')
  const [objective, setObjective] = useState(props.project?.objective || '')
  const [projectType, setProjectType] = useState(props.project?.project_type || '')
  useEffect(() => {
    if (projectType === 'marketing_communication') {
      setProjectType('marketing_communication_language')
    }
    if (props.onSave) {
      props.onSave({ name, objective, project_type: projectType })
    }
  }, [name, objective, projectType])

  function selectionCard(item: TestTypeMenu) {
    return (
      <div key={item.label} className={`card cursor-pointer ${projectType.includes(item.value) && 'card-selected'} ${props.project?.status === ProjectStatus.REVIEW && 'disabled'}`} style={{ backgroundColor: 'white', padding: '0px 10px', width: 285 }} onClick={() => { setProjectType(item.value) }}>
        <div className="card-body">
          <div className="flex flex-col items-center gap-2">
            <img src={item.icon} style={{ width: 58 }} />
            <span className="text-md font-bold text-center">{item.label}</span>
            <div className="opacity-80 text-xxs text-center">
              {item.description}
            </div>
            <ul className="list-disc">
              {item.items.map((question) => <li key={question} className="text-xxs" style={{ color: '#282828' }}>{question}</li>)}
            </ul>
            {item.value.includes('marketing_communication') &&
              <div className="mt-2">
                <div className="text-sm mb-2">
                  What type of marketing communication would you like to test?
                </div>
                <div>
                  <input type="checkbox" style={{ verticalAlign: 'middle' }} className="toggle toggle-sm mr-2" checked={projectType === 'marketing_communication_language'} onChange={() => { setProjectType(item.value + '_language') }} />
                  <span className="label-text">Copy</span>
                </div>
                <div>
                  <input type="checkbox" style={{ verticalAlign: 'middle' }} className="toggle toggle-sm mr-2" checked={projectType === 'marketing_communication_visual'} onChange={() => { setProjectType(item.value + '_visual') }} />
                  <span className="label-text">Visual Design</span>
                </div>
              </div>

            }
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <div>
        <div className="form-control" style={{ marginTop: 20 }}>
          <label className="label">
            <span className="text-sm">Name of your test</span>
          </label>
          <input type="text" className="input" disabled={props.project?.status === ProjectStatus.REVIEW} placeholder="Enter name of your test here" value={name} onChange={(e) => setName(e.target.value)} />
          <label className="label mt-4">
            <span className="text-sm">What are you goals for this test?</span>
          </label>
          <input type="text" className="input" disabled={props.project?.status === ProjectStatus.REVIEW} placeholder="Your goals go here" value={objective} onChange={(e) => setObjective(e.target.value)} />
          <span className="text-xxs mt-1 ml-1">Example: “I’m using test to narrow in a new message or claim for my product.”</span>
        </div>
      </div>
      <div>
        <label className="label mt-8">
          <span className="text-sm">Select your test type</span>
        </label>
        <div className="flex flex-wrap gap-y-10 gap-x-10">
          {testTypeMenu.map((item) => selectionCard(item))}
        </div>
      </div>
    </>
  )
})

export default TestObjective