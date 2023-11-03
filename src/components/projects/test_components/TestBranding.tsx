import { observer } from "mobx-react-lite";
import { Projects as Project } from "../../../gql/graphql";
import { useEffect, useState } from "react";
const TestObjective = observer(({ project, onSave }: { project: Project, onSave: (payload: object) => void }) => {
  const [branding, setBranding] = useState(project.branding || '')
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
      description: 'Unbranded tests are created with no brand associated. This is usually chosen when test is upper funnel.'
    },
    {
      label: 'Branded',
      icon: 'mdi mdi-check-decagram-outline',
      value: 'branded',
      description: 'Branded tests are created with brand guidelines (color, font, logo, etc.). This is usually chosen when test is lower funnel.'
    }
  ]

  useEffect(() => {
    onSave({ branding })
  }, [branding])
  function selectionCard (item: Branding) {
    return (
      <div key={item.label} className="flex flex-col" style={{ width: 285 }}>
        <div className={`card cursor-pointer ${branding === item.value && 'card-selected'}`} style={{ backgroundColor: 'white', padding: '0px 10px' }} onClick={() => setBranding(item.value)}>
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
        <div className="text-lg mb-4">
          Are you looking for an unbranded or branded test?
        </div>
        <div className="flex flex-wrap gap-y-10 gap-x-10">
          {items.map((item) => selectionCard(item))}
        </div>
      </div>
    </>
  )
})

export default TestObjective