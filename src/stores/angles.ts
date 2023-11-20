import { makeAutoObservable } from 'mobx'
import { client } from '../graphql'
import { graphql } from '../gql'
import { Themes_Angles as ThemeAngle, Themes_Angles_Set_Input } from "../gql/graphql";
export class ThemesAngles {
  constructor() {
    makeAutoObservable(this)
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
