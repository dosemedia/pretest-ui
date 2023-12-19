import { useContext, useState } from 'react'
import { AuthContext } from '../../stores/stores'
import { observer } from "mobx-react-lite"
import { useNavigate, Link, useLocation } from 'react-router-dom'
import validator from 'validator'
import {
  useMutation,
} from '@tanstack/react-query'
import MessageAlert from '../MessageAlert'
import { SpinningLoading } from '../lib/SpinningLoading'

const RegisterForm = observer(() => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const fromState = location.state as { from: { pathname: string } } | null

  const [email, setEmail] = useState('')
  const [emailValid, setEmailValid] = useState(true)
  const [passwordValid, setPasswordValid] = useState(true)
  const [password, setPassword] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)

  const handleRegister = async () => {
    if (termsAccepted && emailValid && passwordValid) {
      handleRegisterMutation.mutate()
    }
  }

  const handleRegisterMutation = useMutation({
    mutationFn: () => auth.register(email, password),
    onSuccess: () => { 
      if (fromState) {
        navigate(fromState.from.pathname)
      } else {
        navigate('/')
      }
    }
  })

  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
    // Don't set invalid on empty
    if (!email || validator.isEmail(e.currentTarget.value)) {
      setEmailValid(true)
    } else {
      setEmailValid(false)
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
    <div>
      <div style={{ marginTop: 36 }}>
        <p className="text-lg font-bold">Sign up</p>
        <p style={{ marginTop: 10 }} className="text-base" >Want to see what Orchard can do for you?</p>
      </div>

      <div className="form-control" style={{ marginTop: 20 }}>
        <label className="label">
          <span className="text-sm opacity-60">Email</span>
        </label>
        <input id="email" type="text" className={(emailValid ? '' : 'p-invalid') + ' input'} placeholder="Email" value={email} onChange={handleEmailChange} />
        <label className="label" style={{ marginTop: 20 }}>
          <span className="text-sm opacity-60">Password</span>
        </label>
        <input id="password" type="password" className={(passwordValid ? '' : 'p-invalid') + ' input'} placeholder="Password" value={password} onChange={handlePasswordChange} onKeyUp={(e) => {if(e.key === 'Enter'){handleRegister()}}} />
        <div style={{marginTop: 20}}>
          <input id="legal_checkbox" type="checkbox" className="checkbox" style={{ verticalAlign: 'middle', marginRight: 10 }} onChange={() => setTermsAccepted(!termsAccepted)} checked={termsAccepted} />
          <span>I accept the legal stuff!</span>
        </div>
        <div className="flex" style={{ gap: 16, marginTop: 20 }}>
          <button id="signup_button" className="btn action-button text-base font-bold" onClick={handleRegister} disabled={handleRegisterMutation.isLoading || !termsAccepted || !email || !password || !emailValid}>
            Sign up <SpinningLoading isLoading={handleRegisterMutation.isLoading} />
          </button>
          <p className="text-base" style={{ lineHeight: '106%' }}>
            Have an account?
            <br></br>
            <Link to='/auth/login' style={{ textDecoration: 'underline' }}>Log in</Link>
          </p>
        </div>
        <p className="text-xs opacity-60" style={{ marginTop: 37 }}>
          By clicking “Sign Up” I agree to Orchards Terms of Use and Privacy Policy and to receive electronic communication about my accounts and services.
        </p>
        { handleRegisterMutation.isError &&
          <div style={{marginTop: '1em'}}>
            <MessageAlert message={(handleRegisterMutation.error as Error).message} type="error" />
          </div>
        }
      </div>
    </div>
  )
})

export default RegisterForm
