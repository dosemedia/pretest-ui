import { Link } from "react-router-dom"
import LoginForm from "../components/LoginForm"

export default function LoginPage() {
  return (
    <>
      <LoginForm />
      <div style={{textAlign: 'center', marginTop: '1em'}}>
        <Link to='/auth/register'>Register</Link>
      </div>
    </>
  )
}
