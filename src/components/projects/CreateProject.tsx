import { useMutation } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { ProjectsContext, TeamsContext, ToastsContext } from "../../stores/stores";
import { useNavigate } from "react-router-dom";
import { ToastType } from "../../stores/toast";
import { Projects as Project } from "../../gql/graphql";
import { SpinningLoading } from "../lib/SpinningLoading";

const createProject = observer(() => {
  const projects = useContext(ProjectsContext)
  const teams = useContext(TeamsContext)
  const toasts = useContext(ToastsContext)
  const navigate = useNavigate()
  const element_id = "create_project_modal"
  const [name, setName] = useState('')
  function removeFields() {
    setName('')
  }
  const createTemplateProjectMutation = useMutation({
    mutationKey: ['createTemplateProject'],
    mutationFn: () => projects.createTemplateProject({ templateName: 'demo', teamId: teams.activeTeam?.id }),
    onSuccess: onSuccessfulProjectCreate,
    onError: (error: Error) => { toasts.addToast({ message: error.message, type: ToastType.ERROR }) }
  })
  const createProject = useMutation({
    mutationKey: ['createProject'],
    mutationFn: () => {
      return projects.createProject({ name, team_id: teams.activeTeam?.id })
    },
    onSuccess: onSuccessfulProjectCreate,
    onError: (error: Error) => { toasts.addToast({ message: error.message, type: ToastType.ERROR }) }
  })

  function onSuccessfulProjectCreate(data: Project | undefined) {
    (document.getElementById(element_id) as HTMLDialogElement).close()
    removeFields()
    toasts.addToast({ message: 'Project successfully created', type: ToastType.SUCCESS })
    if (data?.id) {
      navigate(`/project/${data.id}`)
    }
  }
  return (
    <>
      <div>
        <button className="btn btn-sm gradient-background text-white normal-case border-0 rounded-full" style={{ fontSize: 18, fontWeight: '500' }} onClick={() => (document.getElementById(element_id) as HTMLDialogElement).show()}>
          launch a test <span className="mdi mdi-chevron-up text-base" />
        </button>
        <dialog id={element_id} className="modal">
          <div className="modal-box">
            <p className="text-lg font-bold">
              create new project
            </p>
            <p className="mb-8">
              Select a template below or start from scatch
            </p>
            <button className="btn mb-4 gradient-background text-white normal-case border-none font-bold" onClick={() => createTemplateProjectMutation.mutate()}>
              demo template <SpinningLoading isLoading={createTemplateProjectMutation.isLoading} />
            </button>
            <div className="flex items-center gap-x-5">
              <hr className="flex-1" />
              <p className="text-gray-400">
                or
              </p>
              <hr className="flex-1" />
            </div>
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