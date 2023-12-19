import { useContext, useState } from 'react'
import { AuthContext } from '../../stores/stores'
import { observer } from "mobx-react-lite"
import { useNavigate, Link, useLocation } from 'react-router-dom'
import {
  useMutation,
} from '@tanstack/react-query'
import MessageAlert from '../MessageAlert'
import { SpinningLoading } from '../lib/SpinningLoading'

const LoginForm = observer(() => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const fromState = location.state as { from: { pathname: string } } | null

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginMutation = useMutation({
    mutationFn: () => auth.login(email, password),
    onSuccess: () => {
      if (fromState) {
        navigate(fromState.from.pathname)
      } else {
        navigate('/')
      }
    }
  })

  const handleLogin = () => {
    handleLoginMutation.mutate()
  }

  return (
    <div>
      <div style={{ marginTop: 36 }}>
        <p className="text-lg font-bold">Log in</p>
        <p style={{ marginTop: 10 }} className="text-base" >Want to see what Orchard can do for you?</p>
      </div>

      <div style={{ marginTop: 20 }}>
        <div className="form-control">
          <label className="label">
            <span className="text-sm opacity-60">Email</span>
          </label>
          <input id="email" type="text" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
          <label className="label" style={{ marginTop: 20 }}>
            <span className="text-sm opacity-60">Password</span>
          </label>
          <input id="password" type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyUp={(e) => {if(e.key === 'Enter'){handleLogin()}}} />
          <div className="flex justify-end">
            <Link to='/auth/forgot' className="text-xs" style={{ marginTop: 20 }}>Forgot password?</Link>
          </div>
          <div className="flex" style={{ gap: 16, marginTop: 20 }}>
            <button id="login_button" className="btn action-button text-base font-bold" onClick={handleLogin} disabled={handleLoginMutation.isLoading}>
              Log in <SpinningLoading isLoading={handleLoginMutation.isLoading} />
            </button>
            <p className="text-base" style={{ lineHeight: '106%' }}>
              Don't have an account?
              <br></br>
              <Link to='/auth/register' style={{ textDecoration: 'underline' }} state={ location ? { from: fromState?.from } : null}>Sign up now</Link>
            </p>
          </div>
          <p className="text-xs opacity-60" style={{ marginTop: 37 }}>
            By clicking “Log in” I agree to Orchards Terms of Use and Privacy Policy and to receive electronic communication about my accounts and services.
          </p>
        </div>
        { handleLoginMutation.isError &&
          <div id="error_message" style={{marginTop: 20 }}>
            <MessageAlert message={(handleLoginMutation.error as Error).message} type="error" />
          </div>
        }
      </div>
    </div>
  )
})

export default LoginForm
