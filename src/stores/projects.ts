import { makeAutoObservable } from 'mobx'
import { client } from '../graphql'
import { graphql } from '../gql'
import { Projects as Project, Projects_Set_Input } from "../gql/graphql";
export enum ProjectStatus {
  DRAFT = 'draft',
  REVIEW = 'review',
  ACTIVE = 'active',
  COMPLETE = 'complete',
  SUBMITTED = 'submitted'
}
export interface TestTypeMenu {
  label: string,
  icon: string,
  value: string,
  description: string,
  items: string[]
}
export const testTypeMenu: TestTypeMenu[] = [
  {
    label: 'Upstream Consumer Behavior',
    value: 'upstream_consumer_behavior',
    icon: '/src/assets/magnifying_glass.svg',
    description: 'Exploratory, Whitespace,\nProblems, Solutions, Innovations',
    items: [
      'What product should I create?',
      'What motivates my consumer',
      'What problems exist for my brand?',
      'What is trending in the market?'
    ]
  },
  {
    label: 'Concept & Product Development',
    value: 'concept_test',
    icon: '/src/assets/egg.png',
    description: 'Ideas, Validations',
    items: [
      'Which product idea is best?',
      'What concept resonates with my consumer?'
    ]
  },
  {
    label: 'Feature & Benefits',
    value: 'benefits_claims',
    icon: '/src/assets/lightbulb.png',
    description: 'Positioning, Features, Benefits, Claims',
    items: [
      'Which product/service features and benefits resonate most?',
      'Which claim is most compelling to my audience?'
    ]
  },
  {
    label: 'Marketing Communication',
    value: 'marketing_communication',
    icon: '/src/assets/horseshoe.png',
    description: 'Exploratory, Whitespace,\nProblems, Solutions, Innovations',
    items: [
      'How do I talk about and show my product or service?',
      'What is the best way to bring to life and talk about my product/ service?'
    ]
  }
]
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
          status
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
          status
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
          status
          created_at
          updated_at
          start_time
          stop_time
          name_approved
          objective_approved
          project_type_approved
          brandness_approved
          platform_approved
          start_stop_time_approved
          teams_projects {
            team {
              name
            }
          }
          landing_pages {
            id
            template_name
            data
            approved
          }
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
            approved
            publisher_platforms
          }
          project_facebook_creative_templates {
            id
            data
            project_id
            template_name
          }
          themes {
            name
            id
            approved
            angles {
              name
              id
              facebook_creatives {
                id
                data
                template_name
                social_copy
                cta_text
                cta_type
              }
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
        status
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

  async sendReviewCompleteSlackMessage({ projectId, returnUrl }: { projectId: string, returnUrl: string }): Promise<boolean>{
    const result = await client.mutation(graphql(`
      mutation SendReviewCompleteSlackMessage($projectId: uuid!, $returnUrl: String!) {
        sendSlackAlertForTeamReview(projectId: $projectId, returnUrl: $returnUrl)
      }
    `), { projectId, returnUrl })
    if (result.error) {
      throw result.error
    }
    return true
  }

  lockFields ({ project }: { project: Project} ): boolean {
    return project.status != ProjectStatus.DRAFT
  }

  async submitForBuild({ projectId, returnUrl }: { projectId: string, returnUrl: string }): Promise<boolean>{
    const result = await client.mutation(graphql(`
      mutation SubmitProjectBuild($projectId: uuid!, $returnUrl: String!) {
        submitBuild(projectId: $projectId, returnUrl: $returnUrl)
      }
    `), { projectId, returnUrl })
    if (result.error) {
      throw result.error
    }
    return true
  }
}
