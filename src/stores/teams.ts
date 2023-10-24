import { makeAutoObservable, observe } from 'mobx'
import { client } from '../graphql'
import { graphql } from '../gql'
import { Teams as Team } from "../gql/graphql";
import { authStore } from './stores';
export class Teams {
  activeTeam: Team | null = null
  teams: Team[] = []
  constructor() {
    makeAutoObservable(this)
    observe(authStore, 'token', () => {
      if (!authStore.token) {
        this.onLogout()
      } else {
        this.onLogin()
      }
    })
  }

  onLogin () {
    this.fetchTeams()
  }

  onLogout () {
    this.teams = []
    this.activeTeam = null
  }
  setTeams (data: Team[]) {
    this.teams = data
    if (this.teams.length > 0) {
      this.activeTeam = this.teams[0]
    }
  }

  async fetchTeams (): Promise<void> {
    const result = await client.query(graphql(`
      query fetchTeams {
        teams {
          name
          id
          created_at
        }
      }
      `), {})
      if (result.error) {
        throw result.error
      } else if (result?.data?.teams) {
        this.setTeams(result.data.teams as Team[])
      }
  }
}
