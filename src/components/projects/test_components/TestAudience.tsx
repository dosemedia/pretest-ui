import { observer } from "mobx-react-lite";
import TestAudienceLocations from "./test_audience_components/TestAudienceLocations";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useContext, useEffect, useState } from "react";
import { FacebookContext, ProjectFacebookAudienceContext, ToastsContext } from "../../../stores/stores";
import { SpinningLoading } from "../../lib/SpinningLoading";
import { Facebook_Audiences as FacebookAudience } from "../../../gql/graphql";
import TestAudienceGender from "./test_audience_components/TestAudienceGender";
import _ from 'lodash'
import TestAudienceAge from "./test_audience_components/TestAudienceAge";
import { Projects as Project } from "../../../gql/graphql";
import ErrorMessage from "../../lib/Error";
import TestAudiencePlatforms from "./test_audience_components/TestAudiencePlatforms";
import TestAudiencePositions from "./test_audience_components/TestAudiencePositions";
import TestAudienceInterests from "./test_audience_components/TestAudienceInterests";

const TestAudience = observer(({ onSave, onAudienceComplete, project, }: { onSave: (payload: object) => void, onAudienceComplete: (complete: boolean) => void, project: Project, }) => {
  const projectFacebookAudienceStore = useContext(ProjectFacebookAudienceContext)
  const facebookStore = useContext(FacebookContext)
  const toastsStore = useContext(ToastsContext)
  const reachModalId = 'reach_modal'
  const [facebookAudienceData, setFacebookAudienceData] = useState(project.audiences[0])
  const [isAudienceComplete, setIsAudienceComplete] = useState(false)
  const [audienceName, setAudienceName] = useState('')
  const getReachEstimateMutation = useMutation({
    mutationKey: ['getReachEstimate'],
    mutationFn: () => {
      return facebookStore.getReachEstimate({ audience: facebookAudienceData })
    },
    onError: (error: Error) => { toastsStore.addToast({ message: error.toString(), type: 'error' }) },
    onSuccess: () => { (document.getElementById(reachModalId) as HTMLDialogElement).show() }
  })
  const createProjectFacebookAudienceMutation = useMutation({
    mutationKey: ['createProjectFacebookAudienceMutation'],
    mutationFn: () => projectFacebookAudienceStore.createFacebookAudience({ project, name: 'My Custom Audience' }),
    onSuccess: (audience: FacebookAudience | null) => { if (audience) setFacebookAudienceData(audience)},
    onError: (error: Error) => { toastsStore.addToast({ message: error.toString(), type: 'error' }) },
  })
  const projectFacebookAudienceMutation = useMutation({
    mutationKey: ['projectFacebookAudienceMutation'],
    mutationFn: ({ payload, audience }: { payload: FacebookAudience, audience: FacebookAudience }) => projectFacebookAudienceStore.updateFacebookAudiencesByID({ id: audience.id, payload: payload as FacebookAudience }),
    onError: (error: Error) => { toastsStore.addToast({ message: error.toString(), type: 'error' }) },
  })

  const onUpdate = useCallback(_.debounce(async (payload: FacebookAudience, isUpdated: boolean) => {
    // Only update if there are updates
    if (facebookAudienceData && isUpdated) {
      await projectFacebookAudienceMutation.mutateAsync({ payload, audience: facebookAudienceData })
      setIsAudienceComplete(projectFacebookAudienceStore.checkIsAudienceComplete({ ...facebookAudienceData, ...payload }))
      onSave({ name: project.name })
    }
  }, 300), [facebookAudienceData])

  useEffect(() => {
    onAudienceComplete(isAudienceComplete)
  }, [isAudienceComplete])

  useEffect(() => {
    if (!facebookAudienceData) {
      createProjectFacebookAudienceMutation.mutate()
    }
    if (facebookAudienceData) {
      setIsAudienceComplete(projectFacebookAudienceStore.checkIsAudienceComplete(facebookAudienceData))
      setAudienceName(facebookAudienceData.name || '')
    }
  }, [facebookAudienceData])
  return (
    <>
      {!project.platform ? <ErrorMessage message="You must complete the Platform step before moving to audience" /> :
        <div>
          <div className="text-lg configuration-title">
            Create your own audience
          </div>
            <div className="flex flex-col gap-y-6 mt-4">
              <div>
                <label className="label">
                  <span className="text-sm opacity-60">Name*</span>
                </label>
                <input type="text" className="input w-10/12" placeholder="Name" value={audienceName} onChange={(e) => { setAudienceName(e.target.value); onUpdate({ name: e.target.value } as FacebookAudience, true) }} />
              </div>
              {facebookAudienceData && <TestAudienceLocations onUpdate={onUpdate} projectFacebookAudience={facebookAudienceData} />}
              {facebookAudienceData && <TestAudienceGender onUpdate={onUpdate} projectFacebookAudience={facebookAudienceData} />}
              {facebookAudienceData && <TestAudienceAge onUpdate={onUpdate} projectFacebookAudience={facebookAudienceData} />}
              {facebookAudienceData && <TestAudiencePlatforms onUpdate={onUpdate} projectFacebookAudience={facebookAudienceData} />}
              {facebookAudienceData && <TestAudiencePositions onUpdate={onUpdate} projectFacebookAudience={facebookAudienceData} />}
              {facebookAudienceData && <TestAudienceInterests onUpdate={onUpdate} projectFacebookAudience={facebookAudienceData} />}
            </div>
          {isAudienceComplete && <div>
            <button className="btn mt-5 btn-info normal-case text-white" disabled={projectFacebookAudienceMutation.isLoading} onClick={() => getReachEstimateMutation.mutate()}>Click to get reach estimate<SpinningLoading isLoading={getReachEstimateMutation.isLoading} /></button>
          </div>
          }
        </div>
      }
      <dialog id={reachModalId} className="modal">
        <div className="modal-box">
          {getReachEstimateMutation && getReachEstimateMutation.data &&
            <div className="flex flex-col items-center">
              <span className="mdi mdi-account-group" style={{ fontSize: 70 }}></span>
              <span className="font-bold text-xl">{getReachEstimateMutation.data.users_lower_bound.toLocaleString()}</span>
              <span className="font-bold">to</span>
              <span className="font-bold text-xl">{getReachEstimateMutation.data.users_upper_bound.toLocaleString()}</span>
            </div>
          }
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
})

export default TestAudience