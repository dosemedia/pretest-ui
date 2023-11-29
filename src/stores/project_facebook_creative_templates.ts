import { client } from '../graphql'
import { graphql } from '../gql'
import { makeAutoObservable } from 'mobx';
import { Projects as Project } from '../gql/graphql';
import { Facebook_Creative_Templates as FacebookCreativeTemplate } from "../gql/graphql";
import { Project_Facebook_Creative_Templates as ProjectFacebookCreativeTemplate } from '../gql/graphql';

export interface FacebookCreativeWithTemplate extends ProjectFacebookCreativeTemplate {
  facebook_creative_template: FacebookCreativeTemplate; 
}

export class ProjectFacebookCreativeTemplates {
  
  constructor() {
    makeAutoObservable(this)
  }
  
  async createProjectFacebookCreativeTemplateFromTemplate({ project, template } : { project: Project, template : FacebookCreativeTemplate }): Promise<ProjectFacebookCreativeTemplate> {
    const result = await client.mutation(graphql(`
    mutation CreateProjectFacebookCreativeTemplate($projectId: uuid!, $templateId: uuid!) {
      insert_project_facebook_creative_templates(objects: {project_id: $projectId, template_id: $templateId}) {
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
    if (result.data?.insert_project_facebook_creative_templates?.returning) {
      return result.data?.insert_project_facebook_creative_templates.returning[0] as ProjectFacebookCreativeTemplate
    }
    throw new Error('Failed to create creative')
  }

  async fetchProjectFacebookCreativeTemplatesByProject({ project }: { project: Project }): Promise<Array<FacebookCreativeWithTemplate>> {
    const result = await client.query(graphql(`
      query FetchProjectFacebookCreativeTemplateByProjectID($projectId: uuid!) {
        project_facebook_creative_templates(where: {project_id: {_eq: $projectId}}) {
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
    return result.data?.project_facebook_creative_templates as FacebookCreativeWithTemplate[]
  }

  async fetchProjectFacebookCreativeTemplateWithTemplate(projectFacebookCreativeId: string) : Promise<ProjectFacebookCreativeTemplate> {
    const result = await client.query(graphql(`
    query FetchProjectFacebookCreativeTemplateWithTemplate($projectFacebookCreativeId: uuid!) {
      project_facebook_creative_templates_by_pk(id: $projectFacebookCreativeId) {
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
    `), { projectFacebookCreativeId })
    if (result.error) {
      throw result.error
    }
    return result.data?.project_facebook_creative_templates_by_pk as FacebookCreativeWithTemplate
  }

  async deleteProjectFacebookCreativeTemplate(id: string): Promise<boolean> {
    const result = await client.mutation(graphql(`
      mutation DeleteProjectFacebookCreativeTemplateMutation($id: uuid!) {
        delete_project_facebook_creative_templates_by_pk(id: $id) {
          id
        }
      }
    `), { id })
    if (result.error) {
      throw result.error
    }
    return true
  }

  async updateProjectFacebookCreativeTemplate(projectFacebookCreativeTemplateId: string, data: object) : Promise<void> {
    const result = await client.mutation(graphql(`
    mutation UpdateProjectFacebookCreativeTemplate($projectFacebookCreativeTemplateId: uuid!, $data: jsonb!) {
      update_project_facebook_creative_templates_by_pk(pk_columns: {id: $projectFacebookCreativeTemplateId}, _set: {data: $data}) {
        id
        data
      }
    }
    `), { projectFacebookCreativeTemplateId, data })
    if (result.error) {
      throw result.error
    }
  }
}