import { observer } from "mobx-react-lite";
import { Projects as Project } from "../../gql/graphql";
import { useContext, useState } from "react";
import { AuthContext, ProjectsContext, TeamsContext, ToastsContext } from "../../stores/stores";
import { useQuery, QueryKey, useMutation } from "@tanstack/react-query";
import ErrorMessage from "../lib/Error";
import DeleteModal from "../lib/DeleteModal";
import CreateProject from "./CreateProject";
import { Link } from "react-router-dom";

const ProjectsTable = observer(() => {
  const projectStore = useContext(ProjectsContext)
  const teams = useContext(TeamsContext)
  const auth = useContext(AuthContext)
  const toastStore = useContext(ToastsContext)
  const [itemToDelete, setItemToDelete] = useState<Project | null>(null)
  const deleteModalID = 'delete_modal'
  const { data, error, isLoading, refetch } = useQuery<Promise<Project[] | undefined>, Error, Project[], QueryKey>({
    queryKey: ['fetchProjects', auth.id],
    queryFn: () => {
      if (teams.activeTeam) {
        return projectStore.fetchProjects({ teamId: teams.activeTeam?.id })
      }
      return Promise.resolve([] as Project[])
    }
  })
  const onDelete = useMutation({
    onSuccess: () => {
      refetch();
      (document.getElementById(deleteModalID) as HTMLDialogElement).close();
      toastStore.addToast({ message: 'You have successfully deleted this project', type: 'success' })
    },
    mutationFn: () => projectStore.delete({ id: itemToDelete?.id }),
    onError: (error: Error) => {
      toastStore.addToast({ message: error.message, type: 'error' })
    }
  })
  function tableRow(project: Project) {
    return (
      <tr key={project.id}>
        <td>{project.name}</td>
        <th>{project.id}</th>
        <td>{new Date(project.created_at).toLocaleDateString()}</td>
        <td><button className="btn btn-circle btn-sm bg-error border-none" onClick={() => { (document.getElementById(deleteModalID) as HTMLDialogElement).showModal(); setItemToDelete(project) }}><span className="mdi mdi-delete text-white"></span></button></td>
      </tr>
    )
  }
  return (
    <>
      {isLoading && <div>loading...</div>}
      {
        error && <ErrorMessage message={error.message} />
      }
      {
        !teams.activeTeam && <div className="alert alert-info text-white"><span>You are not part of a team yet! Create a team <Link className="underline" to="/teams">here</Link> and start your create your first test today!</span></div>
      }
      {data && teams.activeTeam &&
        <>
          <div className="flex items-center justify-center mb-6">
            <div className="flex-1">
              <input className="input w-full" placeholder="Search or jump to" />
            </div>
            <div className="ml-4">
              <CreateProject onCreate={() => refetch() } />
            </div>
          </div>
          <div className="card" style={{ backgroundColor: "white" }}>
            <div className="card-title text-sm" style={{ opacity: 0.6, color: "#282828" }}>
              {teams.activeTeam?.name} --- Tests Overview
            </div>
            {auth.user.display_name &&
              <div className="text-lg font-bold">
                Welcome, {auth.user.display_name}
              </div>
            }
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Created At</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((item: Project) => tableRow(item))
                  }
                </tbody>
              </table>
              { data.length === 0 && <p className="mt-8">You have no projects yet. Launch your first test today!</p>}
            </div>
          </div>
        </>
      }
      <DeleteModal element_id={deleteModalID} model={itemToDelete} model_type="Project" onDelete={() => onDelete.mutate()} />
    </>
  )
})

export default ProjectsTable