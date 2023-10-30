import { QueryKey, useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { ProjectsContext } from "../../stores/stores";
import { useContext } from 'react'
import { SpinningLoading } from "../../components/lib/SpinningLoading";
import ErrorMessage from "../../components/lib/Error";
import { Projects as Project } from "../../gql/graphql";
import ProjectDraft from "../../components/projects/ProjectDraft";

const projectDetail = observer(() => {
  const { projectId } = useParams() as { projectId: string }
  const projectStore = useContext(ProjectsContext)
  const { data, error, isLoading } = useQuery<Promise<Project | undefined>, Error, Project, QueryKey>({
    queryKey: ['project', projectId],
    queryFn: () => projectStore.fetchProject({ projectId })
  })
  return (
  <>
    <div>
      { isLoading && <SpinningLoading isLoading={isLoading} /> }
      { error && <ErrorMessage message={error.message} />}
      { data &&
        <div>
          {data.is_draft ? <ProjectDraft project={data} /> : <div>// TODO Create project landing page</div> }
        </div>
      }
    </div>
  </>
  )
})

export default projectDetail