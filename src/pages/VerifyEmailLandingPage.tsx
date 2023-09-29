import { useContext, useEffect } from 'react'
import { authStore } from '../stores/stores'
import { observer } from "mobx-react-lite"
import { LoaderFunction } from 'react-router-dom'
import { AuthContext } from '../stores/stores'

import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner'

export const verifyEmailLandingPageLoader : LoaderFunction = ({ params }) => {
  const { code } = params as { code: string }

  // verifyEmail is async, but don't hold up page load for it
  authStore.verifyEmail(code)
  return { triggered: true }
}

const VerifyEmailLandingPage = observer(() => {
  const auth = useContext(AuthContext)

  // IMPORTANT NOTE, I am triggering call to verifyEmail in the loader above to prevent
  // issues with the lovely double useEffect issue : 
  // https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development
  // (so, not using useEffect to trigger api call here)

  useEffect(() => {
    // reset wait and error on mount
    auth.resetVerifyEmail()
  }, [])

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div>
        <h1>Email Verification</h1>
      </div>

      { auth.verifyEmailWait &&
        <ProgressSpinner />
      }

      { (!auth.verifyEmailWait && !auth.verifyEmailError) && 
        <div style={{marginTop: '1em'}}>
          <Message severity="success" text="Your email has been verified." />
        </div>
      }

      { (!auth.verifyEmailWait && auth.verifyEmailError) && 
        <div style={{marginTop: '1em'}}>
          <Message severity="error" text={'Email verification failed' + auth.verifyEmailError} />
        </div>
      }
    </div>
  )
})

export default VerifyEmailLandingPage
