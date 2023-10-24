import {createContext} from 'react'
import { Auth } from './auth'
import { Contact } from './contact'
import { Toasts } from './toast'
import { Teams } from './teams'
import { Projects } from './projects'

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

