import { client } from '../graphql'
import { graphql } from '../gql'
import { ProjectFacebookAudienceGeolocation } from './project_facebook_audience'
import { Facebook_Audiences as FacebookAudience } from '../gql/graphql'
export interface FacebookAudienceGeolocation {
  country_code: string,
  country_name: string,
  name: string,
  key: string,
  region: string,
  region_id: number,
  supports_city: boolean,
  supports_region: boolean,
  type: string
}
export interface FacebookAudienceInterest {
  name: string,
  id: number
}
export interface FacebookAudienceEstimatedReach {
  estimate_ready: boolean
  users_lower_bound: number
  users_upper_bound: number
}
export class Facebook {
  constructor() {
  }
  async getReachEstimate({ audience }: { audience: FacebookAudience | null | undefined }): Promise<FacebookAudienceEstimatedReach> {
    if (!audience) {
      return {} as FacebookAudienceEstimatedReach
    }
    const result = await client.mutation(graphql(`
    mutation FacebookAPIGet($url: String!) {
      facebookAPIGet(url: $url)
    }
    `), {
      url: `/act_{{FACEBOOK_AD_ACCOUNT_ID}}/reachestimate?targeting_spec=${encodeURI(JSON.stringify({ geo_locations: audience.geo_locations, genders: audience.genders, interests: audience.interests, device_platforms: audience.device_platforms }))}`
    })
    if (result.error) {
      throw result.error
    }
    return result.data?.facebookAPIGet.data as FacebookAudienceEstimatedReach
  }
  async getInterests({ search }: { search: string }): Promise<FacebookAudienceInterest[]> {
    if (!search) {
      return [] as FacebookAudienceInterest[]
    }
    const result = await client.mutation(graphql(`
    mutation FacebookAPIGet($url: String!) {
      facebookAPIGet(url: $url)
    }
    `), { url: `/search?type=adinterest&q=${search}` })
    if (result.error) {
      throw result.error
    }
    return (result.data?.facebookAPIGet.data as FacebookAudienceInterest[]).filter((item) => !['housing', 'employment', 'credit ads', 'issues', 'election', 'political ads'].includes(item.name))
  }
  async getAudienceLocationsByKeys({ geo_locations }: { geo_locations: ProjectFacebookAudienceGeolocation }): Promise<FacebookAudienceGeolocation[]> {
    const result = await client.mutation(graphql(`
    mutation FacebookAPIGet($url: String!) {
      facebookAPIGet(url: $url)
    }
    `), { url: `/search?type=adgeolocationmeta&countries=[${geo_locations.countries.map((item) => `"${item}"`).join(',')}]&regions=[${Object.keys(geo_locations.regions).join(',')}]` })
    if (result.error) {
      throw result.error
    }
    const facebookAudienceGeolocations: FacebookAudienceGeolocation[] = []
    if (result.data?.facebookAPIGet?.data && result.data?.facebookAPIGet?.data.countries) {
      for (const key of Object.keys(result.data?.facebookAPIGet?.data.countries)) {
        facebookAudienceGeolocations.push(result.data?.facebookAPIGet?.data.countries[key])
      }
      for (const key of Object.keys(result.data?.facebookAPIGet?.data.regions)) {
        facebookAudienceGeolocations.push(result.data?.facebookAPIGet?.data.regions[key])
      }
    }
    return facebookAudienceGeolocations
  }
  async getAudienceLocationsBySearch({ search }: { search: string }): Promise<FacebookAudienceGeolocation[]> {
    const result = await client.mutation(graphql(`
    mutation FacebookAPIGet($url: String!) {
      facebookAPIGet(url: $url)
    }
    `), { url: `/search?type=adgeolocation${search ? `&location_types=['region', 'country']&q=${search}` : ''}` })
    if (result.error) {
      throw result.error
    }
    return result.data?.facebookAPIGet?.data as FacebookAudienceGeolocation[]
  }
}
