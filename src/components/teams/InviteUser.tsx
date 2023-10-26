import { observer } from "mobx-react-lite";
import { useState, useContext } from 'react'
import { TeamsContext, ToastsContext } from "../../stores/stores";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
const InviteUser = observer(() => {
  const teamsStore = useContext(TeamsContext)
  const toastsStore = useContext(ToastsContext)
  const { teamId } = useParams() as { teamId: string }
  const element_id = 'create_team'
  const [email, setEmail] = useState('')

  function removeFields () {
    setEmail('')
  }
  const inviteUser = useMutation({
    mutationKey: ['inviteUser'],
    mutationFn: () => {
      return teamsStore.inviteUser({ email, teamId })
    },
    onSuccess: () => {
      (document.getElementById(element_id) as HTMLDialogElement).close()
      removeFields()
      toastsStore.addToast({ message: 'User successfully invited', type: 'success' })
    },
    onError: (error: Error) => { toastsStore.addToast({ message: error.message, type: 'error' }) }
  })
  return (
    <>
      <button className="btn action-button" onClick={() => (document.getElementById(element_id) as HTMLDialogElement).show()}>Invite User</button>
      <dialog id={element_id} className="modal">
          <div className="modal-box">
            <p className="text-lg font-bold">
              Invite a User
            </p>
            <div>
              <label className="label mt-2">
                <span className="text-sm opacity-60">Email</span>
              </label>
              <input className="input w-full" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email of user here" onKeyUp={(e) => e.key === 'Enter' && inviteUser.mutate()} />
            </div>
            <div className="modal-action">
              <button className="btn gradient-background normal-case border-0 rounded-full text-white mr-3" onClick={() => inviteUser.mutate()}>Invite</button>
              <button className="btn" onClick={() => (document.getElementById(element_id) as HTMLDialogElement).close()}>Close</button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
    </>
  )
})

export default InviteUser