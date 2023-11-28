import { makeAutoObservable } from 'mobx'
import { client } from '../graphql'
import { graphql } from '../gql'
import { Landing_Page_Templates as LandingPageTemplate } from "../gql/graphql";

export class LandingPageTemplates {
  constructor() {
    makeAutoObservable(this)
  }

  async fetchTemplates(): Promise<LandingPageTemplate[] | undefined> {
    const result = await client.query(graphql(`
    query FetchLandingPageTemplates {
      landing_page_templates(order_by: {name: asc}) {
        name
        ui_schema
        json_schema
        updated_at
        created_at
        description
        component
        id
      }
    }
    `), { })
    if (result.error) {
      throw result.error
    }
    return result.data?.landing_page_templates as LandingPageTemplate[]
  }
}