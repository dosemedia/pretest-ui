import { observer } from "mobx-react-lite";
import { Projects as Project } from "../../gql/graphql";
import { useContext, useState } from "react";
import { AuthContext, ProjectsContext, TeamsContext, ToastsContext } from "../../stores/stores";
import { useQuery, QueryKey, useMutation } from "@tanstack/react-query";
import ErrorMessage from "../lib/Error";
import DeleteModal from "../lib/DeleteModal";
import CreateProject from "./CreateProject";
import { Link, useNavigate } from "react-router-dom";
import ProjectStatus from "../lib/ProjectStatus";

const ProjectsTable = observer(() => {
  const projectStore = useContext(ProjectsContext)
  const teams = useContext(TeamsContext)
  const auth = useContext(AuthContext)
  const toastStore = useContext(ToastsContext)
  const navigate = useNavigate()
  const [itemToDelete, setItemToDelete] = useState<Project | null>(null)
  const [filter, setFilter] = useState('')
  const deleteModalID = 'delete_modal'
  const { data, error, isLoading, refetch } = useQuery<Promise<Project[] | undefined>, Error, Project[], QueryKey>({
    queryKey: ['fetchProjects', auth.id, teams.activeTeam],
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
      <tr key={project.id} className="hover:bg-slate-100 cursor-pointer" onClick={() => { navigate(`/project/${project.id}`) }}>
        <td>{project.name}</td>
        <th>{project.id}</th>
        <td>{new Date(project.created_at).toLocaleDateString()}</td>
        <td><ProjectStatus project={project} /></td>
        <td><button className="btn btn-circle btn-sm bg-error border-none" onClick={(e) => { e.stopPropagation(); (document.getElementById(deleteModalID) as HTMLDialogElement).showModal(); setItemToDelete(project) }}><span className="mdi mdi-delete text-white"></span></button></td>
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
        !teams.activeTeam && !isLoading && !data && <div className="alert alert-info text-white"><span>You are not part of a team yet! Create a team <Link className="underline" to="/teams">here</Link> and start your create your first test today!</span></div>
      }
      {data && teams.activeTeam && !isLoading &&
        <>
          <div className="flex items-center justify-center mb-6">
            <div className="flex-1">
              <input className="input w-full" placeholder="Search or jump to" value={filter} onChange={(e) => setFilter(e.target.value)} />
            </div>
            <div className="ml-4">
              <CreateProject />
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
                    <th>Status</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {
                    data.filter((item) => filter ? item.name.toLowerCase().includes(filter.toLowerCase()) : true).map((item: Project) => tableRow(item))
                  }
                </tbody>
              </table>
              {data.length === 0 && <p className="mt-8">You have no projects yet. Launch your first test today!</p>}
            </div>
          </div>
        </>
      }
      <DeleteModal element_id={deleteModalID} model={itemToDelete} model_type="Project" onDelete={() => onDelete.mutate()} />
    </>
  )
})

export default ProjectsTable