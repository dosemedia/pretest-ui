import { useContext, useState } from 'react'
import { AuthContext } from '../stores/stores'
import { observer } from "mobx-react-lite"
import {
  useMutation,
} from '@tanstack/react-query'
import MessageAlert from './MessageAlert'
import { SpinningLoading } from './lib/SpinningLoading'

const ForgotPasswordForm = observer(() => {
  const auth = useContext(AuthContext)

  const [email, setEmail] = useState('')

  const requestResetEmail = async () => {
    await requestResetEmailMutation.mutateAsync()
  }

  const requestResetEmailMutation = useMutation({
    mutationFn: () => auth.sendPasswordResetEmail(email),
  })

  return (
    <div>
      <div style={{ marginTop: 36 }}>
        <p className="text-lg font-bold">Forgot your password?</p>
        <p style={{ marginTop: 10 }} className="text-base" >Send a link to your email to reset your password</p>
      </div>

      <div className="form-control" style={{ marginTop: 20 }}>
        <label className="label">
          <span className="text-sm opacity-60">Email</span>
        </label>
        <input type="text" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} readOnly={requestResetEmailMutation.isSuccess} onKeyUp={(e) => {if(e.key === 'Enter'){requestResetEmail()}}} />
      </div>

      { requestResetEmailMutation.isError && 
        <div style={{marginTop: 26 }}>
          <MessageAlert message={( requestResetEmailMutation.error as Error).message } type="error" />
        </div>
      }

      { requestResetEmailMutation.isSuccess && 
        <div style={{marginTop: 26 }}>
          <MessageAlert message="Password reset email sent" type="success" />
        </div>
      }

      { !requestResetEmailMutation.isSuccess &&
        <div style={{marginTop: 26 }}>
          <button className="btn action-button text-base font-bold" onClick={requestResetEmail} disabled={requestResetEmailMutation.isLoading}>Submit <SpinningLoading isLoading={requestResetEmailMutation.isLoading} /></button>  
        </div>
      }
    </div>
  )
})

export default ForgotPasswordForm
