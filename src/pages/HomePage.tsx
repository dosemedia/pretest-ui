import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../stores/stores'
import { observer } from "mobx-react-lite"
import { Button } from 'primereact/button'

const HomePage = observer(() => {
  const auth = useContext(AuthContext)
  return (
    <>
      <div>Home Page</div>
      {
        auth.isAuthenticated ? <Button label="Logout" onClick={() => auth.logout()} /> : <Link to={`auth/login`}>Login</Link>
      }
    </>
  )
})

export default HomePage
