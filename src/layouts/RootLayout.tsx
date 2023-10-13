import { useNavigate } from "react-router-dom"
import { AuthContext } from '../stores/stores'
import { useContext, PropsWithChildren } from 'react'
import { observer } from "mobx-react-lite"
import { Link } from 'react-router-dom'


const RootLayout = observer(({ children }: PropsWithChildren) => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const menuLinkStyle = {
    color: '#494949'
  }

  const toolbarStart = (
    <>
      <Link className="font-bold" style={{ fontSize: 26, color: '#000' }} to={`/`}>Demo</Link> <span className="ml-4" style={{ color: '#030102', fontSize: 16, verticalAlign: 'middle' }}>Welcome to the Orchard Self Serve Demo</span>
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
        <>
          <Link to={`/auth/login`}>Login</Link>
          <button className="btn btn-sm px-4 normal-case bg-black hover:bg-black text-white rounded-full ml-4" onClick={() => navigate(`/auth/register`)}>Sign up</button>
        </>
    }
    </>
  )

  return (
    <>
      <div className="px-4 md:px-10 py-4 navbar" style={{ backgroundColor: '#B8AD862B' }}>
        <div className="flex-1">
          {toolbarStart}
        </div>
        <div className="flex-none">
          {toolbarEnd}
        </div>
      </div>
      <div className="flex">
        <ul className="menu w-56 h-screen pl-4 md:pl-6" style={{ backgroundColor: '#F5F5F3' }}>
          <div className="flex my-2 ml-4 md:my-4 md:ml-4">
            <img src="/src/assets/orchard_logo.png" width={120} />
          </div>
          <li><Link style={menuLinkStyle} className="active" to="/"><span className="mdi mdi-home mr-2"></span>Home</Link></li>
        </ul> 
        <div className="p-6">
          { children }
        </div>
      </div>
    </>
  );
})

export default RootLayout
