import { client } from '../graphql'
import { graphql } from '../gql'
import { makeAutoObservable } from 'mobx';
import { Projects as Project } from '../gql/graphql';
import { Landing_Page_Templates as LandingPageTemplate } from "../gql/graphql";
import { Landing_Pages as LandingPage } from '../gql/graphql';

export interface LandingPageWithTemplate extends LandingPage {
  landing_page_template: LandingPageTemplate; 
}

export class ProjectLandingPages {
  
  constructor() {
    makeAutoObservable(this)
  }
  
  async createLandingPageFromTemplate({ project, template } : { project: Project, template : LandingPageTemplate }): Promise<LandingPage> {
    const result = await client.mutation(graphql(`
    mutation CreateLandingPage($projectId: uuid!, $templateId: uuid!) {
      insert_landing_pages(objects: {project_id: $projectId, template_id: $templateId}) {
        returning {
          id
          created_at
          data
          project_id
          template_id
          updated_at
        }
      }
    }
    `), { projectId: project.id, templateId: template.id })
    if (result.error) {
      throw result.error
    }
    if (result.data?.insert_landing_pages?.returning) {
      return result.data?.insert_landing_pages.returning[0] as LandingPage
    }
    throw new Error('Failed to create landing page')
  }

  async fetchLandingPagesByProject({ project }: { project: Project }): Promise<Array<LandingPageWithTemplate>> {
    const result = await client.query(graphql(`
      query FetchLandingPageByProjectID($projectId: uuid!) {
        landing_pages(where: {project_id: {_eq: $projectId}}) {
          project_id
          template_id
          updated_at
          id
          data
          created_at
          landing_page_template {
            created_at
            component
            description
            id
            json_schema
            name
            ui_schema
            updated_at
          }
        }
      }
    `), { projectId: project.id })
    if (result.error) {
      throw result.error
    }
    return result.data?.landing_pages as LandingPageWithTemplate[]
  }

  async fetchLandingPageWithTemplate(landingPageId: string) : Promise<LandingPage> {
    const result = await client.query(graphql(`
    query FetchLandingPageWithTemplate($landingPageId: uuid!) {
      landing_pages_by_pk(id: $landingPageId) {
        created_at
        data
        id
        project_id
        template_id
        updated_at
        landing_page_template {
          created_at
          component
          description
          id
          json_schema
          name
          ui_schema
          updated_at
        }
      }
    }
    `), { landingPageId })
    if (result.error) {
      throw result.error
    }
    return result.data?.landing_pages_by_pk as LandingPageWithTemplate
  }

  async updateLandingPage(landingPageId: string, data: object) : Promise<void> {
    const result = await client.mutation(graphql(`
    mutation UpdateLandingPage($landingPageId: uuid!, $data: jsonb!) {
      update_landing_pages_by_pk(pk_columns: {id: $landingPageId}, _set: {data: $data}) {
        id
        data
      }
    }
    `), { landingPageId, data })
    if (result.error) {
      throw result.error
    }
  }
}