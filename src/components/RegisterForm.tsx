import { useContext, useState } from 'react'
import { AuthContext } from '../stores/stores'
import { observer } from "mobx-react-lite"
import { useNavigate } from 'react-router-dom'
import validator from 'validator'
import {
  useMutation,
} from '@tanstack/react-query'

const RegisterForm = observer(() => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

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
      navigate("/")
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
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div>
        <h1>Register</h1>
      </div>

      <div style={{marginTop: '1em'}}>
        <input type="text" className={emailValid ? '' : 'p-invalid'} placeholder="Email" value={email} onChange={handleEmailChange} />
      </div>
      
      <div style={{marginTop: '1em'}}>
        <input type="password" className={passwordValid ? '' : 'p-invalid'} placeholder="Password" value={password} onChange={handlePasswordChange} onKeyUp={(e) => {if(e.key === 'Enter'){handleRegister()}}} />
      </div>

      <div style={{marginTop: '1em'}}>
        <input type="checkbox" onChange={() => setTermsAccepted(!termsAccepted)} checked={termsAccepted} />
        I accept the legal stuff!
      </div>

      { handleRegisterMutation.isError && 
        <div style={{marginTop: '1em'}}>
          <div className="messageError">{ (handleRegisterMutation.error as Error).message }</div>
        </div>
      }

      <div style={{marginTop: '1em'}}>
        <button onClick={handleRegister} disabled={handleRegisterMutation.isLoading || !termsAccepted || !email || !password || !emailValid}>Register</button>
      </div>
    </div>
  )
})

export default RegisterForm
