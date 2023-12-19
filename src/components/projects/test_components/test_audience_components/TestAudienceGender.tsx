import { observer } from "mobx-react-lite";
import { Facebook_Audiences as FacebookAudience } from "../../../../gql/graphql";
import { useState, useEffect } from "react";
import _ from 'lodash'
const TestAudienceGender = observer(({ onUpdate, projectFacebookAudience, disabled }: { onUpdate: (audience: FacebookAudience, isUpdated: boolean) => void, projectFacebookAudience: FacebookAudience, disabled: boolean }) => {
  const [genders, setGenders] = useState<number[]>([])
  const [isUpdated, setIsUpdated] = useState(false)
  const handleCheck = (gender: number) => {
    setIsUpdated(true)
    if (!genders.includes(gender)) {
      setGenders((prev) => [...prev, gender])
    } else {
      setGenders(_.filter(genders, (item) => item !== gender))
    }
  }
  useEffect(() => {
    onUpdate({ genders } as FacebookAudience, isUpdated)
  }, [genders])
  useEffect(() => {
    if (projectFacebookAudience.genders) {
      setGenders(projectFacebookAudience.genders)
    }
  }, [])
  return (
    <div>
     <label className="label">
        <span className="text-sm opacity-60">Gender*</span>
      </label>
      <div className="flex">
        <input disabled={disabled} type="checkbox" className="checkbox" checked={genders.includes(1)} onChange={() => handleCheck(1)} />
        <span className="ml-2">Male</span>
      </div>
      <div className="flex mt-2">
        <input disabled={disabled} type="checkbox" className="checkbox" checked={genders.includes(2)} onChange={() => handleCheck(2)} />
        <span className="ml-2">Female</span>
      </div>
    </div>
  )
})

export default TestAudienceGender