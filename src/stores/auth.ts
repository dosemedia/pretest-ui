import { makeAutoObservable, observe, runInAction } from 'mobx'
import { graphql } from '../gql'
import { client } from '../graphql'
import _ from 'lodash'

const loginMutation = graphql(`
  mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    id
  }
}
`)

const registerMutation = graphql(`
  mutation register($email: String!, $password: String!) {
  register(email: $email, password: $password) {
    token
    id
  }
}
`)

export class Auth {
  token = localStorage.getItem('auth.token') || ''
  id = localStorage.getItem('auth.id') || ''
  loginWait = false
  loginError = ''
  registerWait = false
  registerError = ''

  constructor() {
    makeAutoObservable(this)
    observe(this, 'token', () => {
      localStorage.setItem('auth.token', this.token)
    })
    observe(this, 'id', () => {
      localStorage.setItem('auth.id', this.id)
    })
  }

  async register (email: string, password: string) {
    runInAction(() => {
      this.registerWait = true
      this.registerError = ''
    })
    try {
      const result = await client.mutation(registerMutation, { email, password })
      if (result.error) {
        throw result.error
      }
      if (_.has(result, 'data.register.token') && _.has(result, 'data.register.id')) {
        runInAction(() => {
          this.token = result.data?.register?.token || ''
          this.id = result.data?.register?.id || ''
        })
      } else {
        throw new Error('Invalid response from server - missing token')
      }
    } catch (error) {
      runInAction(() => {
        if (error instanceof Error) {
          this.registerError = error.message
        } else {
          this.registerError = error + ''
        }
      })
    } finally {
      runInAction(() => {
        this.registerWait = false
      })
    }
  }

  async login (email: string, password: string) {
    runInAction(() => {
      this.loginWait = true
      this.loginError = ''
    })
    try {
      const result = await client.mutation(loginMutation, { email, password })
      if (result.error) {
        throw result.error
      }
      if (_.has(result, 'data.login.token') && _.has(result, 'data.login.id')) {
        runInAction(() => {
          this.token = result.data?.login?.token || ''
          this.id = result.data?.login?.id || ''
        })
      } else {
        throw new Error('Invalid response from server - missing token')
      }
    } catch (error) {
      runInAction(() => {
        if (error instanceof Error) {
          this.loginError = error.message
        } else {
          this.loginError = error + ''
        }
      })
    } finally {
      runInAction(() => {
        this.loginWait = false
      })
    }
  }

  logout () {
    this.token = ''
    this.id = ''
  }

  get isAuthenticated() {
    return !!this.token
  }
}
