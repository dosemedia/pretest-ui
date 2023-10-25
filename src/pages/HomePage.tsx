import { observer } from "mobx-react-lite"
import ProjectsTable from "../components/projects/ProjectsTable"
import { AuthContext } from "../stores/stores"
import { useContext } from "react"

const HomePage = observer(() => {
  const auth = useContext(AuthContext)
  return (
    <>
      <div>
        <div className="flex justify-center">
          <div className="w-10/12">
            {auth.isAuthenticated && <ProjectsTable />}
          </div>
        </div>
      </div>
    </>
  )
})

export default HomePage
