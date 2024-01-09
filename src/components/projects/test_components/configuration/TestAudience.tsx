import { observer } from "mobx-react-lite";
import TestAudienceLocations from "../test_audience_components/TestAudienceLocations";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useContext, useEffect, useState } from "react";
import { FacebookContext, ProjectFacebookAudienceContext, ToastsContext } from "../../../../stores/stores";
import { SpinningLoading } from "../../../lib/SpinningLoading";
import { Facebook_Audiences as FacebookAudience } from "../../../../gql/graphql";
import TestAudienceGender from "../test_audience_components/TestAudienceGender";
import _ from 'lodash'
import TestAudienceAge from "../test_audience_components/TestAudienceAge";
import TestAudiencePlatforms from "../test_audience_components/TestAudiencePlatforms";
import TestAudiencePositions from "../test_audience_components/TestAudiencePositions";
import TestAudienceInterests from "../test_audience_components/TestAudienceInterests";
import { ToastType } from "../../../../stores/toast";
import { ProjectStepChildProps } from "../../ProjectStepContainer";
import { ProjectStatus } from "../../../../stores/projects";
import DeleteModal from "../../../lib/DeleteModal";

const TestAudience = observer(({ audience, props }: { audience: FacebookAudience, props: ProjectStepChildProps }) => {
  const projectFacebookAudienceStore = useContext(ProjectFacebookAudienceContext)
  const facebookStore = useContext(FacebookContext)
  const toastsStore = useContext(ToastsContext)
  const reachModalId = 'reach_modal'
  const [isAudienceComplete, setIsAudienceComplete] = useState(false)
  const [audienceName, setAudienceName] = useState<string>(audience.name || '')
  const deleteAudienceModalID = 'delete_audience_modal'
  const getReachEstimateMutation = useMutation({
    mutationKey: ['getReachEstimate'],
    mutationFn: () => {
      return facebookStore.getReachEstimate({ audience })
    },
    onError: (error: Error) => { toastsStore.addToast({ message: error.toString(), type: ToastType.ERROR }) },
    onSuccess: () => { (document.getElementById(reachModalId) as HTMLDialogElement).show() }
  })
  const deleteFacebookAudienceMutation = useMutation({
    mutationKey: ['deleteFacebookAudience'],
    mutationFn: () => projectFacebookAudienceStore.deleteFacebookAudience({ audienceId: audience.id }),
    onMutate: () => { (document.getElementById(deleteAudienceModalID) as HTMLDialogElement).close() },
    onSuccess: () => { if (props.onSave) props.onSave({}); toastsStore.addToast({ message: 'Successfully deleted audience', type: ToastType.SUCCESS }) }
  })
  const projectFacebookAudienceMutation = useMutation({
    mutationKey: ['projectFacebookAudienceMutation'],
    mutationFn: ({ payload }: { payload: FacebookAudience }) => projectFacebookAudienceStore.updateFacebookAudiencesByID({ id: audience.id, payload: payload as FacebookAudience }),
    onError: (error: Error) => { toastsStore.addToast({ message: error.toString(), type: ToastType.ERROR }) },
  })

  const onUpdate = useCallback(_.debounce(async (payload: FacebookAudience, isUpdated: boolean) => {
    // Only update if there are updates
    if (audience && isUpdated) {
      await projectFacebookAudienceMutation.mutateAsync({ payload })
      setIsAudienceComplete(projectFacebookAudienceStore.checkIsAudienceComplete({ ...audience, ...payload }))
      if (props.onSave) {
        props.onSave({})
      }
    }
  }, 300), [audience])
  useEffect(() => {
    setIsAudienceComplete(projectFacebookAudienceStore.checkIsAudienceComplete(audience))
  }, [])
  return (
    <>
      <div className="card" style={{ backgroundColor: 'white' }}>
        <div className="flex flex-col gap-y-6">
          <div>
            <div className="flex">
              <p className="text-base font-bold mb-2">
                {audience.name}
              </p>
              <button className="btn bg-error btn-sm text-white normal-case border-none ml-3" onClick={() => (document.getElementById(deleteAudienceModalID) as HTMLDialogElement).show()}>
                Delete Audience <SpinningLoading isLoading={deleteFacebookAudienceMutation.isLoading} />
              </button>
            </div>
            <label className="label">
              <span className="text-sm opacity-60">Name*</span>
            </label>
            <input type="text" disabled={props.project?.status !== ProjectStatus.DRAFT} className="input w-10/12" placeholder="Name" value={audienceName} onChange={(e) => { setAudienceName(e.target.value); onUpdate({ name: e.target.value } as FacebookAudience, true) }} />
          </div>
          {audience && <TestAudienceLocations onUpdate={onUpdate} projectFacebookAudience={audience} disabled={props.project?.status !== ProjectStatus.DRAFT} />}
          {audience && <TestAudienceGender onUpdate={onUpdate} projectFacebookAudience={audience} disabled={props.project?.status !== ProjectStatus.DRAFT} />}
          {audience && <TestAudienceAge onUpdate={onUpdate} projectFacebookAudience={audience} disabled={props.project?.status !== ProjectStatus.DRAFT} />}
          {audience && <TestAudiencePlatforms onUpdate={onUpdate} projectFacebookAudience={audience} disabled={props.project?.status !== ProjectStatus.DRAFT} />}
          {audience && <TestAudiencePositions onUpdate={onUpdate} projectFacebookAudience={audience} disabled={props.project?.status !== ProjectStatus.DRAFT} />}
          {audience && <TestAudienceInterests onUpdate={onUpdate} projectFacebookAudience={audience} disabled={props.project?.status !== ProjectStatus.DRAFT} />}
        </div>
        {isAudienceComplete && <div>
          <button className="btn mt-5 btn-info normal-case text-white" disabled={projectFacebookAudienceMutation.isLoading} onClick={() => getReachEstimateMutation.mutate()}>Click to get reach estimate<SpinningLoading isLoading={getReachEstimateMutation.isLoading} /></button>
        </div>
        }
      </div>

      <DeleteModal element_id={deleteAudienceModalID} model={audience} model_type="Facebook Audience" confirmByTypingModelType={false} onDelete={() => deleteFacebookAudienceMutation.mutate()} />

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