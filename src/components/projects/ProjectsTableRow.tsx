import { observer } from "mobx-react-lite";
import { Projects as Project } from "../../gql/graphql";
import { useNavigate } from "react-router-dom";
import { ProjectStatus } from "../../stores/projects";
import ProjectStatusView from "../lib/ProjectStatus";
const ProjectsTableRow = observer(({ project, onModalClicked }: { project: Project, onModalClicked: (modalId: string, project: Project) => void }) => {
  const navigate = useNavigate()
  function projectAction(project: Project) {
    return (
      <div className="underline" style={{ fontSize: 14 }} onClick={(e) => { e.stopPropagation(); onModalClicked('download_report', project) }}>
        {project.status === ProjectStatus.COMPLETE && <p>Download Report</p>}
      </div>
    )
  }
  return (
    <>
      <tr key={project.id} className="hover:bg-slate-100 cursor-pointer" onClick={() => { navigate(`/project/${project.id}`) }}>
        <td>
          {project.name}
          <div>
            {projectAction(project)}
          </div>
        </td>
        <th>{project.id}</th>
        <td>{new Date(project.created_at).toLocaleDateString()}</td>
        <td><ProjectStatusView project={project} /></td>
        <td><button className="btn btn-circle btn-sm bg-error border-none" onClick={(e) => {e.stopPropagation(); onModalClicked('delete_modal', project) }}><span className="mdi mdi-delete text-white"></span></button></td>
      </tr>
    </>
  )
})

export default ProjectsTableRow