import { useNavigate } from "react-router-dom"
import { AuthContext } from '../stores/stores'
import { useContext, PropsWithChildren } from 'react'
import { observer } from "mobx-react-lite"
import { Link, useLocation } from 'react-router-dom'


const RootLayout = observer(({ children }: PropsWithChildren) => {
  const auth = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()

  const menuLinks = [
    {
      name: 'Home',
      path: '/',
      icon: 'mdi mdi-home'
    },
    {
      name: 'Drafts',
      path: '/drafts',
      icon: 'mdi mdi-pencil-ruler'
    }
  ]

  const toolbarStart = (
    <>
      <Link className="font-bold" style={{ fontSize: 26, color: '#000' }} to={`/`}>Demo</Link> <span className="ml-4" style={{ color: '#030102', fontSize: 16, verticalAlign: 'middle' }}>Welcome to the Orchard Self Serve Demo</span>
    </>
  )
  const toolbarEnd = (
    <>
    <div className="block md:hidden">
      <label htmlFor="my-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </label>
    </div> 
    <div className="hidden md:block">
      <Link to={`/contact`} style={{marginRight: 25}}>Contact</Link>
      { auth.isAuthenticated ?
        <>
          <button onClick={() => auth.logout()}>Logout</button>
          <Link style={{ marginLeft: 25 }} to={`/me/profile`}>Profile</Link>
        </>
        :
        <>
          <Link to={`/auth/login`}>Login</Link>
          <button className="btn btn-sm px-4 normal-case bg-black hover:bg-black text-white rounded-full ml-4 border-0" onClick={() => navigate(`/auth/register`)}>Sign up</button>
        </>
      }
    </div>
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
      <div className="drawer md:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-8">
          { children }
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-56 min-h-full pl-4 md:pl-6" style={{ backgroundColor: '#F5F5F3' }}>
            <div className="flex mt-2 ml-4 md:my-4 md:ml-4" style={{ marginBottom: 29 }}>
              <img src="/src/assets/orchard_logo_gradient.svg" width={127} />
            </div>
            { menuLinks.map((item) => {
              return (
              <>
                <li className="w-full"><Link className={`${item.path === location.pathname ? 'active' : 'inactive'}`} to={item.path}><span className={`${item.icon} mr-2`}></span>{item.name}</Link></li>
              </>
              )
            }) }
          </ul>
        </div>
      </div>
    </>
  );
})

export default RootLayout
