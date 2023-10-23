import { useContext, useEffect } from 'react'
import { observer } from "mobx-react-lite"
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../stores/stores'
import {
  useMutation,
} from '@tanstack/react-query'
import MessageAlert from '../../components/MessageAlert'

const VerifyEmailLandingPage = observer(() => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const { code } = useParams() as { code: string }

  const verifyEmailMutation = useMutation({
    mutationFn: () => auth.verifyEmail(code),
  })

  useEffect(() => {
    // Small kludge to prevent the mutation from firing twice in development
    // https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development
    const cancelTimout = setTimeout(() => {
      verifyEmailMutation.mutate()
    }, 250)
    return () => clearTimeout(cancelTimout)
  }, [])

  return (
    <div className="auth-background">
      <div className="container mx-auto">
        <div className="flex justify-center items-center h-screen">
          <div className="card w-11/12 md:w-5/12">
            <div className="card-body">
              <div className="card-title">
                <figure><img src="/src/assets/orchard_logo.png" alt="orchard_logo" width="157" /></figure>
              </div>
              <div style={{ marginTop: 36 }}>
                <div>

                  { verifyEmailMutation.isLoading &&
                    <progress className="progress progress-primary w-56"></progress>
                  }

                  { verifyEmailMutation.isSuccess && 
                    <div>
                      <MessageAlert message="Your account has been verified!" type="success" />
                      <button className="btn action-button text-base font-bold" style={{ marginTop: 30 }} onClick={() => navigate('/')}>Continue to dashboard</button>
                    </div>
                  }

                  { verifyEmailMutation.isError && 
                    <div>
                      <MessageAlert message={(verifyEmailMutation.error as Error).message} type="error" />
                    </div>
                  }
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default VerifyEmailLandingPage
