import { QueryKey, useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { ProjectsContext } from "../../stores/stores";
import { useContext } from 'react'
import ErrorMessage from "../../components/lib/Error";
import { Projects as Project } from "../../gql/graphql";
import ProjectDraft from "../../components/projects/ProjectDraft";
import { SpinningLoading } from "../../components/lib/SpinningLoading";

const projectDetail = observer(() => {
  const { projectId } = useParams() as { projectId: string }
  const projectStore = useContext(ProjectsContext)
  const { data, error, refetch, isLoading } = useQuery<Promise<Project | undefined>, Error, Project, QueryKey>({
    queryKey: ['project'],
    retry: false,
    queryFn: () => projectStore.fetchFullProject({ projectId })
  })
  return (
  <>
    <div className="m-8">
      { isLoading && <SpinningLoading isLoading={isLoading} /> }
      { error && <ErrorMessage message={error.message} />}
      { data &&
        <div>
          <ProjectDraft project={data} onUpdate={() => refetch()} />
        </div>
      }
    </div>
  </>
  )
})

export default projectDetail