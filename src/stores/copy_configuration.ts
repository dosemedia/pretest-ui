import { client } from '../graphql'
import { graphql } from '../gql'
import { makeAutoObservable } from 'mobx';
import { Copy_Configurations as CopyConfiguration, Copy_Configurations_Set_Input } from '../gql/graphql';
export class CopyConfigurationStore {
  constructor() {
    makeAutoObservable(this)
  }
  async fetchCopyConfiguration({ projectId }: { projectId: string }): Promise<CopyConfiguration> {
    const result = await client.query(graphql(`
      query FetchCopyConfiguration($projectId: uuid!) {
        copy_configurations_by_pk(project_id: $projectId) {
          brand_tone
          character_count
          perspective
          project_id
          template_type
          tone
        }
      }
    `), { projectId })
    if (result.error) {
      throw result.error
    }
    return result.data?.copy_configurations_by_pk as CopyConfiguration

  }
  async createCopyConfiguration({ projectId }: { projectId: string }): Promise<CopyConfiguration> {
    const result = await client.mutation(graphql(`
      mutation CreateCopyConfiguration($projectId: uuid!) {
        insert_copy_configurations_one(object: { project_id: $projectId }) {
          project_id
        }
      }
    `), { projectId })
    if (result.error) {
      throw result.error
    }
    return result.data?.insert_copy_configurations_one as CopyConfiguration
  }

  async saveCopyConfiguration({ projectId, updates }: { projectId: string, updates: Copy_Configurations_Set_Input }): Promise<CopyConfiguration> {
    console.log(updates)
    const result = await client.mutation(graphql(`
      mutation UpdateCopyConfiguration($projectId: uuid!, $updates: copy_configurations_set_input!) {
        update_copy_configurations_by_pk(pk_columns: { project_id: $projectId }, _set: $updates) {
          project_id
        }
      }
    `), { projectId, updates })
    if (result.error) {
      throw result.error
    }
    return result.data?.update_copy_configurations_by_pk as CopyConfiguration
  }
}