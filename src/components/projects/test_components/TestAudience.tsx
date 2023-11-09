import { observer } from "mobx-react-lite";
import TestAudienceLocations from "./test_audience_components/TestAudienceLocations";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { FacebookContext, ProjectFacebookAudienceContext, ToastsContext } from "../../../stores/stores";
import { useParams } from "react-router-dom";
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
  const { projectId } = useParams() as { projectId: string }
  const reachModalId = 'reach_modal'
  const { data: facebookAudienceData, isLoading, refetch } = useQuery({
    queryKey: ['getProjectFacebookAudienceLocations'],
    retry: false,
    queryFn: () => projectFacebookAudienceStore.getFacebookAudiencesByProjectID({ projectId, createIfDoesNotExist: true }),
  })
  const getReachEstimateMutation = useMutation({
    mutationKey: ['getReachEstimate'],
    mutationFn: () => {
      const audience = facebookAudienceData && facebookAudienceData?.length > 0 ? facebookAudienceData[0] : null
      return facebookStore.getReachEstimate({ audience })
    },
    onError: (error: Error) => { toastsStore.addToast({ message: error.toString(), type: 'error' }) },
    onSuccess: () => { (document.getElementById(reachModalId) as HTMLDialogElement).show() }
  })
  const projectFacebookAudienceMutation = useMutation({
    mutationKey: ['projectFacebookAudienceMutation'],
    mutationFn: ({ payload, audience }: { payload: FacebookAudience, audience: FacebookAudience }) => projectFacebookAudienceStore.updateFacebookAudiencesByID({ id: audience.id, payload: { ...audience, ...payload } }),
    onSuccess: () => refetch(),
    onError: (error: Error) => { toastsStore.addToast({ message: error.toString(), type: 'error' }) },
  })

  const onUpdate = _.debounce((payload: FacebookAudience, isUpdated: boolean) => {
    // Only update if there are updates
    if (facebookAudienceData && facebookAudienceData[0] && isUpdated) {
      projectFacebookAudienceMutation.mutate({ payload, audience: facebookAudienceData[0] })
      onSave({})
    }
  }, 200)

  function isAudienceComplete(): boolean {
    const audience = (facebookAudienceData && facebookAudienceData[0]) ? facebookAudienceData[0] : null
    if (audience) {
      if ((audience.geo_locations.countries.length === 0) && Object.keys(audience.geo_locations.regions).length === 0) {
        return false
      } else if (audience.genders?.length === 0) {
        return false
      } else if (Object.keys(audience.interests).length === 0) {
        return false
      } else if (audience.device_platforms.length === 0) {
        return false
      }
    }
    return true
  }

  useEffect(() => {
    onAudienceComplete(isAudienceComplete())
  }, [facebookAudienceData])
  return (
    <>
      {!project.platform ? <ErrorMessage message="You must complete the Platform step before moving to audience" /> :
        <div>
          <div className="text-lg configuration-title">
            Create your own audience
          </div>
          {isLoading && <SpinningLoading isLoading={isLoading} size="lg" />}
          <div className="flex flex-col gap-y-6 mt-4">
            {!isLoading && facebookAudienceData && facebookAudienceData.length > 0 && <TestAudienceLocations onUpdate={onUpdate} projectFacebookAudience={facebookAudienceData[0] as FacebookAudience} />}
            {!isLoading && facebookAudienceData && facebookAudienceData.length > 0 && <TestAudienceGender onUpdate={onUpdate} projectFacebookAudience={facebookAudienceData[0] as FacebookAudience} />}
            {!isLoading && facebookAudienceData && facebookAudienceData.length > 0 && <TestAudienceAge onUpdate={onUpdate} projectFacebookAudience={facebookAudienceData[0] as FacebookAudience} />}
            {!isLoading && facebookAudienceData && facebookAudienceData.length > 0 && <TestAudiencePlatforms onUpdate={onUpdate} projectFacebookAudience={facebookAudienceData[0] as FacebookAudience} />}
            {!isLoading && facebookAudienceData && facebookAudienceData.length > 0 && <TestAudiencePositions onUpdate={onUpdate} projectFacebookAudience={facebookAudienceData[0] as FacebookAudience} />}
            {!isLoading && facebookAudienceData && facebookAudienceData.length > 0 && <TestAudienceInterests onUpdate={onUpdate} projectFacebookAudience={facebookAudienceData[0] as FacebookAudience} />}
          </div>
          {isAudienceComplete() && <div>
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