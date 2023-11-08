import { observer } from "mobx-react-lite";
import { Facebook_Audiences as FacebookAudience } from "../../../../gql/graphql";
import { useState, useEffect } from "react";
import ErrorMessage from "../../../lib/Error";
const TestAudienceAge = observer(({ onUpdate, projectFacebookAudience }: { onUpdate: (audience: FacebookAudience, isUpdated: boolean) => void, projectFacebookAudience: FacebookAudience }) => {
  const [ageMin, setAgeMin] = useState<number>(18)
  const [ageMax, setAgeMax] = useState<number>(65)
  const [isUpdated, setIsUpdated] = useState(false)
  function errorMessage () {
    if (ageMin > ageMax) {
      return 'Minimum age must be less than maximum age'
    } else if (!ageMin || !ageMax) {
      return 'Age range is required'
    }
    return ''
  }
  useEffect(() => {
    if (!errorMessage()) {
      onUpdate({ max_age: ageMax, min_age: ageMin } as FacebookAudience, isUpdated)
    }
  }, [ageMin, ageMax])
  useEffect(() => {
    if (projectFacebookAudience.min_age) {
      setAgeMin(projectFacebookAudience.min_age)
    }
    if (projectFacebookAudience.min_age) {
      setAgeMax(projectFacebookAudience.max_age)
    }
  }, [projectFacebookAudience])
  return (
    <div>
      <label className="label">
        <span className="text-sm opacity-60">Age</span>
      </label>

      <div className="flex gap-x-2">
        <div className="flex-0">
          <label className="label">
            <span className="text-xs opacity-60">Min</span>
          </label>
          <input type="number" className="number p-2" value={ageMin} onChange={(e) => { setAgeMin(parseInt(e.target.value)); setIsUpdated(true) }} />
        </div>
        <div className="flex-0">
          <label className="label">
            <span className="text-xs opacity-60">Max</span>
          </label>
          <input type="number" className="number p-2" value={ageMax} onChange={(e) => { setAgeMax(parseInt(e.target.value)); setIsUpdated(true) }} />
        </div>
      </div>
      {errorMessage() && <div className="mt-2"><ErrorMessage message={errorMessage()} /></div>}
    </div>
  )
})

export default TestAudienceAge