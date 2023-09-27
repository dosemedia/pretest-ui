import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import { PrimeReactProvider } from 'primereact/api'
import { Navigate } from "react-router-dom"
import { authStore, AuthContext } from './stores/stores'
import { Provider as URQLProvider } from 'urql'
import { client as urqlClient } from './graphql'

import RootLayout from './layouts/RootLayout.tsx'
import ErrorPage from './ErrorPage.tsx'
import HomePage from './pages/HomePage.tsx'
import LoginExcludedRoute from './components/LoginExcludedRoute';

import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import 'primeicons/primeicons.css'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/auth/register",
        async lazy() {
          const RegisterPage = await import('./pages/RegisterPage.tsx')
          return {
            Component: RegisterPage.default,
          }
        }
      },
      {
        path: "/auth/login",
        async lazy() {
          // Protected route (could also return Navigate from LoginPage):
          const auth = authStore
          if (auth.isAuthenticated) {
            return {
              Component: () => {
              return <Navigate to="/" replace />
              }
            }
          }
          const LoginPage = await import('./pages/LoginPage.tsx')
          return {
            Component: () => {
              return (
                <LoginExcludedRoute>
                  <LoginPage.default />
                </LoginExcludedRoute>
              );
            },
          }
        }
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <URQLProvider value={urqlClient}>
        <AuthContext.Provider value={authStore}>
          <RouterProvider router={router} />
        </AuthContext.Provider>
      </URQLProvider>
    </PrimeReactProvider>
  </React.StrictMode>,
)
