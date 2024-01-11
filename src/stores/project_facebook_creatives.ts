import { makeAutoObservable } from 'mobx';
import { Facebook_Creatives_Insert_Input, Facebook_Creatives_Updates } from '../gql/graphql';
import { Facebook_Creatives as FacebookCreative } from '../gql/graphql';
import { client } from '../graphql'
import { graphql } from '../gql'
import { RequestPolicy } from 'urql';
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

  async fetchProjectFacebookCreativesByProjectID({ projectId, requestPolicy = 'cache-first' }: { projectId: string, requestPolicy?: RequestPolicy }): Promise<FacebookCreative[]> {
    console.log('refetch')
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
    `), { projectId }, { requestPolicy })
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

  async updateProjectFacebookCreatives({ facebookCreativesUpdates }: { facebookCreativesUpdates: Facebook_Creatives_Updates[] }): Promise<FacebookCreative[]> {
    const result = await client.mutation(graphql(`
    mutation UpdateFacebookCreatives($facebookCreativesUpdates: [facebook_creatives_updates!]!) {
      update_facebook_creatives_many(updates: $facebookCreativesUpdates) {
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
    `), { facebookCreativesUpdates })
    if (result.error) {
      throw result.error
    }
    return result.data?.update_facebook_creatives_many!.map((item) => item?.returning as unknown as FacebookCreative) as FacebookCreative[]
  }
}