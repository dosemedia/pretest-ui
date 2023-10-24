import { makeAutoObservable } from 'mobx'
import { client } from '../graphql'
import { graphql } from '../gql'
import { Teams as Team } from "../gql/graphql";
export class Teams {
  activeTeam: Team | null = null 
  constructor() {
    makeAutoObservable(this)
  }

  async fetchTeams (): Promise<Team[]> {
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
      }
      return result.data?.teams as Team[]
  }
}
