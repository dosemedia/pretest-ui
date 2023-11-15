/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    mutation updateAngle($id: uuid!, $name: String!) {\n      update_themes_angles_by_pk(pk_columns: {id: $id}, _set: {name: $name}) {\n        id\n      }\n    }\n    ": types.UpdateAngleDocument,
    "\n    mutation createAngle($name: String!, $themeId: uuid!) {\n      insert_themes_angles_one(object: {name: $name, theme_id: $themeId}) {\n        name\n        id\n      }\n    }\n    ": types.CreateAngleDocument,
    "mutation UpdateDisplayName($id: uuid!, $avatar_file_key: String) {\n          update_users_by_pk(pk_columns: {id: $id}, _set: {avatar_file_key: $avatar_file_key}) {\n            avatar_file_key\n            email\n            display_name\n          }\n        }": types.UpdateDisplayNameDocument,
    "\n    mutation DestroyUser($password: String!) {\n      destroyUser(password: $password)\n    }\n    ": types.DestroyUserDocument,
    "\n    mutation ChangePassword($oldPassword: String!, $newPassword: String!) {\n      changePassword(oldPassword: $oldPassword, newPassword: $newPassword)\n    }\n    ": types.ChangePasswordDocument,
    "\n    mutation ChangeEmail($newEmail: String!, $password: String!) {\n      changeEmail(newEmail: $newEmail, password: $password)\n    }\n    ": types.ChangeEmailDocument,
    "\n    mutation UpdateUser($display_name: String!, $id: uuid!) {\n      update_users_by_pk(pk_columns: {id: $id}, _set: {display_name: $display_name}) {\n        display_name\n        avatar_file_key\n        email\n      }\n    }\n    ": types.UpdateUserDocument,
    "\n    mutation register($email: String!, $password: String!) {\n      register(email: $email, password: $password) {\n        token\n        id\n      }\n    }": types.RegisterDocument,
    "\n    mutation Login($email: String!, $password: String!) {\n      login(email: $email, password: $password) {\n        token\n        id\n      }\n    }": types.LoginDocument,
    "\n    mutation SendPasswordResetEmail($email: String!) {\n      sendPasswordResetEmail(email: $email)\n    }": types.SendPasswordResetEmailDocument,
    "\n    mutation VerifyEmail($code: String!) {\n      verifyEmail(code: $code)\n    }": types.VerifyEmailDocument,
    "\n    mutation ResetPassword($code: String!, $email: String!, $newPassword: String!) {\n      resetPassword(code: $code, email: $email, newPassword: $newPassword)\n    }": types.ResetPasswordDocument,
    "\n    mutation SubmitContactForm($name: String!, $email: String!, $message: String!) {\n      insert_contact_form_submissions(objects: {email: $email, message: $message, name: $name}) {\n        affected_rows\n      }\n    }\n    ": types.SubmitContactFormDocument,
    "\n    mutation FacebookAPIGet($url: String!) {\n      facebookAPIGet(url: $url)\n    }\n    ": types.FacebookApiGetDocument,
    "\n      mutation UpdateFacebookAudiencesByProjectID($geo_locations: jsonb!, $name: String, $genders: [Int!], $id: uuid!, $min_age: numeric, $max_age: numeric, $device_platforms: [String!], $facebook_positions: [String!], $interests: jsonb!) {\n        update_facebook_audiences_by_pk(pk_columns: {id: $id}, _set: {geo_locations: $geo_locations, name: $name, genders: $genders, min_age: $min_age, max_age: $max_age, device_platforms: $device_platforms, facebook_positions: $facebook_positions, interests: $interests}) {\n          id\n          name\n          geo_locations\n          genders\n          interests\n          device_platforms\n          facebook_positions\n          min_age\n          max_age\n          updated_at\n        }\n      }\n    ": types.UpdateFacebookAudiencesByProjectIdDocument,
    "\n      mutation CreateFacebookAudience($geo_locations: jsonb!, $name: String!, $projectId: uuid!, $publisher_platforms: [String!]) {\n        insert_facebook_audiences_one(object: {name: $name, geo_locations: $geo_locations, project_id: $projectId, publisher_platforms: $publisher_platforms}) {\n          id\n          name\n          geo_locations\n          device_platforms\n          interests\n          publisher_platforms\n          facebook_positions\n          genders\n          updated_at\n        }\n      }\n    ": types.CreateFacebookAudienceDocument,
    "\n      query GetFacebookAudiencesByProjectID($projectId: uuid!) {\n        facebook_audiences(where: {project_id: {_eq: $projectId}}) {\n          id\n          name\n          geo_locations\n          device_platforms\n          interests\n          facebook_positions\n          genders\n          min_age\n          max_age\n          updated_at\n        }\n      }\n    ": types.GetFacebookAudiencesByProjectIdDocument,
    "\n    mutation CreateProject($name: String!, $team_id: uuid!) {\n      createProject(team_id: $team_id, name: $name) {\n        id\n        name\n        team_id\n      }\n    }\n    ": types.CreateProjectDocument,
    "\n    mutation DeleteProject($id: uuid!) {\n      delete_projects_by_pk(id: $id) {\n        id\n      }\n    }\n    ": types.DeleteProjectDocument,
    "\n      mutation UpdateProject($projectId: uuid!, $name: String, $objective: String, $branding: String, $platform: String, $projectType: String, $startTime: timestamptz, $stopTime: timestamptz) {\n        update_projects_by_pk(pk_columns: {id: $projectId}, _set: {name: $name, objective: $objective, branding: $branding, platform: $platform, project_type: $projectType, start_time: $startTime, stop_time: $stopTime}) {\n          name\n          objective\n          branding\n          platform\n          project_type\n          is_draft\n          updated_at\n          start_time\n          stop_time\n        }\n      }\n      ": types.UpdateProjectDocument,
    "\n      query FetchProject($projectId: uuid!) {\n        projects_by_pk(id: $projectId) {\n          id\n          name\n          objective\n          branding\n          platform\n          project_type\n          is_draft\n          created_at\n          updated_at\n          start_time\n          stop_time\n        }\n      }\n      ": types.FetchProjectDocument,
    "\n    query fetchProjects($teamId: uuid!) {\n      projects(where: {teams_projects: {team_id: {_eq: $teamId}}}, order_by: {created_at: desc}) {\n        name\n        id\n        is_draft\n        project_type\n        start_time\n        stop_time\n        created_at\n      }\n    }\n    ": types.FetchProjectsDocument,
    "\n      mutation inviteUser($email: String!, $teamId: uuid!) {\n        insert_invitations_one(object: { email: $email, team_id: $teamId }) {\n          created_at\n        }\n      }\n      ": types.InviteUserDocument,
    "\n      mutation createTeam($name: String!) {\n        createTeam(name: $name)\n      }\n      ": types.CreateTeamDocument,
    "\n      query fetchTeams {\n        teams {\n          name\n          id\n          created_at\n          teams_users_aggregate {\n            aggregate {\n              count\n            }\n          }\n          teams_users {\n            user_id\n            role\n          }\n        }\n      }\n      ": types.FetchTeamsDocument,
    "\n      query fetchTeam($teamId: uuid!) {\n        teams_by_pk(id: $teamId) {\n          id\n          name\n          created_at\n          teams_users {\n            user_id\n            created_at\n            user {\n              email\n              created_at\n            }\n          }\n        }\n      }\n      ": types.FetchTeamDocument,
    "\n    query checkMembership($teamId: uuid!, $userId: uuid!) {\n      teams_users(where: {_and: {team_id: {_eq: $teamId}, user_id: {_eq: $userId}}}) {\n        team_id\n      }\n    }": types.CheckMembershipDocument,
    "\n      mutation leaveTeam($teamId: uuid!) {\n        leaveTeam(teamId: $teamId)\n      }\n      ": types.LeaveTeamDocument,
    "\n      mutation joinTeam($teamId: uuid!) {\n        joinTeam(teamId: $teamId)\n      }\n      ": types.JoinTeamDocument,
    "\n    query fetchThemes($projectId: uuid!) {\n      projects_themes(where: {project_id: {_eq: $projectId}}, order_by: {id: desc}) {\n        id\n        name\n        angles(order_by: {id: desc}) {\n          id\n          name\n        }\n      }\n    }\n    ": types.FetchThemesDocument,
    "\n    mutation updateTheme($id: uuid!, $name: String!) {\n      update_projects_themes_by_pk(pk_columns: {id: $id}, _set: {name: $name}) {\n        id\n      }\n    }\n    ": types.UpdateThemeDocument,
    "\n    mutation deleteTheme($id: uuid!) {\n      delete_projects_themes_by_pk(id: $id) {\n        id\n      }\n    }\n    ": types.DeleteThemeDocument,
    "\n    mutation createTheme($name: String!, $projectId: uuid!) {\n      insert_projects_themes_one(object: {name: $name, project_id: $projectId}) {\n        name\n        id\n      }\n    }\n    ": types.CreateThemeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation updateAngle($id: uuid!, $name: String!) {\n      update_themes_angles_by_pk(pk_columns: {id: $id}, _set: {name: $name}) {\n        id\n      }\n    }\n    "): (typeof documents)["\n    mutation updateAngle($id: uuid!, $name: String!) {\n      update_themes_angles_by_pk(pk_columns: {id: $id}, _set: {name: $name}) {\n        id\n      }\n    }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createAngle($name: String!, $themeId: uuid!) {\n      insert_themes_angles_one(object: {name: $name, theme_id: $themeId}) {\n        name\n        id\n      }\n    }\n    "): (typeof documents)["\n    mutation createAngle($name: String!, $themeId: uuid!) {\n      insert_themes_angles_one(object: {name: $name, theme_id: $themeId}) {\n        name\n        id\n      }\n    }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateDisplayName($id: uuid!, $avatar_file_key: String) {\n          update_users_by_pk(pk_columns: {id: $id}, _set: {avatar_file_key: $avatar_file_key}) {\n            avatar_file_key\n            email\n            display_name\n          }\n        }"): (typeof documents)["mutation UpdateDisplayName($id: uuid!, $avatar_file_key: String) {\n          update_users_by_pk(pk_columns: {id: $id}, _set: {avatar_file_key: $avatar_file_key}) {\n            avatar_file_key\n            email\n            display_name\n          }\n        }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DestroyUser($password: String!) {\n      destroyUser(password: $password)\n    }\n    "): (typeof documents)["\n    mutation DestroyUser($password: String!) {\n      destroyUser(password: $password)\n    }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation ChangePassword($oldPassword: String!, $newPassword: String!) {\n      changePassword(oldPassword: $oldPassword, newPassword: $newPassword)\n    }\n    "): (typeof documents)["\n    mutation ChangePassword($oldPassword: String!, $newPassword: String!) {\n      changePassword(oldPassword: $oldPassword, newPassword: $newPassword)\n    }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation ChangeEmail($newEmail: String!, $password: String!) {\n      changeEmail(newEmail: $newEmail, password: $password)\n    }\n    "): (typeof documents)["\n    mutation ChangeEmail($newEmail: String!, $password: String!) {\n      changeEmail(newEmail: $newEmail, password: $password)\n    }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateUser($display_name: String!, $id: uuid!) {\n      update_users_by_pk(pk_columns: {id: $id}, _set: {display_name: $display_name}) {\n        display_name\n        avatar_file_key\n        email\n      }\n    }\n    "): (typeof documents)["\n    mutation UpdateUser($display_name: String!, $id: uuid!) {\n      update_users_by_pk(pk_columns: {id: $id}, _set: {display_name: $display_name}) {\n        display_name\n        avatar_file_key\n        email\n      }\n    }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation register($email: String!, $password: String!) {\n      register(email: $email, password: $password) {\n        token\n        id\n      }\n    }"): (typeof documents)["\n    mutation register($email: String!, $password: String!) {\n      register(email: $email, password: $password) {\n        token\n        id\n      }\n    }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation Login($email: String!, $password: String!) {\n      login(email: $email, password: $password) {\n        token\n        id\n      }\n    }"): (typeof documents)["\n    mutation Login($email: String!, $password: String!) {\n      login(email: $email, password: $password) {\n        token\n        id\n      }\n    }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation SendPasswordResetEmail($email: String!) {\n      sendPasswordResetEmail(email: $email)\n    }"): (typeof documents)["\n    mutation SendPasswordResetEmail($email: String!) {\n      sendPasswordResetEmail(email: $email)\n    }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation VerifyEmail($code: String!) {\n      verifyEmail(code: $code)\n    }"): (typeof documents)["\n    mutation VerifyEmail($code: String!) {\n      verifyEmail(code: $code)\n    }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation ResetPassword($code: String!, $email: String!, $newPassword: String!) {\n      resetPassword(code: $code, email: $email, newPassword: $newPassword)\n    }"): (typeof documents)["\n    mutation ResetPassword($code: String!, $email: String!, $newPassword: String!) {\n      resetPassword(code: $code, email: $email, newPassword: $newPassword)\n    }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation SubmitContactForm($name: String!, $email: String!, $message: String!) {\n      insert_contact_form_submissions(objects: {email: $email, message: $message, name: $name}) {\n        affected_rows\n      }\n    }\n    "): (typeof documents)["\n    mutation SubmitContactForm($name: String!, $email: String!, $message: String!) {\n      insert_contact_form_submissions(objects: {email: $email, message: $message, name: $name}) {\n        affected_rows\n      }\n    }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation FacebookAPIGet($url: String!) {\n      facebookAPIGet(url: $url)\n    }\n    "): (typeof documents)["\n    mutation FacebookAPIGet($url: String!) {\n      facebookAPIGet(url: $url)\n    }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateFacebookAudiencesByProjectID($geo_locations: jsonb!, $name: String, $genders: [Int!], $id: uuid!, $min_age: numeric, $max_age: numeric, $device_platforms: [String!], $facebook_positions: [String!], $interests: jsonb!) {\n        update_facebook_audiences_by_pk(pk_columns: {id: $id}, _set: {geo_locations: $geo_locations, name: $name, genders: $genders, min_age: $min_age, max_age: $max_age, device_platforms: $device_platforms, facebook_positions: $facebook_positions, interests: $interests}) {\n          id\n          name\n          geo_locations\n          genders\n          interests\n          device_platforms\n          facebook_positions\n          min_age\n          max_age\n          updated_at\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateFacebookAudiencesByProjectID($geo_locations: jsonb!, $name: String, $genders: [Int!], $id: uuid!, $min_age: numeric, $max_age: numeric, $device_platforms: [String!], $facebook_positions: [String!], $interests: jsonb!) {\n        update_facebook_audiences_by_pk(pk_columns: {id: $id}, _set: {geo_locations: $geo_locations, name: $name, genders: $genders, min_age: $min_age, max_age: $max_age, device_platforms: $device_platforms, facebook_positions: $facebook_positions, interests: $interests}) {\n          id\n          name\n          geo_locations\n          genders\n          interests\n          device_platforms\n          facebook_positions\n          min_age\n          max_age\n          updated_at\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateFacebookAudience($geo_locations: jsonb!, $name: String!, $projectId: uuid!, $publisher_platforms: [String!]) {\n        insert_facebook_audiences_one(object: {name: $name, geo_locations: $geo_locations, project_id: $projectId, publisher_platforms: $publisher_platforms}) {\n          id\n          name\n          geo_locations\n          device_platforms\n          interests\n          publisher_platforms\n          facebook_positions\n          genders\n          updated_at\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateFacebookAudience($geo_locations: jsonb!, $name: String!, $projectId: uuid!, $publisher_platforms: [String!]) {\n        insert_facebook_audiences_one(object: {name: $name, geo_locations: $geo_locations, project_id: $projectId, publisher_platforms: $publisher_platforms}) {\n          id\n          name\n          geo_locations\n          device_platforms\n          interests\n          publisher_platforms\n          facebook_positions\n          genders\n          updated_at\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query GetFacebookAudiencesByProjectID($projectId: uuid!) {\n        facebook_audiences(where: {project_id: {_eq: $projectId}}) {\n          id\n          name\n          geo_locations\n          device_platforms\n          interests\n          facebook_positions\n          genders\n          min_age\n          max_age\n          updated_at\n        }\n      }\n    "): (typeof documents)["\n      query GetFacebookAudiencesByProjectID($projectId: uuid!) {\n        facebook_audiences(where: {project_id: {_eq: $projectId}}) {\n          id\n          name\n          geo_locations\n          device_platforms\n          interests\n          facebook_positions\n          genders\n          min_age\n          max_age\n          updated_at\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateProject($name: String!, $team_id: uuid!) {\n      createProject(team_id: $team_id, name: $name) {\n        id\n        name\n        team_id\n      }\n    }\n    "): (typeof documents)["\n    mutation CreateProject($name: String!, $team_id: uuid!) {\n      createProject(team_id: $team_id, name: $name) {\n        id\n        name\n        team_id\n      }\n    }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteProject($id: uuid!) {\n      delete_projects_by_pk(id: $id) {\n        id\n      }\n    }\n    "): (typeof documents)["\n    mutation DeleteProject($id: uuid!) {\n      delete_projects_by_pk(id: $id) {\n        id\n      }\n    }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateProject($projectId: uuid!, $name: String, $objective: String, $branding: String, $platform: String, $projectType: String, $startTime: timestamptz, $stopTime: timestamptz) {\n        update_projects_by_pk(pk_columns: {id: $projectId}, _set: {name: $name, objective: $objective, branding: $branding, platform: $platform, project_type: $projectType, start_time: $startTime, stop_time: $stopTime}) {\n          name\n          objective\n          branding\n          platform\n          project_type\n          is_draft\n          updated_at\n          start_time\n          stop_time\n        }\n      }\n      "): (typeof documents)["\n      mutation UpdateProject($projectId: uuid!, $name: String, $objective: String, $branding: String, $platform: String, $projectType: String, $startTime: timestamptz, $stopTime: timestamptz) {\n        update_projects_by_pk(pk_columns: {id: $projectId}, _set: {name: $name, objective: $objective, branding: $branding, platform: $platform, project_type: $projectType, start_time: $startTime, stop_time: $stopTime}) {\n          name\n          objective\n          branding\n          platform\n          project_type\n          is_draft\n          updated_at\n          start_time\n          stop_time\n        }\n      }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query FetchProject($projectId: uuid!) {\n        projects_by_pk(id: $projectId) {\n          id\n          name\n          objective\n          branding\n          platform\n          project_type\n          is_draft\n          created_at\n          updated_at\n          start_time\n          stop_time\n        }\n      }\n      "): (typeof documents)["\n      query FetchProject($projectId: uuid!) {\n        projects_by_pk(id: $projectId) {\n          id\n          name\n          objective\n          branding\n          platform\n          project_type\n          is_draft\n          created_at\n          updated_at\n          start_time\n          stop_time\n        }\n      }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query fetchProjects($teamId: uuid!) {\n      projects(where: {teams_projects: {team_id: {_eq: $teamId}}}, order_by: {created_at: desc}) {\n        name\n        id\n        is_draft\n        project_type\n        start_time\n        stop_time\n        created_at\n      }\n    }\n    "): (typeof documents)["\n    query fetchProjects($teamId: uuid!) {\n      projects(where: {teams_projects: {team_id: {_eq: $teamId}}}, order_by: {created_at: desc}) {\n        name\n        id\n        is_draft\n        project_type\n        start_time\n        stop_time\n        created_at\n      }\n    }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation inviteUser($email: String!, $teamId: uuid!) {\n        insert_invitations_one(object: { email: $email, team_id: $teamId }) {\n          created_at\n        }\n      }\n      "): (typeof documents)["\n      mutation inviteUser($email: String!, $teamId: uuid!) {\n        insert_invitations_one(object: { email: $email, team_id: $teamId }) {\n          created_at\n        }\n      }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation createTeam($name: String!) {\n        createTeam(name: $name)\n      }\n      "): (typeof documents)["\n      mutation createTeam($name: String!) {\n        createTeam(name: $name)\n      }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query fetchTeams {\n        teams {\n          name\n          id\n          created_at\n          teams_users_aggregate {\n            aggregate {\n              count\n            }\n          }\n          teams_users {\n            user_id\n            role\n          }\n        }\n      }\n      "): (typeof documents)["\n      query fetchTeams {\n        teams {\n          name\n          id\n          created_at\n          teams_users_aggregate {\n            aggregate {\n              count\n            }\n          }\n          teams_users {\n            user_id\n            role\n          }\n        }\n      }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query fetchTeam($teamId: uuid!) {\n        teams_by_pk(id: $teamId) {\n          id\n          name\n          created_at\n          teams_users {\n            user_id\n            created_at\n            user {\n              email\n              created_at\n            }\n          }\n        }\n      }\n      "): (typeof documents)["\n      query fetchTeam($teamId: uuid!) {\n        teams_by_pk(id: $teamId) {\n          id\n          name\n          created_at\n          teams_users {\n            user_id\n            created_at\n            user {\n              email\n              created_at\n            }\n          }\n        }\n      }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query checkMembership($teamId: uuid!, $userId: uuid!) {\n      teams_users(where: {_and: {team_id: {_eq: $teamId}, user_id: {_eq: $userId}}}) {\n        team_id\n      }\n    }"): (typeof documents)["\n    query checkMembership($teamId: uuid!, $userId: uuid!) {\n      teams_users(where: {_and: {team_id: {_eq: $teamId}, user_id: {_eq: $userId}}}) {\n        team_id\n      }\n    }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation leaveTeam($teamId: uuid!) {\n        leaveTeam(teamId: $teamId)\n      }\n      "): (typeof documents)["\n      mutation leaveTeam($teamId: uuid!) {\n        leaveTeam(teamId: $teamId)\n      }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation joinTeam($teamId: uuid!) {\n        joinTeam(teamId: $teamId)\n      }\n      "): (typeof documents)["\n      mutation joinTeam($teamId: uuid!) {\n        joinTeam(teamId: $teamId)\n      }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query fetchThemes($projectId: uuid!) {\n      projects_themes(where: {project_id: {_eq: $projectId}}, order_by: {id: desc}) {\n        id\n        name\n        angles(order_by: {id: desc}) {\n          id\n          name\n        }\n      }\n    }\n    "): (typeof documents)["\n    query fetchThemes($projectId: uuid!) {\n      projects_themes(where: {project_id: {_eq: $projectId}}, order_by: {id: desc}) {\n        id\n        name\n        angles(order_by: {id: desc}) {\n          id\n          name\n        }\n      }\n    }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation updateTheme($id: uuid!, $name: String!) {\n      update_projects_themes_by_pk(pk_columns: {id: $id}, _set: {name: $name}) {\n        id\n      }\n    }\n    "): (typeof documents)["\n    mutation updateTheme($id: uuid!, $name: String!) {\n      update_projects_themes_by_pk(pk_columns: {id: $id}, _set: {name: $name}) {\n        id\n      }\n    }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation deleteTheme($id: uuid!) {\n      delete_projects_themes_by_pk(id: $id) {\n        id\n      }\n    }\n    "): (typeof documents)["\n    mutation deleteTheme($id: uuid!) {\n      delete_projects_themes_by_pk(id: $id) {\n        id\n      }\n    }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation createTheme($name: String!, $projectId: uuid!) {\n      insert_projects_themes_one(object: {name: $name, project_id: $projectId}) {\n        name\n        id\n      }\n    }\n    "): (typeof documents)["\n    mutation createTheme($name: String!, $projectId: uuid!) {\n      insert_projects_themes_one(object: {name: $name, project_id: $projectId}) {\n        name\n        id\n      }\n    }\n    "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;