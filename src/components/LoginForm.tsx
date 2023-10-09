import { useContext, useState } from 'react'
import { AuthContext } from '../stores/stores'
import { observer } from "mobx-react-lite"
import { useNavigate } from 'react-router-dom'
import {
  useMutation,
} from '@tanstack/react-query'

const LoginForm = observer(() => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginMutation = useMutation({
    mutationFn: () => auth.login(email, password),
    onSuccess: () => {
      navigate('/')
    }
  })

  const handleLogin = () => {
    handleLoginMutation.mutate()
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div>
        <h1>Login</h1>
      </div>

      <div style={{marginTop: '1em'}}>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
      </div>
      
      <div style={{marginTop: '1em'}}>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyUp={(e) => {if(e.key === 'Enter'){handleLogin()}}} />
      </div>

      { handleLoginMutation.isError && 
        <div style={{marginTop: '1em'}}>
          <div className="messageError">{ (handleLoginMutation.error as Error).message }</div>
        </div>
      }

      <div style={{marginTop: '1em'}}>
        <button onClick={handleLogin} disabled={handleLoginMutation.isLoading}>Login</button> 
      </div>
    </div>
  )
})

export default LoginForm
