import { useContext, useState } from 'react'
import { AuthContext } from '../stores/stores'
import { observer } from "mobx-react-lite"
import {
  useMutation,
} from '@tanstack/react-query'

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
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div>
        <h1>Request Password Reset Link</h1>
      </div>

      <div style={{marginTop: '1em'}}>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} readOnly={requestResetEmailMutation.isSuccess} onKeyUp={(e) => {if(e.key === 'Enter'){requestResetEmail()}}} />
      </div>

      { requestResetEmailMutation.isError && 
        <div style={{marginTop: '1em'}}>
          <div className="messageError">{ (requestResetEmailMutation.error as Error).message }</div>
        </div>
      }

      { requestResetEmailMutation.isSuccess && 
        <div style={{marginTop: '1em'}}>
          <div className="messageSuccess">Password reset email sent.</div>
        </div>
      }

      { !requestResetEmailMutation.isSuccess &&
        <div style={{marginTop: '1em'}}>
          <button onClick={requestResetEmail} disabled={requestResetEmailMutation.isLoading}>Submit</button>  
        </div>
      }
    </div>
  )
})

export default ForgotPasswordForm
