import LoginForm from "../components/LoginForm"
import { observer } from "mobx-react-lite"
import { Link } from 'react-router-dom'

const LoginPage = observer(() => {
  return (
    <>
      <Link to={`/`}>Home</Link>
      <LoginForm />
    </>
  )
})

export default LoginPage
