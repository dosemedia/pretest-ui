import { observer } from "mobx-react-lite";
import { Facebook_Audiences as FacebookAudience } from "../../../../gql/graphql";
import { useState, useEffect } from "react";
import _ from 'lodash'
const TestAudiencePlatforms = observer(({ onUpdate, projectFacebookAudience }: { onUpdate: (audience: FacebookAudience, isUpdated: boolean) => void, projectFacebookAudience: FacebookAudience }) => {
  const [devicePlatforms, setDevicePlatforms] = useState<string[]>([])
  const availableDevicePlatforms = ["mobile", "desktop"]
  const [isUpdated, setIsUpdated] = useState(false)
  useEffect(() => {
    onUpdate({ device_platforms: devicePlatforms } as FacebookAudience, isUpdated)
  }, [devicePlatforms])
  useEffect(() => {
    if (projectFacebookAudience.device_platforms) {
      setDevicePlatforms(projectFacebookAudience.device_platforms)
    }
  }, [projectFacebookAudience])
  const handleSelection = (value: string) => {
    setIsUpdated(true)
    if (!devicePlatforms.includes(value)) {
      setDevicePlatforms((prev) => [...prev, value])
    } else {
      setDevicePlatforms((prev) => _.filter(prev, (item) => item !== value))
    }
  }
  function selectionCard(item: string) {
    return (
      <div key={item} className={`card cursor-pointer ${devicePlatforms.includes(item) && 'card-selected'}`} style={{ backgroundColor: 'white', padding: '0px 0px', width: 120 }} onClick={() => handleSelection(item)}>
        <div className="card-body">
          <div className="flex flex-col items-center gap-2">
            <span className="text-md font-bold text-center">{item}</span>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
     <label className="label">
        <span className="text-sm opacity-60">Device Platforms</span>
      </label>
      <div className="flex gap-x-4 gap-y-4">
          {availableDevicePlatforms.map((item) => selectionCard(item))}
      </div>
    </div>
  )
})

export default TestAudiencePlatforms