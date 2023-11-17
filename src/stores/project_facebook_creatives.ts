import { client } from '../graphql'
import { graphql } from '../gql'
import { makeAutoObservable } from 'mobx';
import { Projects as Project } from '../gql/graphql';
import { Facebook_Creative_Templates as FacebookCreativeTemplate } from "../gql/graphql";
import { Facebook_Creatives as FacebookCreative } from '../gql/graphql';

export interface FacebookCreativeWithTemplate extends FacebookCreative {
  facebook_creative_template: FacebookCreativeTemplate; 
}

export class ProjectFacebookCreatives {
  
  constructor() {
    makeAutoObservable(this)
  }
  
  async createFacebookCreativeFromTemplate({ project, template } : { project: Project, template : FacebookCreativeTemplate }): Promise<FacebookCreative> {
    const result = await client.mutation(graphql(`
    mutation CreateFacebookCreative($projectId: uuid!, $templateId: uuid!) {
      insert_facebook_creatives(objects: {project_id: $projectId, template_id: $templateId}) {
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
    if (result.data?.insert_facebook_creatives?.returning) {
      return result.data?.insert_facebook_creatives.returning[0] as FacebookCreative
    }
    throw new Error('Failed to create creative')
  }

  async fetchFacebookCreativesByProject({ project }: { project: Project }): Promise<Array<FacebookCreativeWithTemplate>> {
    const result = await client.query(graphql(`
      query FetchFacebookCreativesByProjectID($projectId: uuid!) {
        facebook_creatives(where: {project_id: {_eq: $projectId}}) {
          project_id
          template_id
          updated_at
          id
          data
          created_at
          facebook_creative_template {
            created_at
            creatomate_template_id
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
    return result.data?.facebook_creatives as FacebookCreativeWithTemplate[]
  }

  async fetchFacebookCreativeWithTemplate(facebookCreativeId: string) : Promise<FacebookCreative> {
    const result = await client.query(graphql(`
    query FetchFacebookCreativeWithTemplate($facebookCreativeId: uuid!) {
      facebook_creatives_by_pk(id: $facebookCreativeId) {
        created_at
        data
        id
        project_id
        template_id
        updated_at
        facebook_creative_template {
          created_at
          creatomate_template_id
          description
          id
          json_schema
          name
          ui_schema
          updated_at
        }
      }
    }
    `), { facebookCreativeId })
    if (result.error) {
      throw result.error
    }
    return result.data?.facebook_creatives_by_pk as FacebookCreativeWithTemplate
  }

  async updateFacebookCreative(facebookCreativeId: string, data: object) : Promise<void> {
    const result = await client.mutation(graphql(`
    mutation UpdateFacebookCreative($facebookCreativeId: uuid!, $data: jsonb!) {
      update_facebook_creatives_by_pk(pk_columns: {id: $facebookCreativeId}, _set: {data: $data}) {
        id
        data
      }
    }
    `), { facebookCreativeId, data })
    if (result.error) {
      throw result.error
    }
  }
}