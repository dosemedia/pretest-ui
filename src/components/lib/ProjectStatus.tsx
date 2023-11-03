import { observer } from "mobx-react-lite";
import { Projects as Project } from "../../gql/graphql";
import { DateTime } from "luxon"
const ProjectStatus = observer(({ project }: { project: Project }) => {
  const  status = () => {
    const start = DateTime.fromISO(project.start_time)
    const stop = DateTime.fromISO(project.stop_time)
    if (project.is_draft) {
      return { color: 'rgba(210, 214, 205, 0.30', label: 'Draft' }
    } else if (project.start_time && project.stop_time && DateTime.now() >= start && DateTime.now() <= stop) {
      return { color: 'rgba(106, 179, 181, 0.30)', label: 'Running' }
    } else if (project.stop_time && DateTime.now() > stop) {
      return { color: 'rgba(171, 211, 107, 0.30)', label: 'Complete' }
    }
    return { color: 'rgba(72, 19, 38, 0.30)', label: 'Pending review' }
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