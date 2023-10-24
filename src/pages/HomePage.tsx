import { observer } from "mobx-react-lite"
import ProjectsTable from "../components/projects/ProjectsTable"
import { AuthContext } from "../stores/stores"
import { useContext } from "react"

const HomePage = observer(() => {
  const auth = useContext(AuthContext)
  return (
    <>
      { auth.isAuthenticated && <ProjectsTable /> }
    </>
  )
})

export default HomePage
