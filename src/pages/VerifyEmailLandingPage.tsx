import { useContext, useEffect } from 'react'
import { observer } from "mobx-react-lite"
import { useParams } from 'react-router-dom'
import { AuthContext } from '../stores/stores'
import {
  useMutation,
} from '@tanstack/react-query'

const VerifyEmailLandingPage = observer(() => {
  const auth = useContext(AuthContext)
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
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div>
        <h1>Email Verification</h1>
      </div>

      { verifyEmailMutation.isLoading &&
        <div>Wait...</div>
      }

      { verifyEmailMutation.isSuccess && 
        <div style={{marginTop: '1em'}}>
          <div className="messageSuccess">Your email has been verified.</div>
        </div>
      }

      { verifyEmailMutation.isError && 
        <div style={{marginTop: '1em'}}>
          <div className="messageError">{(verifyEmailMutation.error as Error).message}</div>
        </div>
      }
    </div>
  )
})

export default VerifyEmailLandingPage
