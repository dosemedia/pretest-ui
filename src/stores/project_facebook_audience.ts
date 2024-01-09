import { client } from '../graphql'
import { graphql } from '../gql'
import { Facebook_Audiences as FacebookAudience, Facebook_Audiences_Set_Input } from '../gql/graphql'
import { makeAutoObservable } from 'mobx';
import { Projects as Project } from '../gql/graphql';
export interface ProjectFacebookAudienceGeolocation {
  countries: string[],
  regions: Record<Exclude<string, "known" | "field">, string | object>
}
export class ProjectFacebookAudience {
  creatingAudience: boolean = false;
  constructor() {
    makeAutoObservable(this)
  }
  checkIsAudienceComplete(audience?: FacebookAudience): boolean {
    if (audience) {

      if ((audience.geo_locations?.countries?.length === 0) && Object.keys(audience.geo_locations?.regions).length === 0) {
        return false
      } else if (audience.genders?.length === 0) {
        return false
      } else if (!audience.interests || Object.keys(audience.interests).length === 0) {
        return false
      } else if (audience.device_platforms.length === 0) {
        return false
      } else if (!audience.name) {
        return false
      }
      return true
    }
    return false
  }
  async updateFacebookAudiencesByID({ id, payload }: { id: string, payload: FacebookAudience }): Promise<FacebookAudience> {
    console.log(id, payload)
    const result = await client.mutation(graphql(`
      mutation UpdateFacebookAudiencesByProjectID($id: uuid!, $updates: facebook_audiences_set_input) {
        update_facebook_audiences_by_pk(pk_columns: {id: $id}, _set: $updates) {
          id
          name
          geo_locations
          genders
          interests
          device_platforms
          facebook_positions
          min_age
          max_age
          approved
          updated_at
        }
      }
    `), { id, updates: payload as Facebook_Audiences_Set_Input})
    if (result.error) {
      throw result.error
    }
    return result.data?.update_facebook_audiences_by_pk as FacebookAudience

  }
  async deleteFacebookAudience({ audienceId }: { audienceId: string }): Promise<boolean> {
    const result = await client.mutation(graphql(`
      mutation DeleteFacebookAudience($audienceId: uuid!) {
        delete_facebook_audiences_by_pk(id: $audienceId) {
          id
        }
      }
    `), { audienceId })
    if (result.error) {
      throw result.error
    }
    return true
  }
  async createFacebookAudience({ project, name, geo_locations = { countries: ['US'], regions: {} } }: { project: Project, name: string, geo_locations?: object }): Promise<FacebookAudience | null> {
    if (this.creatingAudience) {
      return null
    }
    this.creatingAudience = true
    const result = await client.mutation(graphql(`
      mutation CreateFacebookAudience($geo_locations: jsonb!, $name: String!, $projectId: uuid!, $publisher_platforms: [String!]) {
        insert_facebook_audiences_one(object: {name: $name, geo_locations: $geo_locations, project_id: $projectId, publisher_platforms: $publisher_platforms}) {
          id
          name
          geo_locations
          device_platforms
          interests
          publisher_platforms
          facebook_positions
          genders
          updated_at
        }
      }
    `), { projectId: project.id, name, geo_locations, publisher_platforms: project.platform?.split('_') || ['facebook']})
    this.creatingAudience = false
    if (result.error) {
      throw result.error
    }
    return result.data?.insert_facebook_audiences_one as FacebookAudience
  }
  async getFacebookAudiencesByProjectID({ project }: { project: Project }): Promise<FacebookAudience | null> {
    const result = await client.query(graphql(`
      query GetFacebookAudiencesByProjectID($projectId: uuid!) {
        facebook_audiences(where: {project_id: {_eq: $projectId}}) {
          id
          name
          geo_locations
          device_platforms
          interests
          facebook_positions
          genders
          min_age
          max_age
          updated_at
        }
      }
    `), { projectId: project.id })
    if (result.error) {
      throw result.error
    }
    return result.data?.facebook_audiences && result.data.facebook_audiences[0] ? result.data.facebook_audiences[0] as FacebookAudience : null
  }
}