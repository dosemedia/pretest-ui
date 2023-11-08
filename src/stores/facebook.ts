import { client } from '../graphql'
import { graphql } from '../gql'
import { ProjectFacebookAudienceGeolocation } from './project_facebook_audience'
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
export class Facebook {
  constructor() {
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
