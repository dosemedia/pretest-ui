import { makeAutoObservable, observe, runInAction } from 'mobx'

export class Auth {
  token = localStorage.getItem('authToken') || ''
  loginWait = false
  loginError = ''

  constructor() {
    makeAutoObservable(this)
    observe(this, 'token', () => {
      // watch the token and save it to localStorage
      localStorage.setItem('authToken', this.token)
    })
  }

  async login (email: string, password: string) {
    runInAction(() => {
      this.loginWait = true
      this.loginError = ''
    })
    try {
      if (email || password) {
        throw new Error('Not implemented')
      }
      await new Promise(resolve => setTimeout(resolve, 1000))
      // In Async functions, use runInAction to update state to prevent strict mode warnings from MobX
      runInAction(() => {
        this.token = 'foobar'
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
  }

  get isAuthenticated() {
    return !!this.token
  }
}
