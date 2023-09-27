import { makeAutoObservable, observe, runInAction } from 'mobx'
import { gql } from 'urql'
import { client } from '../graphql'

const loginQuery = gql`
  mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    token
  }
}
`

export class Auth {
  token = localStorage.getItem('auth.token') || ''
  id = localStorage.getItem('auth.id') || ''
  loginWait = false
  loginError = ''

  constructor() {
    makeAutoObservable(this)
    observe(this, 'token', () => {
      localStorage.setItem('auth.token', this.token)
    })
    observe(this, 'id', () => {
      localStorage.setItem('auth.id', this.id)
    })
  }

  async login (email: string, password: string) {
    runInAction(() => {
      this.loginWait = true
      this.loginError = ''
    })
    try {
      console.log({ email, password })
      const result = await client.mutation(loginQuery, { email, password })
      if (result.error) {
        throw result.error
      }
      runInAction(() => {
        this.token = result.data.login.token
        this.id = result.data.login.id
      })
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
