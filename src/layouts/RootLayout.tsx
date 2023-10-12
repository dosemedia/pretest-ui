import { Outlet, useLocation } from "react-router-dom"
import { AuthContext } from '../stores/stores'
import { useContext } from 'react'
import { observer } from "mobx-react-lite"
import { Link } from 'react-router-dom'

const RootLayout = observer(() => {
  const auth = useContext(AuthContext)
  const location = useLocation()

  const toolbarStart = (
    <>
      <Link to={`/`}>pretest</Link>
    </>
  )
  const toolbarEnd = (
    <>
    <Link to={`/contact`} style={{marginRight: 25}}>Contact</Link>
    {
      auth.isAuthenticated ?
        <>
          <button onClick={() => auth.logout()}>Logout</button>
          <Link style={{ marginLeft: 25 }} to={`/me/profile`}>Profile</Link>
        </>
        :
        location.pathname !== '/auth/login' ? <Link to={`/auth/login`}>Login</Link> : <div></div>
    }
    </>
  )

  return (
    <>
      <div>
        {toolbarStart}
        {toolbarEnd}
      </div>
      <div id="detail">
          <Outlet />
      </div>
    </>
  );
})

export default RootLayout
