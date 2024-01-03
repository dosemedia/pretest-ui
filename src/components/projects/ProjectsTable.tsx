import { observer } from "mobx-react-lite";
import { Projects as Project } from "../../gql/graphql";
import { useContext, useState } from "react";
import { AuthContext, ProjectsContext, TeamsContext, ToastsContext } from "../../stores/stores";
import { useQuery, QueryKey, useMutation } from "@tanstack/react-query";
import ErrorMessage from "../lib/Error";
import CreateProject from "./CreateProject";
import { Link } from "react-router-dom";
import ProjectsTableRow from "./ProjectsTableRow";
import DeleteModal from "../lib/DeleteModal";
import DownloadReportModal from "./ProjectDownloadReport";
import { ToastType } from "../../stores/toast";

const ProjectsTable = observer(() => {
  const projectStore = useContext(ProjectsContext)
  const toastStore = useContext(ToastsContext)
  const teams = useContext(TeamsContext)
  const auth = useContext(AuthContext)
  const [activeProject, setActiveProject] = useState<Project>()
  const deleteModalID = 'delete_modal'
  const downloadReportModalID = 'download_report'
  const [filter, setFilter] = useState('')

  const onDeleteMutation = useMutation({
    onSuccess: () => {
      (document.getElementById(deleteModalID) as HTMLDialogElement).close();
      toastStore.addToast({ message: 'You have successfully deleted this project', type: ToastType.SUCCESS })
      refetch()
    },
    mutationFn: () => projectStore.delete({ id: activeProject?.id }),
    onError: (error: Error) => {
      toastStore.addToast({ message: error.message, type: ToastType.ERROR })
    }
  })

  const { data, error, isLoading, refetch } = useQuery<Promise<Project[] | undefined>, Error, Project[], QueryKey>({
    queryKey: ['fetchProjects', auth.id, teams.activeTeam],
    queryFn: () => {
      if (teams.activeTeam) {
        return projectStore.fetchProjects({ teamId: teams.activeTeam?.id })
      }
      return Promise.resolve([] as Project[])
    }
  })

  return (
    <>
      {isLoading && <div>loading...</div>}
      {
        error && <ErrorMessage message={error.message} />
      }
      {
        !teams.activeTeam && !isLoading && !data?.length && <div className="alert alert-info text-white"><span>You are not part of a team yet! Create a team <Link className="underline" to="/teams">here</Link> and start your create your first test today!</span></div>
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
              <Link to={`/team/${teams.activeTeam.id}`} className="underline">{teams.activeTeam?.name}</Link> --- Tests Overview
            </div>
            {auth.user?.display_name &&
              <div className="text-lg font-bold">
                Welcome, {auth.user?.display_name}
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
                    data.filter((item) => filter ? item.name.toLowerCase().includes(filter.toLowerCase()) : true).map((item: Project) => <ProjectsTableRow key={item.id} project={item} onModalClicked={(modalId, project) => { (document.getElementById(modalId) as HTMLDialogElement).showModal(); setActiveProject(project) }} />)
                  }
                </tbody>
              </table>
              {data.length === 0 && <p className="mt-8">You have no projects yet. Launch your first test today!</p>}
            </div>
          </div>
          <DeleteModal element_id={deleteModalID} model={activeProject as Project} model_type="Project" onDelete={() => onDeleteMutation.mutate()} />
          <DownloadReportModal element_id={downloadReportModalID} projectId={activeProject?.id} />
        </>
      }

    </>
  )
})

export default ProjectsTable