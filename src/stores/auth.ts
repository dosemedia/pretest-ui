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
  }`)

const registerMutation = graphql(`
  mutation register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      token
      id
    }
  }`)

const sendPasswordResetEmailMutation = graphql(`
  mutation SendPasswordResetEmail($email: String!) {
    sendPasswordResetEmail(email: $email)
  }`)

const verifyEmailMutation = graphql(`
  mutation VerifyEmail($code: String!) {
    verifyEmail(code: $code)
  }`)

const resetPasswordMutation = graphql(`
  mutation ResetPassword($code: String!, $email: String!, $newPassword: String!) {
    resetPassword(code: $code, email: $email, newPassword: $newPassword)
  }`)

export class Auth {
  token = localStorage.getItem('auth.token') || ''
  id = localStorage.getItem('auth.id') || ''
  loginWait = false
  loginError = ''
  registerWait = false
  registerError = ''
  sendPasswordResetEmailWait = false
  sendPasswordResetEmailError = ''
  verifyEmailWait = false
  verifyEmailError = ''
  resetPasswordWait = false
  resetPasswordError = ''

  constructor() {
    makeAutoObservable(this)
    observe(this, 'token', () => {
      localStorage.setItem('auth.token', this.token)
    })
    observe(this, 'id', () => {
      localStorage.setItem('auth.id', this.id)
    })
  }

  resetRegister () {
    this.registerWait = false
    this.registerError = ''
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

  resetLogin () {
    this.loginWait = false
    this.loginError = ''
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

  resetSendPasswordResetEmail () {
    this.sendPasswordResetEmailWait = false
    this.sendPasswordResetEmailError = ''
  }

  async sendPasswordResetEmail (email: string) {
    runInAction(() => {
      this.sendPasswordResetEmailWait = true
      this.sendPasswordResetEmailError = ''
    })
    try {
      const result = await client.mutation(sendPasswordResetEmailMutation, { email })
      if (result.error) {
        throw result.error
      }
    } catch (error) {
      runInAction(() => {
        if (error instanceof Error) {
          this.sendPasswordResetEmailError = error.message
        } else {
          this.sendPasswordResetEmailError = error + ''
        }
      })
    } finally {
      runInAction(() => {
        this.sendPasswordResetEmailWait = false
      })
    }
  }

  resetVerifyEmail () {
    this.verifyEmailWait = false
    this.verifyEmailError = ''
  }

  async verifyEmail (code: string) {
    runInAction(() => {
      this.verifyEmailWait = true
      this.verifyEmailError = ''
    })
    try {
      if (!code) {
        throw new Error('Invalid code')
      }
      const result = await client.mutation(verifyEmailMutation, { code })
      console.log(result)
      if (result.error) {
        throw result.error
      }
    } catch (error) {
      runInAction(() => {
        if (error instanceof Error) {
          this.verifyEmailError = error.message
        } else {
          this.verifyEmailError = error + ''
        }
      })
    } finally {
      runInAction(() => {
        this.verifyEmailWait = false
      })
    }
  }

  resetResetPassword () {
    this.resetPasswordWait = false
    this.resetPasswordError = ''
  }

  async resetPassword (code: string, email: string, newPassword: string) {
    runInAction(() => {
      this.resetPasswordWait = true
      this.resetPasswordError = ''
    })
    try {
      if (!code) {
        throw new Error('Invalid code')
      }
      const result = await client.mutation(resetPasswordMutation, { code, email, newPassword })
      console.log(result)
      if (result.error) {
        throw result.error
      }
    } catch (error) {
      runInAction(() => {
        if (error instanceof Error) {
          this.resetPasswordError = error.message
        } else {
          this.resetPasswordError = error + ''
        }
      })
    } finally {
      runInAction(() => {
        this.resetPasswordWait = false
      })
    }
  }

  get isAuthenticated() {
    return !!this.token
  }
}
