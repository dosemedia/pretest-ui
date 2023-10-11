import { useContext, useState, useEffect } from 'react'
import { observer } from "mobx-react-lite"
import { AuthContext } from '../stores/stores'
import { useParams, useNavigate } from 'react-router-dom'
import validator from 'validator'
import {
  useMutation,
} from '@tanstack/react-query'
import MessageAlert from '../components/MessageAlert'

const ResetPasswordPage = observer(() => {
  const auth = useContext(AuthContext)
  const { code } = useParams() as { code: string }
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [emailValid, setEmailValid] = useState(true)
  const [passwordValid, setPasswordValid] = useState(true)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true)

  const handleCompletePasswordResetMutation = useMutation({
    mutationFn: () => auth.resetPassword(code, email, password),
  })

  const handleCompletePasswordReset = async () => {
    if (passwordValid) {
      await handleCompletePasswordResetMutation.mutateAsync()
    }
  }

  useEffect(() => {
    if (handleCompletePasswordResetMutation.isSuccess) {
      navigate("/auth/login")
    }
  }, [handleCompletePasswordResetMutation])

  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
    // Don't set invalid on empty
    if (!email || validator.isEmail(e.currentTarget.value)) {
      setEmailValid(true)
    } else {
      setEmailValid(false)
    }
  }

  const handleConfirmPasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setConfirmPassword(e.currentTarget.value)
    // Don't set invalid on empty
    if (!confirmPassword || e.currentTarget.value.length >= 6) {
      setConfirmPasswordValid(true)
    } else {
      setConfirmPasswordValid(false)
    }
  }

  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
    // Don't set invalid on empty
    if (!password || e.currentTarget.value.length >= 6) {
      setPasswordValid(true)
    } else {
      setPasswordValid(false)
    }
  }

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
                  <p className="text-lg font-bold">Reset Password</p>
                  <p style={{ marginTop: 10 }} className="text-base" >Please choose a new password.</p>
                </div>

                <div className="form-control" style={{ marginTop: 20 }}>
                  <label className="label">
                    <span className="text-sm opacity-60">Email</span>
                  </label>
                  <input type="text" className={(emailValid ? '' : 'p-invalid') + ' input'} placeholder="Email" value={email} onChange={handleEmailChange} />
                  <label className="label" style={{ marginTop: 10 }}>
                    <span className="text-sm opacity-60">New Password</span>
                  </label>
                  <input type="password" className={(passwordValid ? '' : 'p-invalid') + ' input'} placeholder="New Password" value={password} onChange={handlePasswordChange} />
                  <label className="label" style={{ marginTop: 10 }}>
                    <span className="text-sm opacity-60">Confirm Password</span>
                  </label>
                  <input type="password" className={(passwordValid ? '' : 'p-invalid') + ' input'} placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} onKeyUp={(e) => {if(e.key === 'Enter'){handleCompletePasswordReset()}}} />
                </div>


                { handleCompletePasswordResetMutation.isError && 
                  <div style={{marginTop: 20 }}>
                    <MessageAlert message={(handleCompletePasswordResetMutation.error as Error).message} type="error" />
                  </div>
                }

                <div style={{marginTop: 30 }}>
                  <button className="btn action-button text-base font-bold" onClick={handleCompletePasswordReset} disabled={handleCompletePasswordResetMutation.isLoading || !email || !password || !confirmPassword || password !== confirmPassword}>Reset password</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default ResetPasswordPage
