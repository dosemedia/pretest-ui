import { client } from '../graphql'
import { graphql } from '../gql'
import { makeAutoObservable } from 'mobx';
import { Landing_Pages_Set_Input, Projects as Project } from '../gql/graphql';
import { Landing_Pages as LandingPage } from '../gql/graphql';

export class ProjectLandingPages {
  
  constructor() {
    makeAutoObservable(this)
  }
  
  async createLandingPageFromTemplate({ project, templateName } : { project: Project, templateName : string }): Promise<LandingPage> {
    const result = await client.mutation(graphql(`
    mutation CreateLandingPage($projectId: uuid!, $templateName: String!) {
      insert_landing_pages(objects: {project_id: $projectId, template_name: $templateName}) {
        returning {
          id
          created_at
          data
          project_id
          template_name
          updated_at
        }
      }
    }
    `), { projectId: project.id, templateName })
    if (result.error) {
      throw result.error
    }
    if (result.data?.insert_landing_pages?.returning) {
      return result.data?.insert_landing_pages.returning[0] as LandingPage
    }
    throw new Error('Failed to create landing page')
  }

  async fetchLandingPagesByProject({ project }: { project: Project }): Promise<Array<LandingPage>> {
    const result = await client.query(graphql(`
      query FetchLandingPageByProjectID($projectId: uuid!) {
        landing_pages(where: {project_id: {_eq: $projectId}}) {
          project_id
          template_name
          updated_at
          id
          data
          created_at
        }
      }
    `), { projectId: project.id })
    if (result.error) {
      throw result.error
    }
    return result.data?.landing_pages as LandingPage[]
  }

  async fetchLandingPageWithTemplate(landingPageId: string) : Promise<LandingPage> {
    const result = await client.query(graphql(`
    query FetchLandingPageWithTemplate($landingPageId: uuid!) {
      landing_pages_by_pk(id: $landingPageId) {
        created_at
        data
        id
        project_id
        template_name
        updated_at
      }
    }
    `), { landingPageId })
    if (result.error) {
      throw result.error
    }
    return result.data?.landing_pages_by_pk as LandingPage
  }

  async updateLandingPage(landingPageId: string, data: Landing_Pages_Set_Input) : Promise<void> {
    const result = await client.mutation(graphql(`
    mutation UpdateLandingPage($landingPageId: uuid!, $data: landing_pages_set_input!) {
      update_landing_pages_by_pk(pk_columns: {id: $landingPageId}, _set: $data) {
        id
        data
      }
    }
    `), { landingPageId, data })
    if (result.error) {
      throw result.error
    }
  }

  async deleteLandingPage(landingPageId: string) : Promise<void> {
    const result = await client.mutation(graphql(`
    mutation DeleteLandingPage($landingPageId: uuid!) {
      delete_landing_pages_by_pk(id: $landingPageId) {
        id
      }
    }
    `), { landingPageId })
    if (result.error) {
      throw result.error
    }
  }
}