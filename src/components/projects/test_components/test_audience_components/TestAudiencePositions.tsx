import { observer } from "mobx-react-lite";
import { Facebook_Audiences as FacebookAudience } from "../../../../gql/graphql";
import { useState, useEffect } from "react";
import _ from 'lodash'
const TestAudiencePositions = observer(({ onUpdate, projectFacebookAudience }: { onUpdate: (audience: FacebookAudience, isUpdated: boolean) => void, projectFacebookAudience: FacebookAudience }) => {
  const [positions, setPositions] = useState<string[]>([])
  const availablePositions = [
    { value: 'right_hand_column', label: 'Right hand column' }, { value: 'feed', label: 'Facebook feed' }, { value: 'story', label: 'Facebook story' }, { value: 'instagram_stream', label: 'Instagram feed' }
  ]
  const [isUpdated, setIsUpdated] = useState(false)
  const handleChange = (value: string) => {
    setIsUpdated(true)
    if (!positions.includes(value)) {
      setPositions((prev) => [...prev, value])
    } else {
      setPositions((prev) => _.filter(prev, (item) => item !== value))
    }
  }
  useEffect(() => {
    onUpdate({ facebook_positions: positions } as FacebookAudience, isUpdated)
  }, [positions])
  useEffect(() => {
    if (projectFacebookAudience.facebook_positions) {
      setPositions(projectFacebookAudience.facebook_positions)
    }
  }, [projectFacebookAudience])
  return (
    <div>
      <label className="label">
        <span className="text-sm opacity-60">Media Positions</span>
      </label>
      <div className="flex flex-wrap gap-x-3 gap-y-3 items-center">
        {availablePositions.map((item) => {
          return (<div key={item.value} className="flex items-center">
            <input type="checkbox" className="checkbox" checked={positions.includes(item.value)} onChange={() => handleChange(item.value)} />
            <span className="ml-2">{item.label}</span>
          </div>)
        })}

      </div>
    </div>
  )
})

export default TestAudiencePositions