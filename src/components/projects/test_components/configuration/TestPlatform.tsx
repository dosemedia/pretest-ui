import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import tiktokIcon from '../../../../assets/tiktok.svg'
import xIcon from '../../../../assets/x-twitter.svg'
import { ProjectStepChildProps } from "../../ProjectStepContainer";
import { ProjectStatus } from "../../../../stores/projects";
const TestObjective: React.FC<ProjectStepChildProps> = observer((props: ProjectStepChildProps) => {
  const [platform, setPlatform] = useState(props.project?.platform || '')
  interface Platform {
    label: string,
    value: string,
    icons: string[],
    svg?: string,
    comingSoon?: boolean,
    description?: string
  }
  const items: Platform[] = [
    {
      label: 'Facebook + Instagram',
      icons: ['mdi mdi-facebook', 'mdi mdi-plus', 'mdi mdi-instagram'],
      value: 'facebook_instagram',
      description: 'There is no price difference to test on both platforms. '
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
    {
      label: 'TikTok',
      svg: tiktokIcon,
      icons: [],
      comingSoon: true,
      value: 'tiktok'
    },
    {
      label: 'X',
      svg: xIcon,
      icons: [],
      comingSoon: true,
      value: 'X'
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
        <div className={`card cursor-pointer relative ${platform === item.value && 'card-selected'} ${props.project?.status !== ProjectStatus.DRAFT && 'disabled'}`} style={{ backgroundColor: 'white', padding: '0px 0px' }} onClick={() => { !item.comingSoon ? setPlatform(item.value) : null }}>
          <div className="card-body">
            <div className="flex flex-col items-center gap-2 text-center">
              <div>{item.icons.map((icon, i) => <span key={`${icon}-${i}`} className={icon} style={{ fontSize: 50 }} />)}</div>
              { item.svg && <img src={item.svg} style={{ width: 45, height: 45 }} /> }
              <span className="text-md font-bold text-center">{item.label}</span>
            </div>
          </div>
          { item.comingSoon && <div className="absolute card w-full h-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,.3)', padding: '0px 0px' }}>
            <p className="text-white font-bold text-md">
              In Development
            </p>
          </div> }
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