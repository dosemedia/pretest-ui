import { observer } from "mobx-react-lite";
import { Projects as Project } from "../../gql/graphql";
const ProjectStatus = observer(({ project }: { project: Project }) => {
  const  status = () => {
    switch (project.status) {
      case 'review':
        return { color: 'rgba(72, 19, 38, 0.30)', label: 'Pending review' }
      case 'active':
        return { color: 'rgba(106, 179, 181, 0.30)', label: 'Running' }
      case 'complete':
        return { color: 'rgba(171, 211, 107, 0.30)', label: 'Complete' }
      default:
        return { color: 'rgba(210, 214, 205, 0.30', label: 'Draft' }
    }
  }
  return (
    <>
      <div className="badge border-none p-3" style={{ color: '#47463D', backgroundColor: status().color }}>
        {status().label}
      </div>
    </>
  )
})

export default ProjectStatus