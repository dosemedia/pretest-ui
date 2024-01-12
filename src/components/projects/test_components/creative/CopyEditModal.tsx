import { observer } from "mobx-react-lite";
import { ProjectStepChildProps } from "../../ProjectStepContainer";
import { Facebook_Creatives as FacebookCreative } from "../../../../gql/graphql";
import { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ProjectFacebookCreativesContext, ToastsContext } from "../../../../stores/stores";
import { SpinningLoading } from "../../../lib/SpinningLoading";
import { ToastType } from "../../../../stores/toast";
const CopyEditModal = observer(({ props, element_id, creative }: { props: ProjectStepChildProps, element_id: string, creative: FacebookCreative | null }) => {
  const [copy, setCopy] = useState(creative?.data.mainCopy)
  const facebookCreativeStore = useContext(ProjectFacebookCreativesContext)
  const toastStore = useContext(ToastsContext)
  const updateCreativeCopyMutation = useMutation({
    mutationKey: ['updateCreativeCopy'],
    mutationFn: () => facebookCreativeStore.updateProjectFacebookCreatives({ facebookCreativesUpdates: [{ where: { id: { _eq: creative?.id } }, _set: { data: { ...creative?.data, mainCopy: copy } } }] }),
    onSuccess: () => { toastStore.addToast({ message: 'Copy successfully updated', type: ToastType.SUCCESS }); (document.getElementById(element_id) as HTMLDialogElement).close(); if (props?.saveProject) props.saveProject({}) }
  })
  
  return (
    <dialog id={element_id} className="modal">
      <div className="modal-box">
        <p className="text-lg font-bold">
          Edit Copy
        </p>
        <div className="mt-6">
          <textarea className="textarea w-full" cols={6} value={copy} onChange={(e) => setCopy(e.target.value)} />
        </div>
        <div className="modal-action">
          <button className="btn gradient-background text-white normal-case border-none rounded-full w-[100px]" onClick={() => updateCreativeCopyMutation.mutate()}>Save<SpinningLoading isLoading={updateCreativeCopyMutation.isLoading} /></button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
})

export default CopyEditModal