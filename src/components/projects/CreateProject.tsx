import { useMutation } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { ProjectsContext, TeamsContext, ToastsContext } from "../../stores/stores";

const createProject = observer(({ onCreate }: { onCreate: () => void }) => {
  const projects = useContext(ProjectsContext)
  const teams = useContext(TeamsContext)
  const toasts = useContext(ToastsContext)
  const element_id = "create_project_modal"
  const [name, setName] = useState('')
  function removeFields () {
    setName('')
  }
  const createProject = useMutation({
    mutationKey: ['createProject'],
    mutationFn: () => {
      return projects.createProject({ name, team_id: teams.activeTeam?.id })
    },
    onSuccess: () => {
      (document.getElementById(element_id) as HTMLDialogElement).close()
      removeFields()
      toasts.addToast({ message: 'Project successfully created', type: 'success' })
      onCreate()
    },
    onError: (error: Error) => { toasts.addToast({ message: error.message, type: 'error' }) }
  })
  return (
    <>
      <div>
        <button className="btn btn-sm gradient-background text-white normal-case border-0 rounded-full" style={{ fontSize: 18, fontWeight: '500' }} onClick={() => (document.getElementById(element_id) as HTMLDialogElement).show()}>
          Launch a test <span className="mdi mdi-chevron-up text-base" />
        </button>
        <dialog id={element_id} className="modal">
          <div className="modal-box">
            <p className="text-lg font-bold">
              Create New Project
            </p>
            <div>
              <label className="label mt-2">
                <span className="text-sm opacity-60">Name</span>
              </label>
              <input className="input w-full" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter a project name here" onKeyUp={(e) => e.key === 'Enter' && createProject.mutate()} />
            </div>
            <div className="modal-action">
              <button className="btn gradient-background normal-case border-0 rounded-full text-white mr-3" onClick={() => createProject.mutate()}>Create</button>
              <button className="btn" onClick={() => (document.getElementById(element_id) as HTMLDialogElement).close()}>Close</button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </>
  )
})

export default createProject