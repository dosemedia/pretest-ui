import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../stores/stores'
import { observer } from "mobx-react-lite"

import { Button } from 'primereact/button'
import { Message } from 'primereact/message';
import { InputText } from 'primereact/inputtext'

const ForgotPasswordForm = observer(() => {
  const auth = useContext(AuthContext)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const [email, setEmail] = useState('')

  const requestResetEmail = async () => {
    await auth.sendPasswordResetEmail(email)
    if (!auth.sendPasswordResetEmailError) {
      setShowSuccessMessage(true)
    }
  }

  useEffect(() => {
    // reset wait and error on mount
    auth.resetSendPasswordResetEmail()
  }, [])

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div>
        <h1>Request Password Reset Link</h1>
      </div>

      <div style={{marginTop: '1em'}}>
        <InputText placeholder="Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} readOnly={showSuccessMessage} />
      </div>

      { auth.sendPasswordResetEmailError && 
        <div style={{marginTop: '1em'}}>
          <Message severity="error" text={auth.sendPasswordResetEmailError} />
        </div>
      }

      { showSuccessMessage && 
        <div style={{marginTop: '1em'}}>
          <Message severity="success" text="Password reset email sent." />
        </div>
      }

      { !showSuccessMessage &&
        <div style={{marginTop: '1em'}}>
          <Button style={{backgroundColor: 'var(--primary-color)'}} label="Submit" onClick={requestResetEmail} disabled={auth.sendPasswordResetEmailWait} loading={auth.sendPasswordResetEmailWait} />  
        </div>
      }
    </div>
  )
})

export default ForgotPasswordForm
