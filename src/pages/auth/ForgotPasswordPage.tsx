import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm"

export default function ForgotPasswordPage() {
  return (
    <div className="auth-background">
      <div className="container mx-auto">
        <div className="flex justify-center items-center h-screen">
          <div className="card w-11/12 md:w-5/12">
            <div className="card-body">
              <div className="card-title">
                <figure><img src="/src/assets/orchard_logo.png" alt="orchard_logo" width="157" /></figure>
              </div>
              <ForgotPasswordForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
