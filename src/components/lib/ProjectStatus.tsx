import { observer } from "mobx-react-lite";
import { Projects as Project } from "../../gql/graphql";
import { ProjectStatus } from "../../stores/projects";
const ProjectStatusView = observer(({ project }: { project: Project }) => {
  const status = () => {
    switch (project.status) {
      case ProjectStatus.DRAFT:
        return { color: 'rgba(210, 214, 205, 0.30)', label: 'Draft' }
      case ProjectStatus.REVIEW:
        return { color: 'rgba(72, 19, 38, 0.30)', label: 'Pending review' }
      case ProjectStatus.SUBMITTED:
          return { color: 'rgba(34, 133, 161, 0.30)', label: 'Review completed' }
      case ProjectStatus.ACTIVE:
        return { color: 'rgba(106, 179, 181, 0.30)', label: 'Running' }
      case ProjectStatus.COMPLETE:
        return { color: 'rgba(171, 211, 107, 0.30)', label: 'Complete' }

      default:
        return { color: 'rgba(210, 214, 205, 0.30', label: 'Draft' }
    }
  }
  return (
    <>
      <div className="border-none rounded-full py-1 text-center" style={{ color: '#47463D', backgroundColor: status().color, width: 130 }}>
        {status().label}
      </div>
    </>
  )
})

export default ProjectStatusView