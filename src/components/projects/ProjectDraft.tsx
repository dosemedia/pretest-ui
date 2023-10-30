import { observer } from "mobx-react-lite";
import { Projects as Project } from "../../gql/graphql";

const ProjectDraft = observer(({ project }: { project: Project }) => {
  return (
    <>
      <div>
        {project.name}
      </div>
    </>
  )
})

export default ProjectDraft