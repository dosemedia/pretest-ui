import { makeAutoObservable, observe, runInAction } from 'mobx'
import { graphql } from '../gql'
import { client } from '../graphql'
import _ from 'lodash'

export class Auth {
  token = localStorage.getItem('auth.token') || ''
  id = localStorage.getItem('auth.id') || ''
  user = localStorage.getItem('auth.user') ? JSON.parse(localStorage.getItem('auth.user') as string) : null

  constructor() {
    makeAutoObservable(this)
    observe(this, 'token', () => {
      console.log(this.token)
      localStorage.setItem('auth.token', this.token)
    })
    observe(this, 'user', () => {
      localStorage.setItem('auth.user', JSON.stringify(this.user))

    })
    observe(this, 'id', async () => {
      localStorage.setItem('auth.id', this.id)
      if (this.id) {
        await this.getUser()
      }
    })
  }

  async changeEmail (newEmail: string, password: string) : Promise<void> {
    const result = await client.mutation(graphql(`
    mutation ChangeEmail($newEmail: String!, $password: String!) {
      changeEmail(newEmail: $newEmail, password: $password)
    }
    `), { newEmail, password })
    console.log(result)
    if (result.error) {
      throw result.error
    }
  }

  async updateDisplayName (display_name: string) : Promise<void> {
    const result = await client.mutation(graphql(`
    mutation UpdateUser($display_name: String!, $id: uuid!) {
      update_users_by_pk(pk_columns: {id: $id}, _set: {display_name: $display_name}) {
        display_name
      }
    }
    `), { id: this.id, display_name })
    if (result.error) {
      throw result.error
    } else if (result?.data?.update_users_by_pk) {
      this.user = result?.data?.update_users_by_pk
    }
  }

  async getUser() : Promise<void> {
    const result = await client.query(`
    query GetUser($id: uuid!) {
      users_by_pk(id: $id) {
        display_name
        email
      }
    }
    `, { id: this.id })
    if (result.error) {
      throw result.error
    } else if (result?.data?.users_by_pk) {
      this.user = result?.data?.users_by_pk
    }
  }

  async register (email: string, password: string) : Promise<void> {
    const result = await client.mutation(graphql(`
    mutation register($email: String!, $password: String!) {
      register(email: $email, password: $password) {
        token
        id
      }
    }`), { email, password })
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
  }

  async login (email: string, password: string) : Promise<void> {
    const result = await client.mutation(graphql(`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        id
      }
    }`), { email, password })
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
  }

  logout () {
    this.token = ''
    this.id = ''
    this.user = ''
  }

  async sendPasswordResetEmail (email: string) : Promise<void> {
    const result = await client.mutation(graphql(`
    mutation SendPasswordResetEmail($email: String!) {
      sendPasswordResetEmail(email: $email)
    }`), { email })
    if (result.error) {
      throw result.error
    }
  }

  async verifyEmail (code: string) : Promise<void> {
    if (!code) {
      throw new Error('Invalid code')
    }
    const result = await client.mutation(graphql(`
    mutation VerifyEmail($code: String!) {
      verifyEmail(code: $code)
    }`), { code })
    if (result.error) {
      throw result.error
    }
  }

  async resetPassword (code: string, email: string, newPassword: string) : Promise<void> {
    if (!code) {
      throw new Error('Invalid code')
    }
    const result = await client.mutation(graphql(`
    mutation ResetPassword($code: String!, $email: String!, $newPassword: String!) {
      resetPassword(code: $code, email: $email, newPassword: $newPassword)
    }`), { code, email, newPassword })
    if (result.error) {
      throw result.error
    }
  }

  get isAuthenticated() {
    return !!this.token
  }
}
