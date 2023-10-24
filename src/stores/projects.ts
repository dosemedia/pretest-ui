import { makeAutoObservable } from 'mobx'
import { client } from '../graphql'
import { graphql } from '../gql'
import { Projects as Project } from "../gql/graphql";
export class Projects {
  projects: Project[] = []
  constructor() {
    makeAutoObservable(this)
  }
  async delete ({ id }: { id: string }): Promise<boolean>{
    const result = await client.mutation(graphql(`
    mutation DeleteProject($id: uuid!) {
      delete_projects_by_pk(id: $id) {
        id
      }
    }
    `), { id })
    if (result.error) {
      throw result.error
    }
    return true
  }
  async fetchProjects ({ teamId }: { teamId: string }): Promise<Project[] | undefined> {
  const result = await client.query(graphql(`
    query fetchProjects($teamId: uuid!) {
      projects(where: {teams_projects: {team_id: {_eq: $teamId}}}) {
        name
        id
        created_at
      }
    }
    `), { teamId })
    console.log(result)
    if (result.error) {
      throw result.error
    }
    return result.data?.projects as Project[]
  }
}
