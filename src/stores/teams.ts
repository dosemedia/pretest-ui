import { makeAutoObservable, observe } from 'mobx'
import { client } from '../graphql'
import { graphql } from '../gql'
export class Auth {
  activeTeam = localStorage.getItem('activeTeam') || null
  teams = []
  constructor() {
    makeAutoObservable(this)
    observe(this, 'activeTeam', () => {
      console.log(this.activeTeam)
    })
  }

  // async fetchTeams (): Promise<void> {
  //   const result = await client.mutation(graphql(`
  //     query fetchTeams($password: String!) {
  //       destroyUser(password: $password)
  //     }
  //     `), { password })
  //     if (result.error) {
  //       throw result.error
  //     } else {
  //       this.logout()
  //     }
  // }
}
