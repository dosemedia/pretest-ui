import LoginForm from "../components/LoginForm"

export default function LoginPage() {
  return (
    <div className="auth-background">
      <div className="container mx-auto">
        <div className="flex justify-center items-center h-screen">
          <div className="card w-11/12 md:w-5/12">
            <div className="card-body">
              <div className="card-title">
              <figure><img src="/src/assets/orchard_logo.png" alt="orchard_logo" width="157" /></figure>
              </div>
              <LoginForm />
              {/* <div style={{textAlign: 'center', marginTop: '1em'}}>
                <Link to='/auth/register'>Register</Link> |&nbsp;
                <Link to='/auth/forgot'>Forgot Password</Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
