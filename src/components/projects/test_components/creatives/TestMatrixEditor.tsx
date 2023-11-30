import { observer } from "mobx-react-lite";
import { Projects as Project } from "../../../../gql/graphql";
const TestMatrixEditor = observer(({ project, onSave }: { project: Project, onSave: (payload: object) => void }) => {
  console.log(project, onSave)
  return (
  <>
    <div className="text-lg configuration-title mb-4">
      Build your test matrix
    </div>
  </>
  )
})

export default TestMatrixEditor