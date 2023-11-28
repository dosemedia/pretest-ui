import {createContext} from 'react'
import { Auth } from './auth'
import { Contact } from './contact'
import { Toasts } from './toast'
import { Teams } from './teams'
import { Projects } from './projects'
import { Facebook } from './facebook'
import { ProjectFacebookAudience } from './project_facebook_audience'
import { Themes } from './themes'
import { ThemesAngles } from './angles'
import { FacebookCreativeTemplates } from './facebook_creative_templates'
import { ProjectFacebookCreatives } from './project_facebook_creatives'
import { ProjectFacebookCreativeTemplates } from './project_facebook_creative_templates'

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

export const themes = new Themes()
export const ThemesContext = createContext<Themes>(themes)

export const themesAngles = new ThemesAngles()
export const ThemesAnglesContext = createContext<ThemesAngles>(themesAngles)

export const facebookCreativeTemplates = new FacebookCreativeTemplates()
export const FacebookCreativeTemplatesContext = createContext<FacebookCreativeTemplates>(facebookCreativeTemplates)

export const projectFacebookCreatives = new ProjectFacebookCreatives()
export const ProjectFacebookCreativesContext = createContext<ProjectFacebookCreatives>(projectFacebookCreatives)

export const projectFacebookCreativeTemplates = new ProjectFacebookCreativeTemplates()
export const ProjectFacebookCreativeTemplatesContext = createContext<ProjectFacebookCreativeTemplates>(projectFacebookCreativeTemplates)
