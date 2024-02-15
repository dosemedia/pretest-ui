import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { ProjectStepChildProps } from "../../ProjectStepContainer";
import { ProjectStatus } from "../../../../stores/projects";
const TestObjective: React.FC<ProjectStepChildProps> = observer((props: ProjectStepChildProps) => {
  const [branding, setBranding] = useState(props.project?.branding || '')
  interface Branding {
    label: string,
    value: string,
    icon: string,
    description: string
  }
  const items: Branding[] = [
    {
      label: 'Unbranded',
      icon: 'mdi mdi-decagram-outline',
      value: 'unbranded',
      description: 'Unbranded tests separate your company\'s identity from the test. Choose this if you don\'t want familiarity with your brand influencing your audience\'s perception.'
    },
    {
      label: 'Branded',
      icon: 'mdi mdi-check-decagram-outline',
      value: 'branded',
      description: 'Choose a branded test if it\'s important that the audience knows this is a product from your brand.'
    }
  ]

  useEffect(() => {
    if (props.saveProject) {
      props.saveProject({ branding })
    }
  }, [branding])
  function selectionCard (item: Branding) {
    return (
      <div key={item.label} className="flex flex-col" style={{ width: 285 }}>
        <div className={`card cursor-pointer ${branding === item.value && 'card-selected'} ${props.project?.status !== ProjectStatus.DRAFT && 'disabled'}`} style={{ backgroundColor: 'white', padding: '0px 10px' }} onClick={() => setBranding(item.value)}>
          <div className="card-body">
            <div className="flex flex-col items-center gap-2 text-center">
              <span className={item.icon} style={{ fontSize: 70 }} />
              <span className="text-md font-bold text-center">{item.label}</span>
            </div>
          </div>
        </div>
        <div className="text-xxs opacity-60 font-medium mt-4">
          {item.description}
        </div>
      </div>
    )
  }
  return (
    <>
      <div>
        <div className="flex flex-wrap gap-y-10 gap-x-10">
          {items.map((item) => selectionCard(item))}
        </div>
      </div>
    </>
  )
})

export default TestObjective