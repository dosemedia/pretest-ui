import { observer } from "mobx-react-lite";
import { useState, useContext } from 'react'
import { TeamsContext, ToastsContext } from "../../stores/stores";
import { useMutation } from "@tanstack/react-query";
const CreateTeam = observer(({ onCreate }: { onCreate: () => void}) => {
  const teamsStore = useContext(TeamsContext)
  const toastsStore = useContext(ToastsContext)
  const element_id = 'create_team'
  const [name, setName] = useState('')

  function removeFields () {
    setName('')
  }
  const createTeam = useMutation({
    mutationKey: ['createTeam'],
    mutationFn: () => {
      return teamsStore.createTeam(name)
    },
    onSuccess: () => {
      (document.getElementById(element_id) as HTMLDialogElement).close()
      removeFields()
      toastsStore.addToast({ message: 'Team successfully created', type: 'success' })
      onCreate()
    },
    onError: (error: Error) => { toastsStore.addToast({ message: error.message, type: 'error' }) }
  })
  return (
    <>
      <button className="btn action-button" onClick={() => (document.getElementById(element_id) as HTMLDialogElement).show()}>Create Team</button>
      <dialog id={element_id} className="modal">
        <div className="modal-box">
          <p className="text-lg font-bold">
            Create a Team
          </p>
          <div>
            <label className="label mt-2">
              <span className="text-sm opacity-60">Name</span>
            </label>
            <input className="input w-full" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter a team name here" onKeyUp={(e) => e.key === 'Enter' && createTeam.mutate()} />
          </div>
          <div className="modal-action">
            <button className="btn gradient-background normal-case border-0 rounded-full text-white mr-3" onClick={() => createTeam.mutate()}>Create</button>
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

export default CreateTeam