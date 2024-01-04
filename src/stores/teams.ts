import { makeAutoObservable, observe } from 'mobx'
import { client } from '../graphql'
import { graphql } from '../gql'
import { Teams as Team } from "../gql/graphql";
import { authStore } from './stores';
export class Teams {
  activeTeam: Team | null = null
  ownsTeam: boolean = false
  constructor() {
    makeAutoObservable(this)
    observe(authStore, 'token', () => {
      if (!authStore.token) {
        this.setActiveTeam(null)
      }
    })
  }

  setActiveTeam (team: Team | null) {
    this.activeTeam = team
  }

  setOwnsTeam (ownsTeam: boolean) {
    this.ownsTeam = ownsTeam
  }

  isOwner (team: Team) : boolean {
    for (const member of team.teams_users) {
      if (member.role === 'admin' && member.user_id === authStore.id) {
        return true
      }
    }
    return false
  }

  checkIfOwnsTeam (teams: Team[]) {
    for (const team of teams) {
      for (const member of team.teams_users) { 
        if (member.role === 'admin' && member.user_id === authStore.id) {
          this.setOwnsTeam(true)
          break
        }
      }
    }
  }

  async inviteUser ({ teamId, email }: { teamId: string, email: string }): Promise<boolean> {
    const result = await client.mutation(graphql(`
      mutation inviteUser($email: String!, $teamId: uuid!) {
        insert_invitations_one(object: { email: $email, team_id: $teamId }) {
          created_at
        }
      }
      `), { email, teamId })
    if (result.error) {
      throw result.error
    }
    return true
  }

  async createTeam (name: string): Promise<void> {
    const result = await client.mutation(graphql(`
      mutation createTeam($name: String!) {
        createTeam(name: $name)
      }
      `), { name })
    if (result.error) {
      throw result.error
    }
  }

  async fetchTeams (): Promise<Team[]> {
    const result = await client.query(graphql(`
      query fetchTeams {
        teams {
          name
          id
          created_at
          teams_users_aggregate {
            aggregate {
              count
            }
          }
          teams_users {
            user_id
            role
          }
        }
      }
      `), {})
    if (result.error) {
      throw result.error
    }
    if (result.data?.teams && result.data.teams.length > 0) {
      this.setActiveTeam(result.data.teams[0] as Team)
      this.checkIfOwnsTeam(result.data.teams as Team[])
    } else if (result.data?.teams.length === 0) {
      this.setActiveTeam(null)
    }
    return result.data?.teams as Team[]
  }

  async fetchTeam (teamId: string): Promise<Team | null> {
    const result = await client.query(graphql(`
      query fetchTeam($teamId: uuid!) {
        teams_by_pk(id: $teamId) {
          id
          name
          created_at
          teams_users {
            user_id
            created_at
            user {
              email
              created_at
            }
          }
        }
      }
      `), { teamId })
    if (!result.data?.teams_by_pk) {
      throw new Error('You do not have access to this team')
    }
    if (result.error) {
      throw result.error
    }
    if (result.data?.teams_by_pk) {
      return result.data.teams_by_pk as Team
    }
    return null
  }

  async checkMembership (teamId: string, userId: string): Promise<boolean> {
    const result = await client.query(graphql(`
    query checkMembership($teamId: uuid!, $userId: uuid!) {
      teams_users(where: {_and: {team_id: {_eq: $teamId}, user_id: {_eq: $userId}}}) {
        team_id
      }
    }`), { teamId, userId })
    if (result.error) {
      throw result.error
    }
    if (result.data?.teams_users) {
      return result.data.teams_users.length > 0
    }
    return false
  }

  async leaveTeam (teamId: string): Promise<boolean> {
    const result = await client.mutation(graphql(`
      mutation leaveTeam($teamId: uuid!) {
        leaveTeam(teamId: $teamId)
      }
      `), { teamId })
    if (result.error) {
      throw result.error
    }
    return result.data?.leaveTeam || false
  }

  async joinTeam (teamId: string): Promise<boolean> {
    const result = await client.mutation(graphql(`
      mutation joinTeam($teamId: uuid!) {
        joinTeam(teamId: $teamId)
      }
      `), { teamId })
    if (result.error) {
      throw result.error
    }
    if (result.data?.joinTeam) {
      const team = await this.fetchTeam(teamId)
      if (team) {
        this.setActiveTeam(team as Team)
      }
      return result.data?.joinTeam
    }
    return false
  }
}
