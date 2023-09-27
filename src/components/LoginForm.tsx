import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../stores/stores'
import { observer } from "mobx-react-lite"
import { useNavigate } from 'react-router-dom'

import { Button } from 'primereact/button'
import { Message } from 'primereact/message';
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'

const LoginForm = observer(() => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/")
    }
  }, [auth.isAuthenticated, navigate])

  const handleLogin = async () => {
    await auth.login(email, password)
  }

  return (
      <>
          <div>Login</div>
          { auth.loginError && <Message severity="error" text={auth.loginError} /> }
          <InputText value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
          <Password value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
          <Button label="Login" onClick={handleLogin} loading={auth.loginWait} />  
      </>
  )
})

export default LoginForm
