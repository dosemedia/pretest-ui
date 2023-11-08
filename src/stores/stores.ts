import {createContext} from 'react'
import { Auth } from './auth'
import { Contact } from './contact'
import { Toasts } from './toast'
import { Teams } from './teams'
import { Projects } from './projects'
import { Facebook } from './facebook'
import { ProjectFacebookAudience } from './project_facebook_audience'

export const authStore = new Auth()
export const AuthContext = createContext<Auth>(authStore)

export const contactStore = new Contact()
export const ContactContext = createContext<Contact>(contactStore)

export const toastsStore = new Toasts()
export const ToastsContext = createContext<Toasts>(toastsStore)

export const teamsStore = new Teams()
export const TeamsContext = createContext<Teams>(teamsStore)

export const projectStore = new Projects()
export const ProjectsContext = createContext<Projects>(projectStore)

export const facebookStore = new Facebook()
export const FacebookContext = createContext<Facebook>(facebookStore)

export const projectFacebookAudienceStore = new ProjectFacebookAudience()
export const ProjectFacebookAudienceContext = createContext<ProjectFacebookAudience>(projectFacebookAudienceStore)

