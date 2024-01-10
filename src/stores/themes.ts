import { makeAutoObservable } from 'mobx'
import { client } from '../graphql'
import { graphql } from '../gql'
import { Projects_Themes as ProjectTheme, Projects_Themes_Set_Input } from "../gql/graphql";
import { themesAngles } from './stores';
import { themes as presetThemes } from '../components/lib/constants/MatrixPreset';
import _ from 'lodash';
// import { angles } from '../components/lib/constants/MatrixPreset';
export class Themes {
  constructor() {
    makeAutoObservable(this)
  }
  async fetchThemes({ projectId }: { projectId: string }): Promise<ProjectTheme[]> {
    const result = await client.query(graphql(`
    query fetchThemes($projectId: uuid!) {
      projects_themes(where: {project_id: {_eq: $projectId}}, order_by: {id: desc}) {
        id
        name
        angles(order_by: {id: desc}) {
          id
          name
        }
      }
    }
    `), { projectId })
    if (result.error) {
      throw result.error
    }
    return result.data?.projects_themes as ProjectTheme[]
  }

  async updateTheme({ id, payload }: { id: string, payload: ProjectTheme }): Promise<ProjectTheme> {
    const result = await client.mutation(graphql(`
    mutation updateTheme($id: uuid!, $updates: projects_themes_set_input) {
      update_projects_themes_by_pk(pk_columns: {id: $id}, _set: $updates) {
        id
        name
        angles {
          id
          name
        }
      }
    }
    `), { id, updates: payload as Projects_Themes_Set_Input})
    if (result.error) {
      throw result.error
    }
    return result.data?.update_projects_themes_by_pk as ProjectTheme
  }

  async deleteTheme({ id }: { id: string }): Promise<boolean> {
    const result = await client.mutation(graphql(`
    mutation deleteTheme($id: uuid!) {
      delete_projects_themes_by_pk(id: $id) {
        id
      }
    }
    `), { id })
    if (result.error) {
      throw result.error
    }
    return Boolean(result.data?.delete_projects_themes_by_pk?.id)
  }
  
  async createTheme({ name, projectId }: { name: string, projectId: string }): Promise<ProjectTheme> {
    const result = await client.mutation(graphql(`
    mutation createTheme($name: String!, $projectId: uuid!) {
      insert_projects_themes_one(object: {name: $name, project_id: $projectId}) {
        name
        id
      }
    }
    `), { projectId, name })
    if (result.error) {
      throw result.error
    }
    const theme = result.data?.insert_projects_themes_one as ProjectTheme
    const foundTheme = _.find(presetThemes, (theme) => theme.name === name)
    if (foundTheme) {
      foundTheme.angles.forEach((angle) => {
        try {
          themesAngles.createAngle({ name: angle.name, themeId: theme.id })
        } catch (e) {
          console.log(e)
        }
      })
    }
    // for (let i = 0; i < numberOfAngles; i++) {
    //   try {
    //     themesAngles.createAngle({ name: anglesName, themeId: theme.id })
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }
    return theme
  }
}
