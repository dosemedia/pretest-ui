import { makeAutoObservable } from 'mobx'
import { client } from '../graphql'
import { graphql } from '../gql'
import { Projects as Project, Projects_Set_Input } from "../gql/graphql";
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
  async updateProject({ id, payload }: { 
    id: string, payload: Project }): Promise<Project | undefined> {
    const result = await client.mutation(graphql(`
      mutation UpdateProject($id: uuid!, $updates: projects_set_input) {
        update_projects_by_pk(pk_columns: {id: $id}, _set: $updates) {
          name
          objective
          branding
          platform
          project_type
          is_draft
          updated_at
          start_time
          stop_time
        }
      }
      `), { id, updates: payload as Projects_Set_Input })
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
          project_type
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
  async fetchFullProject({ projectId }: { projectId: string }): Promise<Project | undefined> {
    const result = await client.query(graphql(`
      query FetchFullProject($projectId: uuid!) {
        projects_by_pk(id: $projectId) {
          id
          name
          objective
          branding
          platform
          project_type
          is_draft
          created_at
          updated_at
          start_time
          stop_time
          facebook_audiences {
            device_platforms
            facebook_positions
            genders
            geo_locations
            id
            interests
            max_age
            min_age
            name
            publisher_platforms
          }
          themes {
            name
            id
            angles {
              name
              id
            }
          }
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
        is_draft
        project_type
        start_time
        stop_time
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
