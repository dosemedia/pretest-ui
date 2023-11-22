import { makeAutoObservable } from 'mobx'
import { client } from '../graphql'
import { graphql } from '../gql'
import { Facebook_Creative_Templates as FacebookCreativeTemplate } from "../gql/graphql";

export class FacebookCreativeTemplates {
  constructor() {
    makeAutoObservable(this)
  }

  async fetchTemplates(): Promise<FacebookCreativeTemplate[] | undefined> {
    const result = await client.query(graphql(`
    query FetchFacebookCreativeTemplates {
      facebook_creative_templates(order_by: {name: asc}) {
        name
        ui_schema
        json_schema
        updated_at
        created_at
        description
        creatomate_template_id
        id
      }
    }
    `), { })
    if (result.error) {
      throw result.error
    }
    return result.data?.facebook_creative_templates as FacebookCreativeTemplate[]
  }
}