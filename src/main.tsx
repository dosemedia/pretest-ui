import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { authStore, AuthContext } from './stores/stores'
import { Provider as URQLProvider } from 'urql'
import { client as urqlClient } from './graphql'

import RootLayout from './layouts/RootLayout.tsx'
import ErrorPage from './ErrorPage.tsx'
import HomePage from './pages/HomePage.tsx'
import LoginExcludedRoute from './components/auth/LoginExcludedRoute.tsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import './css/index.css'
import { Toasts } from './components/lib/Toast.tsx'
import LoginRequiredRoute from './components/auth/LoginRequiredRoute.tsx'
import RegisterPage from './pages/auth/RegisterPage.tsx'
import ProfilePage from './pages/auth/ProfilePage.tsx'
import DraftsPage from './pages/DraftsPage.tsx'
import VerifyEmailLandingPage from './pages/auth/VerifyEmailLandingPage.tsx'
import ResetPasswordPage from './pages/auth/ResetPasswordPage.tsx'
import ProjectDetail from './pages/projects/ProjectDetail.tsx'
import FacebookCreativeDetail from './pages/projects/ProjectFacebookCreativeTemplateDetail.tsx'
import TeamsPage from './pages/teams/TeamsPage.tsx'
import TeamMembers from './pages/teams/TeamMembers.tsx'
import JoinTeamPage from './pages/teams/JoinTeamPage.tsx'
import ContactPage from './pages/ContactPage.tsx'
import LoginPage from './pages/auth/LoginPage.tsx'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route path="/" element={<RootLayout><HomePage /></RootLayout>} />
      <Route path="auth/register" element={<LoginExcludedRoute><RegisterPage /></LoginExcludedRoute>} />
      <Route path="auth/login" element={<LoginExcludedRoute><LoginPage /></LoginExcludedRoute>} />
      <Route path="auth/forgot" element={<LoginExcludedRoute><ForgotPasswordPage /></LoginExcludedRoute>} />
      <Route path="me/profile" element={<LoginRequiredRoute><RootLayout><ProfilePage /></RootLayout></LoginRequiredRoute>} />
      <Route path="drafts" element={<LoginRequiredRoute><RootLayout><DraftsPage /></RootLayout></LoginRequiredRoute>} />
      <Route path="verify-email/:code" element={<VerifyEmailLandingPage />} />
      <Route path="reset-password/:code" element={<ResetPasswordPage />} />
      <Route path="project/:projectId" element={<LoginRequiredRoute><RootLayout><ProjectDetail /></RootLayout></LoginRequiredRoute>} />
      <Route path="project/:projectId/facebook_creative/:facebookCreativeId" element={<LoginRequiredRoute><RootLayout><FacebookCreativeDetail /></RootLayout></LoginRequiredRoute>} />
      <Route path="teams" element={<LoginRequiredRoute><RootLayout><TeamsPage /></RootLayout></LoginRequiredRoute>} />
      <Route path="team/:teamId" element={<LoginRequiredRoute><RootLayout><TeamMembers /></RootLayout></LoginRequiredRoute>} />
      <Route path="team/:teamId/join" element={<LoginRequiredRoute><RootLayout><JoinTeamPage /></RootLayout></LoginRequiredRoute>} />
      <Route path="contact" element={<RootLayout><ContactPage /></RootLayout>} />
    </Route>
  ),
)

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
