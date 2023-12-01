import { makeAutoObservable } from 'mobx';
import { Facebook_Creatives_Insert_Input } from '../gql/graphql';
import { Facebook_Creatives as FacebookCreative } from '../gql/graphql';
import { client } from '../graphql'
import { graphql } from '../gql'
export class ProjectFacebookCreatives {

  constructor() {
    makeAutoObservable(this)
  }

  async deleteProjectFacebookCreativesByProjectID({ projectId }: { projectId: string }): Promise<boolean> {
    const result = await client.mutation(graphql(`
        mutation DeleteProjectFacebookCreativesByProjectID($projectId: uuid!) {
          delete_facebook_creatives(where: {project_id: {_eq: $projectId}}) {
            returning {
              id
            }
          }
        }
    `), { projectId })
    if (result.error) {
      throw result.error
    }
    return true
  }

  async fetchProjectFacebookCreativesByProjectID({ projectId }: { projectId: string }): Promise<FacebookCreative[]> {
    const result = await client.query(graphql(`
    query FetchFacebookCreativesByProjectID($projectId: uuid!) {
      facebook_creatives(where: { project_id: {_eq: $projectId }}) {
        id
        created_at
        data
        project_id
        template_name
        updated_at
      }
    }
    `), { projectId })
    if (result.error) {
      throw result.error
    }
    return result.data?.facebook_creatives as FacebookCreative[]
  }

  async createProjectFacebookCreatives({ facebookCreativesInput }: { facebookCreativesInput: Facebook_Creatives_Insert_Input[] }): Promise<FacebookCreative[]> {
    const result = await client.mutation(graphql(`
    mutation CreateFacebookCreative($facebookCreativesInput: [facebook_creatives_insert_input!]!) {
      insert_facebook_creatives(objects: $facebookCreativesInput) {
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
    `), { facebookCreativesInput })
    if (result.error) {
      throw result.error
    }
    return result.data?.insert_facebook_creatives?.returning as FacebookCreative[]
  }
}