import { makeAutoObservable } from 'mobx'
import { client } from '../graphql'
import { graphql } from '../gql'
import { Themes_Angles as ThemeAngle, Themes_Angles_Set_Input, Themes_Angles_Updates } from "../gql/graphql";
export class ThemesAngles {
  constructor() {
    makeAutoObservable(this)
  }
  async updateAngles({ updates }: { updates: Themes_Angles_Updates[] }): Promise<void> {
    console.log(updates)
    const result = await client.mutation(graphql(`
    mutation updateAngles($updates: [themes_angles_updates!]!) {
      update_themes_angles_many(updates: $updates) {
        returning {
          name
        }
      }
    }
    `), { updates })
    if (result.error) {
      throw result.error
    }
  }
  async updateAngle({ id, payload }: { id: string, payload: ThemeAngle }): Promise<boolean> {
    const result = await client.mutation(graphql(`
    mutation updateAngle($id: uuid!, $updates: themes_angles_set_input) {
      update_themes_angles_by_pk(pk_columns: {id: $id}, _set: $updates) {
        id
      }
    }
    `), { id, updates: payload as Themes_Angles_Set_Input})
    if (result.error) {
      throw result.error
    }
    return Boolean(result.data?.update_themes_angles_by_pk)
  }
  async createMultipleAngles ({ angleObjects }: { angleObjects: Themes_Angles_Set_Input }): Promise<ThemeAngle[]> {
    const result = await client.mutation(graphql(`
    mutation CreateMultipleAngles($angleObjects: [themes_angles_insert_input!]!) {
      insert_themes_angles(objects: $angleObjects) {
        returning {
          id
          name
        }
      }
    }
    `), { angleObjects })
    if (result.error) {
      throw result.error
    }
    return result.data?.insert_themes_angles?.returning as ThemeAngle[]
  }
  async createAngle({ name, themeId }: { name: string, themeId: string }): Promise<ThemeAngle> {
    const result = await client.mutation(graphql(`
    mutation createAngle($name: String!, $themeId: uuid!) {
      insert_themes_angles_one(object: {name: $name, theme_id: $themeId}) {
        name
        id
      }
    }
    `), { name, themeId })
    if (result.error) {
      throw result.error
    }
    return result.data?.insert_themes_angles_one as ThemeAngle
  }
}
