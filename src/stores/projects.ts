import { makeAutoObservable } from 'mobx'
import { client } from '../graphql'
import { graphql } from '../gql'
import { Projects as Project } from "../gql/graphql";
export class Projects {
  projects: Project[] = []
  constructor() {
    makeAutoObservable(this)
  }
  async createProject({ name, team_id }: { team_id: string, name: string }): Promise<Project | undefined> {
    if (!name) {
      throw new Error('Name is required')
    }
    const result = await client.mutation(graphql(`
    mutation CreateProject($name: String!, $team_id: uuid!) {
      createProject(team_id: $team_id, name: $name) {
        id
        name
        team_id
      }
    }
    `), { team_id, name })
    if (result.error) {
      throw result.error
    }
    return result.data?.createProject as Project | undefined
  }
  async delete({ id }: { id: string }): Promise<boolean> {
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
  async updateProject({ projectId, payload }: { projectId: string, payload: object }): Promise<Project | undefined> {
    const project: Project = payload as Project
    const result = await client.mutation(graphql(`
      mutation UpdateProject($projectId: uuid!, $name: String, $objective: String, $branding: String, $platform: String) {
        update_projects_by_pk(pk_columns: {id: $projectId}, _set: {name: $name, objective: $objective, branding: $branding, platform: $platform}) {
          name
          objective
          branding
          platform
          is_draft
          updated_at
          start_time
          stop_time
        }
      }
      `), { projectId, name: project.name, objective: project.objective, branding: project.branding, platform: project.platform })
    if (result.error) {
      throw result.error
    }
    return result.data?.update_projects_by_pk as Project
  }
  async fetchProject({ projectId }: { projectId: string }): Promise<Project | undefined> {
    const result = await client.query(graphql(`
      query FetchProject($projectId: uuid!) {
        projects_by_pk(id: $projectId) {
          id
          name
          objective
          branding
          platform
          is_draft
          created_at
          updated_at
          start_time
          stop_time
        }
      }
      `), { projectId })
    if (result.error) {
      throw result.error
    }
    return result.data?.projects_by_pk as Project
  }
  async fetchProjects({ teamId }: { teamId: string }): Promise<Project[] | undefined> {
    const result = await client.query(graphql(`
    query fetchProjects($teamId: uuid!) {
      projects(where: {teams_projects: {team_id: {_eq: $teamId}}}, order_by: {created_at: desc}) {
        name
        id
        created_at
      }
    }
    `), { teamId })
    if (result.error) {
      throw result.error
    }
    return result.data?.projects as Project[]
  }
}
