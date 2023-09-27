import {createContext} from 'react'
import { Auth } from './auth.ts'

export const authStore = new Auth()
export const AuthContext = createContext<Auth>(authStore)
