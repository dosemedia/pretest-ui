import { client } from '../graphql'
import { graphql } from '../gql'
import { Facebook_Audiences as FacebookAudience } from '../gql/graphql'
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
  async updateFacebookAudiencesByID({ id, payload }: { id: string, payload: object }): Promise<FacebookAudience> {
    const facebookAudienceData = payload as FacebookAudience
    const result = await client.mutation(graphql(`
      mutation UpdateFacebookAudiencesByProjectID($geo_locations: jsonb!, $name: String, $genders: [Int!], $id: uuid!, $min_age: numeric, $max_age: numeric, $device_platforms: [String!], $facebook_positions: [String!], $interests: jsonb!) {
        update_facebook_audiences_by_pk(pk_columns: {id: $id}, _set: {geo_locations: $geo_locations, name: $name, genders: $genders, min_age: $min_age, max_age: $max_age, device_platforms: $device_platforms, facebook_positions: $facebook_positions, interests: $interests}) {
          id
          name
          geo_locations
          genders
          interests
          device_platforms
          facebook_positions
          min_age
          max_age
          updated_at
        }
      }
    `), { geo_locations: facebookAudienceData.geo_locations, id, genders: facebookAudienceData.genders, min_age: facebookAudienceData.min_age, max_age: facebookAudienceData.max_age, device_platforms: facebookAudienceData.device_platforms, facebook_positions: facebookAudienceData.facebook_positions, interests: facebookAudienceData.interests, name: facebookAudienceData.name })
    if (result.error) {
      throw result.error
    }
    return result.data?.update_facebook_audiences_by_pk as FacebookAudience

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
  async getFacebookAudiencesByProjectID({ project, createIfDoesNotExist }: { project: Project, createIfDoesNotExist?: boolean }): Promise<FacebookAudience | null> {
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
    if (result.data?.facebook_audiences.length === 0 && createIfDoesNotExist) {
      const audience = await this.createFacebookAudience({ project, name: 'My Custom Audience' })
      if (audience) {
        return audience
      }
      return null
    }
    return result.data?.facebook_audiences && result.data.facebook_audiences[0] ? result.data.facebook_audiences[0] as FacebookAudience : null
  }
}