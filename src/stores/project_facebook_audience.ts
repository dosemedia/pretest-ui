import { client } from '../graphql'
import { graphql } from '../gql'
import { Facebook_Audiences as FacebookAudience } from '../gql/graphql'
export interface ProjectFacebookAudienceGeolocation {
  countries: string[],
  regions: Record<Exclude<string, "known" | "field">, string | object>
}
export class ProjectFacebookAudience {
  constructor() {}
  async updateFacebookAudiencesByID({ id, payload }: { id: string, payload: object }) {
    const facebookAudienceData = payload as FacebookAudience
    const result = await client.mutation(graphql(`
      mutation UpdateFacebookAudiencesByProjectID($geo_locations: jsonb!, $id: uuid!) {
        update_facebook_audiences_by_pk(pk_columns: {id: $id}, _set: {geo_locations: $geo_locations}) {
          geo_locations
          id
        }
      }
    `), { geo_locations: facebookAudienceData.geo_locations, id })
    if (result.error) {
      throw result.error
    }
    return result.data?.update_facebook_audiences_by_pk
  }
  async getFacebookAudiencesByProjectID({ projectId }: { projectId: string }) {
    const result = await client.query(graphql(`
      query GetFacebookAudiencesByProjectID($projectId: uuid!) {
        facebook_audiences(where: {project_id: {_eq: $projectId}}) {
          geo_locations
          id
        }
      }
    `), { projectId })
    if (result.error) {
      throw result.error
    }
    return result.data?.facebook_audiences
  }
}