import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { ProjectStepChildProps } from "../../ProjectStepContainer";
import { ProjectStatus } from "../../../../stores/projects";
const TestObjective: React.FC<ProjectStepChildProps> = observer((props: ProjectStepChildProps) => {
  const [platform, setPlatform] = useState(props.project?.platform || '')
  interface Platform {
    label: string,
    value: string,
    icons: string[],
    description?: string
  }
  const items: Platform[] = [
    {
      label: 'Facebook + Instagram',
      icons: ['mdi mdi-facebook', 'mdi mdi-plus', 'mdi mdi-instagram'],
      value: 'facebook_instagram',
      description: 'Testing on both platforms costs the same as testing on one. '
    },
    {
      label: 'Facebook',
      icons: ['mdi mdi-facebook'],
      value: 'facebook'
    },
    {
      label: 'Instagram',
      icons: ['mdi mdi-instagram'],
      value: 'instagram'
    },
  ]

  useEffect(() => {
    if (props.saveProject) {
      props.saveProject({ platform })
    }
  }, [platform])
  function selectionCard (item: Platform) {
    return (
      <div key={item.label} className="flex flex-col" style={{ width: 285 }}>
        <div className={`card cursor-pointer ${platform === item.value && 'card-selected'} ${props.project?.status !== ProjectStatus.DRAFT && 'disabled'}`} style={{ backgroundColor: 'white', padding: '0px 10px' }} onClick={() => setPlatform(item.value)}>
          <div className="card-body">
            <div className="flex flex-col items-center gap-2 text-center">
              <div>{item.icons.map((icon, i) => <span key={`${icon}-${i}`} className={icon} style={{ fontSize: 50 }} />)}</div>
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