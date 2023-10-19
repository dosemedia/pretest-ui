import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import { authStore, AuthContext } from './stores/stores'
import { Provider as URQLProvider } from 'urql'
import { client as urqlClient } from './graphql'

import RootLayout from './layouts/RootLayout.tsx'
import ErrorPage from './ErrorPage.tsx'
import HomePage from './pages/HomePage.tsx'
import LoginExcludedRoute from './components/LoginExcludedRoute'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import './index.css'
import { Toasts } from './components/lib/Toast.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <><RootLayout><HomePage /></RootLayout></> },
      {
        path: "/auth/register",
        async lazy() {
          const RegisterPage = await import('./pages/RegisterPage.tsx')
          return {
            Component: () => {
              return (
                <LoginExcludedRoute>
                  <RegisterPage.default />
                </LoginExcludedRoute>
              );
            },
          }
        }
      },
      {
        path: "/auth/login",
        async lazy() {
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
      {
        path: "/auth/forgot",
        async lazy() {
          const ForgotPasswordPage = await import('./pages/ForgotPasswordPage.tsx')
          return {
            Component: () => {
              return (
                <LoginExcludedRoute>
                  <ForgotPasswordPage.default />
                </LoginExcludedRoute>
              );
            },
          }
        }
      },
      {
        path: "/me/profile",
        async lazy() {
          const ProfilePage = await import('./pages/ProfilePage.tsx')
          return {
            Component: () => {
              return (
                <>
                  <RootLayout>
                    <ProfilePage.default />
                  </RootLayout>
                </>
              );
            },
          }
        }
      },
      {
        path: "/drafts",
        async lazy() {
          const DraftsPage = await import('./pages/DraftsPage.tsx')
          return {
            Component: () => {
              return (
                <>
                  <RootLayout>
                    <DraftsPage.default />
                  </RootLayout>
                </>
              );
            },
          }
        }
      },
      {
        path: "/verify-email/:code",
        async lazy() {
          const VerifyEmailLandingPage = await import('./pages/VerifyEmailLandingPage.tsx')
          return {
            Component: VerifyEmailLandingPage.default
          }
        }
      },
      {
        path: "/reset-password/:code",
        async lazy() {
          const ResetPasswordPage = await import('./pages/ResetPasswordPage.tsx')
          return {
            Component: ResetPasswordPage.default
          }
        }
      },
      {
        path: "/contact",
        async lazy() {
          const ContactPage = await import('./pages/ContactPage.tsx')
          return {
            Component: () => {
              return (
                <>
                  <RootLayout><ContactPage.default /></RootLayout>
                </>
              )
            }
          }
        }
      },
    ]
  },
]);

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <URQLProvider value={urqlClient}>
        <AuthContext.Provider value={authStore}>
          <Toasts />
          <RouterProvider router={router} />
        </AuthContext.Provider>
      </URQLProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
