import { useContext } from 'react'
import { AuthContext } from '../stores/stores'
import { observer } from "mobx-react-lite"

const HomePage = observer(() => {
  const auth = useContext(AuthContext)
  return (
    <>
      <div className="text-3xl font-bold underline">Home Page - { auth.isAuthenticated ? 'Logged In' : 'Logged Out' }</div>
    </>
  )
})

export default HomePage
