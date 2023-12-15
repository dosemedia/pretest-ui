import { useQuery } from "@tanstack/react-query"
import { Projects as Project } from "../../gql/graphql"
import { projectStore } from "../../stores/stores"
const withProjectDraftRenderController = (WrappedElement: React.FC<{ project: Project, onSave: () => void}>, projectId: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { data } = useQuery({
  //   queryKey: ['fetchProject'],
  //   retry: false,
  //   queryFn: () => projectStore.fetchFullProject({ projectId })
  // })
  function onUpdate() {
    console.log('update')
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (props: any) => {
    return <WrappedElement {...props} project={projectId} onSave={onUpdate} />
  }
}

export default withProjectDraftRenderController