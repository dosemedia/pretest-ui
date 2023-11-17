/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  json: { input: any; output: any; }
  jsonb: { input: any; output: any; }
  numeric: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
  uuid: { input: any; output: any; }
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Array_Comparison_Exp = {
  /** is the array contained in the given array value */
  _contained_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** does the array contain the given value */
  _contains?: InputMaybe<Array<Scalars['Int']['input']>>;
  _eq?: InputMaybe<Array<Scalars['Int']['input']>>;
  _gt?: InputMaybe<Array<Scalars['Int']['input']>>;
  _gte?: InputMaybe<Array<Scalars['Int']['input']>>;
  _in?: InputMaybe<Array<Array<Scalars['Int']['input']>>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Array<Scalars['Int']['input']>>;
  _lte?: InputMaybe<Array<Scalars['Int']['input']>>;
  _neq?: InputMaybe<Array<Scalars['Int']['input']>>;
  _nin?: InputMaybe<Array<Array<Scalars['Int']['input']>>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  id: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type ProjectOutput = {
  __typename?: 'ProjectOutput';
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  team_id: Scalars['uuid']['output'];
};

export type RegisterOutput = {
  __typename?: 'RegisterOutput';
  id: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Array_Comparison_Exp = {
  /** is the array contained in the given array value */
  _contained_in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the array contain the given value */
  _contains?: InputMaybe<Array<Scalars['String']['input']>>;
  _eq?: InputMaybe<Array<Scalars['String']['input']>>;
  _gt?: InputMaybe<Array<Scalars['String']['input']>>;
  _gte?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Array<Scalars['String']['input']>>;
  _lte?: InputMaybe<Array<Scalars['String']['input']>>;
  _neq?: InputMaybe<Array<Scalars['String']['input']>>;
  _nin?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "contact_form_submissions" */
export type Contact_Form_Submissions = {
  __typename?: 'contact_form_submissions';
  created_at: Scalars['timestamptz']['output'];
  email: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  message: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  user?: Maybe<Users>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "contact_form_submissions" */
export type Contact_Form_Submissions_Aggregate = {
  __typename?: 'contact_form_submissions_aggregate';
  aggregate?: Maybe<Contact_Form_Submissions_Aggregate_Fields>;
  nodes: Array<Contact_Form_Submissions>;
};

/** aggregate fields of "contact_form_submissions" */
export type Contact_Form_Submissions_Aggregate_Fields = {
  __typename?: 'contact_form_submissions_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Contact_Form_Submissions_Max_Fields>;
  min?: Maybe<Contact_Form_Submissions_Min_Fields>;
};


/** aggregate fields of "contact_form_submissions" */
export type Contact_Form_Submissions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contact_Form_Submissions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "contact_form_submissions". All fields are combined with a logical 'AND'. */
export type Contact_Form_Submissions_Bool_Exp = {
  _and?: InputMaybe<Array<Contact_Form_Submissions_Bool_Exp>>;
  _not?: InputMaybe<Contact_Form_Submissions_Bool_Exp>;
  _or?: InputMaybe<Array<Contact_Form_Submissions_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  message?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "contact_form_submissions" */
export enum Contact_Form_Submissions_Constraint {
  /** unique or primary key constraint on columns "id" */
  ContactFormSubmissionsPkey = 'contact_form_submissions_pkey'
}

/** input type for inserting data into table "contact_form_submissions" */
export type Contact_Form_Submissions_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Contact_Form_Submissions_Max_Fields = {
  __typename?: 'contact_form_submissions_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type Contact_Form_Submissions_Min_Fields = {
  __typename?: 'contact_form_submissions_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "contact_form_submissions" */
export type Contact_Form_Submissions_Mutation_Response = {
  __typename?: 'contact_form_submissions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Contact_Form_Submissions>;
};

/** on_conflict condition type for table "contact_form_submissions" */
export type Contact_Form_Submissions_On_Conflict = {
  constraint: Contact_Form_Submissions_Constraint;
  update_columns?: Array<Contact_Form_Submissions_Update_Column>;
  where?: InputMaybe<Contact_Form_Submissions_Bool_Exp>;
};

/** Ordering options when selecting data from "contact_form_submissions". */
export type Contact_Form_Submissions_Order_By = {
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  message?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: contact_form_submissions */
export type Contact_Form_Submissions_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "contact_form_submissions" */
export enum Contact_Form_Submissions_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "contact_form_submissions" */
export type Contact_Form_Submissions_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "contact_form_submissions" */
export type Contact_Form_Submissions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Contact_Form_Submissions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Contact_Form_Submissions_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "contact_form_submissions" */
export enum Contact_Form_Submissions_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export type Contact_Form_Submissions_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Contact_Form_Submissions_Set_Input>;
  /** filter the rows which have to be updated */
  where: Contact_Form_Submissions_Bool_Exp;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "facebook_audiences" */
export type Facebook_Audiences = {
  __typename?: 'facebook_audiences';
  created_at: Scalars['timestamptz']['output'];
  device_platforms: Array<Scalars['String']['output']>;
  facebook_positions: Array<Scalars['String']['output']>;
  genders?: Maybe<Array<Scalars['Int']['output']>>;
  geo_locations: Scalars['jsonb']['output'];
  id: Scalars['uuid']['output'];
  interests?: Maybe<Scalars['jsonb']['output']>;
  max_age?: Maybe<Scalars['numeric']['output']>;
  min_age?: Maybe<Scalars['numeric']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  project_id: Scalars['uuid']['output'];
  /** An object relationship */
  projects_facebook_audiences: Projects;
  publisher_platforms: Array<Scalars['String']['output']>;
  updated_at: Scalars['timestamptz']['output'];
};


/** columns and relationships of "facebook_audiences" */
export type Facebook_AudiencesGeo_LocationsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "facebook_audiences" */
export type Facebook_AudiencesInterestsArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "facebook_audiences" */
export type Facebook_Audiences_Aggregate = {
  __typename?: 'facebook_audiences_aggregate';
  aggregate?: Maybe<Facebook_Audiences_Aggregate_Fields>;
  nodes: Array<Facebook_Audiences>;
};

export type Facebook_Audiences_Aggregate_Bool_Exp = {
  count?: InputMaybe<Facebook_Audiences_Aggregate_Bool_Exp_Count>;
};

export type Facebook_Audiences_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Facebook_Audiences_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Facebook_Audiences_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "facebook_audiences" */
export type Facebook_Audiences_Aggregate_Fields = {
  __typename?: 'facebook_audiences_aggregate_fields';
  avg?: Maybe<Facebook_Audiences_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Facebook_Audiences_Max_Fields>;
  min?: Maybe<Facebook_Audiences_Min_Fields>;
  stddev?: Maybe<Facebook_Audiences_Stddev_Fields>;
  stddev_pop?: Maybe<Facebook_Audiences_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Facebook_Audiences_Stddev_Samp_Fields>;
  sum?: Maybe<Facebook_Audiences_Sum_Fields>;
  var_pop?: Maybe<Facebook_Audiences_Var_Pop_Fields>;
  var_samp?: Maybe<Facebook_Audiences_Var_Samp_Fields>;
  variance?: Maybe<Facebook_Audiences_Variance_Fields>;
};


/** aggregate fields of "facebook_audiences" */
export type Facebook_Audiences_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Facebook_Audiences_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "facebook_audiences" */
export type Facebook_Audiences_Aggregate_Order_By = {
  avg?: InputMaybe<Facebook_Audiences_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Facebook_Audiences_Max_Order_By>;
  min?: InputMaybe<Facebook_Audiences_Min_Order_By>;
  stddev?: InputMaybe<Facebook_Audiences_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Facebook_Audiences_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Facebook_Audiences_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Facebook_Audiences_Sum_Order_By>;
  var_pop?: InputMaybe<Facebook_Audiences_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Facebook_Audiences_Var_Samp_Order_By>;
  variance?: InputMaybe<Facebook_Audiences_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Facebook_Audiences_Append_Input = {
  geo_locations?: InputMaybe<Scalars['jsonb']['input']>;
  interests?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "facebook_audiences" */
export type Facebook_Audiences_Arr_Rel_Insert_Input = {
  data: Array<Facebook_Audiences_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Facebook_Audiences_On_Conflict>;
};

/** aggregate avg on columns */
export type Facebook_Audiences_Avg_Fields = {
  __typename?: 'facebook_audiences_avg_fields';
  max_age?: Maybe<Scalars['Float']['output']>;
  min_age?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "facebook_audiences" */
export type Facebook_Audiences_Avg_Order_By = {
  max_age?: InputMaybe<Order_By>;
  min_age?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "facebook_audiences". All fields are combined with a logical 'AND'. */
export type Facebook_Audiences_Bool_Exp = {
  _and?: InputMaybe<Array<Facebook_Audiences_Bool_Exp>>;
  _not?: InputMaybe<Facebook_Audiences_Bool_Exp>;
  _or?: InputMaybe<Array<Facebook_Audiences_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  device_platforms?: InputMaybe<String_Array_Comparison_Exp>;
  facebook_positions?: InputMaybe<String_Array_Comparison_Exp>;
  genders?: InputMaybe<Int_Array_Comparison_Exp>;
  geo_locations?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  interests?: InputMaybe<Jsonb_Comparison_Exp>;
  max_age?: InputMaybe<Numeric_Comparison_Exp>;
  min_age?: InputMaybe<Numeric_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  project_id?: InputMaybe<Uuid_Comparison_Exp>;
  projects_facebook_audiences?: InputMaybe<Projects_Bool_Exp>;
  publisher_platforms?: InputMaybe<String_Array_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "facebook_audiences" */
export enum Facebook_Audiences_Constraint {
  /** unique or primary key constraint on columns "id" */
  FacebookAudiencesPkey = 'facebook_audiences_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Facebook_Audiences_Delete_At_Path_Input = {
  geo_locations?: InputMaybe<Array<Scalars['String']['input']>>;
  interests?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Facebook_Audiences_Delete_Elem_Input = {
  geo_locations?: InputMaybe<Scalars['Int']['input']>;
  interests?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Facebook_Audiences_Delete_Key_Input = {
  geo_locations?: InputMaybe<Scalars['String']['input']>;
  interests?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing numeric columns in table "facebook_audiences" */
export type Facebook_Audiences_Inc_Input = {
  max_age?: InputMaybe<Scalars['numeric']['input']>;
  min_age?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "facebook_audiences" */
export type Facebook_Audiences_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  device_platforms?: InputMaybe<Array<Scalars['String']['input']>>;
  facebook_positions?: InputMaybe<Array<Scalars['String']['input']>>;
  genders?: InputMaybe<Array<Scalars['Int']['input']>>;
  geo_locations?: InputMaybe<Scalars['jsonb']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  interests?: InputMaybe<Scalars['jsonb']['input']>;
  max_age?: InputMaybe<Scalars['numeric']['input']>;
  min_age?: InputMaybe<Scalars['numeric']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  project_id?: InputMaybe<Scalars['uuid']['input']>;
  projects_facebook_audiences?: InputMaybe<Projects_Obj_Rel_Insert_Input>;
  publisher_platforms?: InputMaybe<Array<Scalars['String']['input']>>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Facebook_Audiences_Max_Fields = {
  __typename?: 'facebook_audiences_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  device_platforms?: Maybe<Array<Scalars['String']['output']>>;
  facebook_positions?: Maybe<Array<Scalars['String']['output']>>;
  genders?: Maybe<Array<Scalars['Int']['output']>>;
  id?: Maybe<Scalars['uuid']['output']>;
  max_age?: Maybe<Scalars['numeric']['output']>;
  min_age?: Maybe<Scalars['numeric']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  project_id?: Maybe<Scalars['uuid']['output']>;
  publisher_platforms?: Maybe<Array<Scalars['String']['output']>>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "facebook_audiences" */
export type Facebook_Audiences_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  device_platforms?: InputMaybe<Order_By>;
  facebook_positions?: InputMaybe<Order_By>;
  genders?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  max_age?: InputMaybe<Order_By>;
  min_age?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  publisher_platforms?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Facebook_Audiences_Min_Fields = {
  __typename?: 'facebook_audiences_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  device_platforms?: Maybe<Array<Scalars['String']['output']>>;
  facebook_positions?: Maybe<Array<Scalars['String']['output']>>;
  genders?: Maybe<Array<Scalars['Int']['output']>>;
  id?: Maybe<Scalars['uuid']['output']>;
  max_age?: Maybe<Scalars['numeric']['output']>;
  min_age?: Maybe<Scalars['numeric']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  project_id?: Maybe<Scalars['uuid']['output']>;
  publisher_platforms?: Maybe<Array<Scalars['String']['output']>>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "facebook_audiences" */
export type Facebook_Audiences_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  device_platforms?: InputMaybe<Order_By>;
  facebook_positions?: InputMaybe<Order_By>;
  genders?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  max_age?: InputMaybe<Order_By>;
  min_age?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  publisher_platforms?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "facebook_audiences" */
export type Facebook_Audiences_Mutation_Response = {
  __typename?: 'facebook_audiences_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Facebook_Audiences>;
};

/** on_conflict condition type for table "facebook_audiences" */
export type Facebook_Audiences_On_Conflict = {
  constraint: Facebook_Audiences_Constraint;
  update_columns?: Array<Facebook_Audiences_Update_Column>;
  where?: InputMaybe<Facebook_Audiences_Bool_Exp>;
};

/** Ordering options when selecting data from "facebook_audiences". */
export type Facebook_Audiences_Order_By = {
  created_at?: InputMaybe<Order_By>;
  device_platforms?: InputMaybe<Order_By>;
  facebook_positions?: InputMaybe<Order_By>;
  genders?: InputMaybe<Order_By>;
  geo_locations?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  interests?: InputMaybe<Order_By>;
  max_age?: InputMaybe<Order_By>;
  min_age?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  projects_facebook_audiences?: InputMaybe<Projects_Order_By>;
  publisher_platforms?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: facebook_audiences */
export type Facebook_Audiences_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Facebook_Audiences_Prepend_Input = {
  geo_locations?: InputMaybe<Scalars['jsonb']['input']>;
  interests?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "facebook_audiences" */
export enum Facebook_Audiences_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DevicePlatforms = 'device_platforms',
  /** column name */
  FacebookPositions = 'facebook_positions',
  /** column name */
  Genders = 'genders',
  /** column name */
  GeoLocations = 'geo_locations',
  /** column name */
  Id = 'id',
  /** column name */
  Interests = 'interests',
  /** column name */
  MaxAge = 'max_age',
  /** column name */
  MinAge = 'min_age',
  /** column name */
  Name = 'name',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  PublisherPlatforms = 'publisher_platforms',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "facebook_audiences" */
export type Facebook_Audiences_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  device_platforms?: InputMaybe<Array<Scalars['String']['input']>>;
  facebook_positions?: InputMaybe<Array<Scalars['String']['input']>>;
  genders?: InputMaybe<Array<Scalars['Int']['input']>>;
  geo_locations?: InputMaybe<Scalars['jsonb']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  interests?: InputMaybe<Scalars['jsonb']['input']>;
  max_age?: InputMaybe<Scalars['numeric']['input']>;
  min_age?: InputMaybe<Scalars['numeric']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  project_id?: InputMaybe<Scalars['uuid']['input']>;
  publisher_platforms?: InputMaybe<Array<Scalars['String']['input']>>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Facebook_Audiences_Stddev_Fields = {
  __typename?: 'facebook_audiences_stddev_fields';
  max_age?: Maybe<Scalars['Float']['output']>;
  min_age?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "facebook_audiences" */
export type Facebook_Audiences_Stddev_Order_By = {
  max_age?: InputMaybe<Order_By>;
  min_age?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Facebook_Audiences_Stddev_Pop_Fields = {
  __typename?: 'facebook_audiences_stddev_pop_fields';
  max_age?: Maybe<Scalars['Float']['output']>;
  min_age?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "facebook_audiences" */
export type Facebook_Audiences_Stddev_Pop_Order_By = {
  max_age?: InputMaybe<Order_By>;
  min_age?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Facebook_Audiences_Stddev_Samp_Fields = {
  __typename?: 'facebook_audiences_stddev_samp_fields';
  max_age?: Maybe<Scalars['Float']['output']>;
  min_age?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "facebook_audiences" */
export type Facebook_Audiences_Stddev_Samp_Order_By = {
  max_age?: InputMaybe<Order_By>;
  min_age?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "facebook_audiences" */
export type Facebook_Audiences_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Facebook_Audiences_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Facebook_Audiences_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  device_platforms?: InputMaybe<Array<Scalars['String']['input']>>;
  facebook_positions?: InputMaybe<Array<Scalars['String']['input']>>;
  genders?: InputMaybe<Array<Scalars['Int']['input']>>;
  geo_locations?: InputMaybe<Scalars['jsonb']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  interests?: InputMaybe<Scalars['jsonb']['input']>;
  max_age?: InputMaybe<Scalars['numeric']['input']>;
  min_age?: InputMaybe<Scalars['numeric']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  project_id?: InputMaybe<Scalars['uuid']['input']>;
  publisher_platforms?: InputMaybe<Array<Scalars['String']['input']>>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Facebook_Audiences_Sum_Fields = {
  __typename?: 'facebook_audiences_sum_fields';
  max_age?: Maybe<Scalars['numeric']['output']>;
  min_age?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "facebook_audiences" */
export type Facebook_Audiences_Sum_Order_By = {
  max_age?: InputMaybe<Order_By>;
  min_age?: InputMaybe<Order_By>;
};

/** update columns of table "facebook_audiences" */
export enum Facebook_Audiences_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DevicePlatforms = 'device_platforms',
  /** column name */
  FacebookPositions = 'facebook_positions',
  /** column name */
  Genders = 'genders',
  /** column name */
  GeoLocations = 'geo_locations',
  /** column name */
  Id = 'id',
  /** column name */
  Interests = 'interests',
  /** column name */
  MaxAge = 'max_age',
  /** column name */
  MinAge = 'min_age',
  /** column name */
  Name = 'name',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  PublisherPlatforms = 'publisher_platforms',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Facebook_Audiences_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Facebook_Audiences_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Facebook_Audiences_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Facebook_Audiences_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Facebook_Audiences_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Facebook_Audiences_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Facebook_Audiences_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Facebook_Audiences_Set_Input>;
  /** filter the rows which have to be updated */
  where: Facebook_Audiences_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Facebook_Audiences_Var_Pop_Fields = {
  __typename?: 'facebook_audiences_var_pop_fields';
  max_age?: Maybe<Scalars['Float']['output']>;
  min_age?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "facebook_audiences" */
export type Facebook_Audiences_Var_Pop_Order_By = {
  max_age?: InputMaybe<Order_By>;
  min_age?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Facebook_Audiences_Var_Samp_Fields = {
  __typename?: 'facebook_audiences_var_samp_fields';
  max_age?: Maybe<Scalars['Float']['output']>;
  min_age?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "facebook_audiences" */
export type Facebook_Audiences_Var_Samp_Order_By = {
  max_age?: InputMaybe<Order_By>;
  min_age?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Facebook_Audiences_Variance_Fields = {
  __typename?: 'facebook_audiences_variance_fields';
  max_age?: Maybe<Scalars['Float']['output']>;
  min_age?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "facebook_audiences" */
export type Facebook_Audiences_Variance_Order_By = {
  max_age?: InputMaybe<Order_By>;
  min_age?: InputMaybe<Order_By>;
};

/** columns and relationships of "facebook_creative_templates" */
export type Facebook_Creative_Templates = {
  __typename?: 'facebook_creative_templates';
  created_at: Scalars['timestamptz']['output'];
  creatomate_template_id: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  enabled: Scalars['Boolean']['output'];
  /** An array relationship */
  facebook_creatives: Array<Facebook_Creatives>;
  /** An aggregate relationship */
  facebook_creatives_aggregate: Facebook_Creatives_Aggregate;
  id: Scalars['uuid']['output'];
  json_schema: Scalars['jsonb']['output'];
  name: Scalars['String']['output'];
  ui_schema?: Maybe<Scalars['jsonb']['output']>;
  updated_at: Scalars['timestamptz']['output'];
};


/** columns and relationships of "facebook_creative_templates" */
export type Facebook_Creative_TemplatesFacebook_CreativesArgs = {
  distinct_on?: InputMaybe<Array<Facebook_Creatives_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Facebook_Creatives_Order_By>>;
  where?: InputMaybe<Facebook_Creatives_Bool_Exp>;
};


/** columns and relationships of "facebook_creative_templates" */
export type Facebook_Creative_TemplatesFacebook_Creatives_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Facebook_Creatives_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Facebook_Creatives_Order_By>>;
  where?: InputMaybe<Facebook_Creatives_Bool_Exp>;
};


/** columns and relationships of "facebook_creative_templates" */
export type Facebook_Creative_TemplatesJson_SchemaArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "facebook_creative_templates" */
export type Facebook_Creative_TemplatesUi_SchemaArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "facebook_creative_templates" */
export type Facebook_Creative_Templates_Aggregate = {
  __typename?: 'facebook_creative_templates_aggregate';
  aggregate?: Maybe<Facebook_Creative_Templates_Aggregate_Fields>;
  nodes: Array<Facebook_Creative_Templates>;
};

/** aggregate fields of "facebook_creative_templates" */
export type Facebook_Creative_Templates_Aggregate_Fields = {
  __typename?: 'facebook_creative_templates_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Facebook_Creative_Templates_Max_Fields>;
  min?: Maybe<Facebook_Creative_Templates_Min_Fields>;
};


/** aggregate fields of "facebook_creative_templates" */
export type Facebook_Creative_Templates_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Facebook_Creative_Templates_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Facebook_Creative_Templates_Append_Input = {
  json_schema?: InputMaybe<Scalars['jsonb']['input']>;
  ui_schema?: InputMaybe<Scalars['jsonb']['input']>;
};

/** Boolean expression to filter rows from the table "facebook_creative_templates". All fields are combined with a logical 'AND'. */
export type Facebook_Creative_Templates_Bool_Exp = {
  _and?: InputMaybe<Array<Facebook_Creative_Templates_Bool_Exp>>;
  _not?: InputMaybe<Facebook_Creative_Templates_Bool_Exp>;
  _or?: InputMaybe<Array<Facebook_Creative_Templates_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  creatomate_template_id?: InputMaybe<String_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  enabled?: InputMaybe<Boolean_Comparison_Exp>;
  facebook_creatives?: InputMaybe<Facebook_Creatives_Bool_Exp>;
  facebook_creatives_aggregate?: InputMaybe<Facebook_Creatives_Aggregate_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  json_schema?: InputMaybe<Jsonb_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  ui_schema?: InputMaybe<Jsonb_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "facebook_creative_templates" */
export enum Facebook_Creative_Templates_Constraint {
  /** unique or primary key constraint on columns "id" */
  FacebookCreativeTemplatesPkey = 'facebook_creative_templates_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Facebook_Creative_Templates_Delete_At_Path_Input = {
  json_schema?: InputMaybe<Array<Scalars['String']['input']>>;
  ui_schema?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Facebook_Creative_Templates_Delete_Elem_Input = {
  json_schema?: InputMaybe<Scalars['Int']['input']>;
  ui_schema?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Facebook_Creative_Templates_Delete_Key_Input = {
  json_schema?: InputMaybe<Scalars['String']['input']>;
  ui_schema?: InputMaybe<Scalars['String']['input']>;
};

/** input type for inserting data into table "facebook_creative_templates" */
export type Facebook_Creative_Templates_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  creatomate_template_id?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  facebook_creatives?: InputMaybe<Facebook_Creatives_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  json_schema?: InputMaybe<Scalars['jsonb']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ui_schema?: InputMaybe<Scalars['jsonb']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Facebook_Creative_Templates_Max_Fields = {
  __typename?: 'facebook_creative_templates_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  creatomate_template_id?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Facebook_Creative_Templates_Min_Fields = {
  __typename?: 'facebook_creative_templates_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  creatomate_template_id?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "facebook_creative_templates" */
export type Facebook_Creative_Templates_Mutation_Response = {
  __typename?: 'facebook_creative_templates_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Facebook_Creative_Templates>;
};

/** input type for inserting object relation for remote table "facebook_creative_templates" */
export type Facebook_Creative_Templates_Obj_Rel_Insert_Input = {
  data: Facebook_Creative_Templates_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Facebook_Creative_Templates_On_Conflict>;
};

/** on_conflict condition type for table "facebook_creative_templates" */
export type Facebook_Creative_Templates_On_Conflict = {
  constraint: Facebook_Creative_Templates_Constraint;
  update_columns?: Array<Facebook_Creative_Templates_Update_Column>;
  where?: InputMaybe<Facebook_Creative_Templates_Bool_Exp>;
};

/** Ordering options when selecting data from "facebook_creative_templates". */
export type Facebook_Creative_Templates_Order_By = {
  created_at?: InputMaybe<Order_By>;
  creatomate_template_id?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  enabled?: InputMaybe<Order_By>;
  facebook_creatives_aggregate?: InputMaybe<Facebook_Creatives_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  json_schema?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  ui_schema?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: facebook_creative_templates */
export type Facebook_Creative_Templates_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Facebook_Creative_Templates_Prepend_Input = {
  json_schema?: InputMaybe<Scalars['jsonb']['input']>;
  ui_schema?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "facebook_creative_templates" */
export enum Facebook_Creative_Templates_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatomateTemplateId = 'creatomate_template_id',
  /** column name */
  Description = 'description',
  /** column name */
  Enabled = 'enabled',
  /** column name */
  Id = 'id',
  /** column name */
  JsonSchema = 'json_schema',
  /** column name */
  Name = 'name',
  /** column name */
  UiSchema = 'ui_schema',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "facebook_creative_templates" */
export type Facebook_Creative_Templates_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  creatomate_template_id?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  json_schema?: InputMaybe<Scalars['jsonb']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ui_schema?: InputMaybe<Scalars['jsonb']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "facebook_creative_templates" */
export type Facebook_Creative_Templates_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Facebook_Creative_Templates_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Facebook_Creative_Templates_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  creatomate_template_id?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  json_schema?: InputMaybe<Scalars['jsonb']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ui_schema?: InputMaybe<Scalars['jsonb']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "facebook_creative_templates" */
export enum Facebook_Creative_Templates_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatomateTemplateId = 'creatomate_template_id',
  /** column name */
  Description = 'description',
  /** column name */
  Enabled = 'enabled',
  /** column name */
  Id = 'id',
  /** column name */
  JsonSchema = 'json_schema',
  /** column name */
  Name = 'name',
  /** column name */
  UiSchema = 'ui_schema',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Facebook_Creative_Templates_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Facebook_Creative_Templates_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Facebook_Creative_Templates_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Facebook_Creative_Templates_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Facebook_Creative_Templates_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Facebook_Creative_Templates_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Facebook_Creative_Templates_Set_Input>;
  /** filter the rows which have to be updated */
  where: Facebook_Creative_Templates_Bool_Exp;
};

/** columns and relationships of "facebook_creatives" */
export type Facebook_Creatives = {
  __typename?: 'facebook_creatives';
  created_at: Scalars['timestamptz']['output'];
  data?: Maybe<Scalars['jsonb']['output']>;
  /** An object relationship */
  facebook_creative_template: Facebook_Creative_Templates;
  id: Scalars['uuid']['output'];
  /** An object relationship */
  project: Projects;
  project_id: Scalars['uuid']['output'];
  template_id: Scalars['uuid']['output'];
  updated_at: Scalars['timestamptz']['output'];
};


/** columns and relationships of "facebook_creatives" */
export type Facebook_CreativesDataArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "facebook_creatives" */
export type Facebook_Creatives_Aggregate = {
  __typename?: 'facebook_creatives_aggregate';
  aggregate?: Maybe<Facebook_Creatives_Aggregate_Fields>;
  nodes: Array<Facebook_Creatives>;
};

export type Facebook_Creatives_Aggregate_Bool_Exp = {
  count?: InputMaybe<Facebook_Creatives_Aggregate_Bool_Exp_Count>;
};

export type Facebook_Creatives_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Facebook_Creatives_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Facebook_Creatives_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "facebook_creatives" */
export type Facebook_Creatives_Aggregate_Fields = {
  __typename?: 'facebook_creatives_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Facebook_Creatives_Max_Fields>;
  min?: Maybe<Facebook_Creatives_Min_Fields>;
};


/** aggregate fields of "facebook_creatives" */
export type Facebook_Creatives_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Facebook_Creatives_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "facebook_creatives" */
export type Facebook_Creatives_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Facebook_Creatives_Max_Order_By>;
  min?: InputMaybe<Facebook_Creatives_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Facebook_Creatives_Append_Input = {
  data?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "facebook_creatives" */
export type Facebook_Creatives_Arr_Rel_Insert_Input = {
  data: Array<Facebook_Creatives_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Facebook_Creatives_On_Conflict>;
};

/** Boolean expression to filter rows from the table "facebook_creatives". All fields are combined with a logical 'AND'. */
export type Facebook_Creatives_Bool_Exp = {
  _and?: InputMaybe<Array<Facebook_Creatives_Bool_Exp>>;
  _not?: InputMaybe<Facebook_Creatives_Bool_Exp>;
  _or?: InputMaybe<Array<Facebook_Creatives_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  data?: InputMaybe<Jsonb_Comparison_Exp>;
  facebook_creative_template?: InputMaybe<Facebook_Creative_Templates_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  project?: InputMaybe<Projects_Bool_Exp>;
  project_id?: InputMaybe<Uuid_Comparison_Exp>;
  template_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "facebook_creatives" */
export enum Facebook_Creatives_Constraint {
  /** unique or primary key constraint on columns "id" */
  FacebookCreativesPkey = 'facebook_creatives_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Facebook_Creatives_Delete_At_Path_Input = {
  data?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Facebook_Creatives_Delete_Elem_Input = {
  data?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Facebook_Creatives_Delete_Key_Input = {
  data?: InputMaybe<Scalars['String']['input']>;
};

/** input type for inserting data into table "facebook_creatives" */
export type Facebook_Creatives_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  data?: InputMaybe<Scalars['jsonb']['input']>;
  facebook_creative_template?: InputMaybe<Facebook_Creative_Templates_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  project?: InputMaybe<Projects_Obj_Rel_Insert_Input>;
  project_id?: InputMaybe<Scalars['uuid']['input']>;
  template_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Facebook_Creatives_Max_Fields = {
  __typename?: 'facebook_creatives_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  project_id?: Maybe<Scalars['uuid']['output']>;
  template_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "facebook_creatives" */
export type Facebook_Creatives_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  template_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Facebook_Creatives_Min_Fields = {
  __typename?: 'facebook_creatives_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  project_id?: Maybe<Scalars['uuid']['output']>;
  template_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "facebook_creatives" */
export type Facebook_Creatives_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  template_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "facebook_creatives" */
export type Facebook_Creatives_Mutation_Response = {
  __typename?: 'facebook_creatives_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Facebook_Creatives>;
};

/** on_conflict condition type for table "facebook_creatives" */
export type Facebook_Creatives_On_Conflict = {
  constraint: Facebook_Creatives_Constraint;
  update_columns?: Array<Facebook_Creatives_Update_Column>;
  where?: InputMaybe<Facebook_Creatives_Bool_Exp>;
};

/** Ordering options when selecting data from "facebook_creatives". */
export type Facebook_Creatives_Order_By = {
  created_at?: InputMaybe<Order_By>;
  data?: InputMaybe<Order_By>;
  facebook_creative_template?: InputMaybe<Facebook_Creative_Templates_Order_By>;
  id?: InputMaybe<Order_By>;
  project?: InputMaybe<Projects_Order_By>;
  project_id?: InputMaybe<Order_By>;
  template_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: facebook_creatives */
export type Facebook_Creatives_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Facebook_Creatives_Prepend_Input = {
  data?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "facebook_creatives" */
export enum Facebook_Creatives_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Data = 'data',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  TemplateId = 'template_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "facebook_creatives" */
export type Facebook_Creatives_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  data?: InputMaybe<Scalars['jsonb']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  project_id?: InputMaybe<Scalars['uuid']['input']>;
  template_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "facebook_creatives" */
export type Facebook_Creatives_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Facebook_Creatives_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Facebook_Creatives_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  data?: InputMaybe<Scalars['jsonb']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  project_id?: InputMaybe<Scalars['uuid']['input']>;
  template_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "facebook_creatives" */
export enum Facebook_Creatives_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Data = 'data',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  TemplateId = 'template_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Facebook_Creatives_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Facebook_Creatives_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Facebook_Creatives_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Facebook_Creatives_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Facebook_Creatives_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Facebook_Creatives_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Facebook_Creatives_Set_Input>;
  /** filter the rows which have to be updated */
  where: Facebook_Creatives_Bool_Exp;
};

/** Invitations from teams to users */
export type Invitations = {
  __typename?: 'invitations';
  created_at: Scalars['timestamptz']['output'];
  email: Scalars['String']['output'];
  /** An object relationship */
  team: Teams;
  team_id: Scalars['uuid']['output'];
};

/** aggregated selection of "invitations" */
export type Invitations_Aggregate = {
  __typename?: 'invitations_aggregate';
  aggregate?: Maybe<Invitations_Aggregate_Fields>;
  nodes: Array<Invitations>;
};

export type Invitations_Aggregate_Bool_Exp = {
  count?: InputMaybe<Invitations_Aggregate_Bool_Exp_Count>;
};

export type Invitations_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Invitations_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Invitations_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "invitations" */
export type Invitations_Aggregate_Fields = {
  __typename?: 'invitations_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Invitations_Max_Fields>;
  min?: Maybe<Invitations_Min_Fields>;
};


/** aggregate fields of "invitations" */
export type Invitations_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Invitations_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "invitations" */
export type Invitations_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Invitations_Max_Order_By>;
  min?: InputMaybe<Invitations_Min_Order_By>;
};

/** input type for inserting array relation for remote table "invitations" */
export type Invitations_Arr_Rel_Insert_Input = {
  data: Array<Invitations_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Invitations_On_Conflict>;
};

/** Boolean expression to filter rows from the table "invitations". All fields are combined with a logical 'AND'. */
export type Invitations_Bool_Exp = {
  _and?: InputMaybe<Array<Invitations_Bool_Exp>>;
  _not?: InputMaybe<Invitations_Bool_Exp>;
  _or?: InputMaybe<Array<Invitations_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  team?: InputMaybe<Teams_Bool_Exp>;
  team_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "invitations" */
export enum Invitations_Constraint {
  /** unique or primary key constraint on columns "team_id", "email" */
  InvitationsPkey = 'invitations_pkey'
}

/** input type for inserting data into table "invitations" */
export type Invitations_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  team?: InputMaybe<Teams_Obj_Rel_Insert_Input>;
  team_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Invitations_Max_Fields = {
  __typename?: 'invitations_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  team_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "invitations" */
export type Invitations_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Invitations_Min_Fields = {
  __typename?: 'invitations_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  team_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "invitations" */
export type Invitations_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "invitations" */
export type Invitations_Mutation_Response = {
  __typename?: 'invitations_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Invitations>;
};

/** on_conflict condition type for table "invitations" */
export type Invitations_On_Conflict = {
  constraint: Invitations_Constraint;
  update_columns?: Array<Invitations_Update_Column>;
  where?: InputMaybe<Invitations_Bool_Exp>;
};

/** Ordering options when selecting data from "invitations". */
export type Invitations_Order_By = {
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  team?: InputMaybe<Teams_Order_By>;
  team_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: invitations */
export type Invitations_Pk_Columns_Input = {
  email: Scalars['String']['input'];
  team_id: Scalars['uuid']['input'];
};

/** select columns of table "invitations" */
export enum Invitations_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  TeamId = 'team_id'
}

/** input type for updating data in table "invitations" */
export type Invitations_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  team_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "invitations" */
export type Invitations_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Invitations_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Invitations_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  team_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "invitations" */
export enum Invitations_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  TeamId = 'team_id'
}

export type Invitations_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Invitations_Set_Input>;
  /** filter the rows which have to be updated */
  where: Invitations_Bool_Exp;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  changeEmail: Scalars['Boolean']['output'];
  changePassword: Scalars['Boolean']['output'];
  /** Create a new project. */
  createProject?: Maybe<ProjectOutput>;
  createTeam: Scalars['Boolean']['output'];
  /** delete data from the table: "contact_form_submissions" */
  delete_contact_form_submissions?: Maybe<Contact_Form_Submissions_Mutation_Response>;
  /** delete single row from the table: "contact_form_submissions" */
  delete_contact_form_submissions_by_pk?: Maybe<Contact_Form_Submissions>;
  /** delete data from the table: "facebook_audiences" */
  delete_facebook_audiences?: Maybe<Facebook_Audiences_Mutation_Response>;
  /** delete single row from the table: "facebook_audiences" */
  delete_facebook_audiences_by_pk?: Maybe<Facebook_Audiences>;
  /** delete data from the table: "facebook_creative_templates" */
  delete_facebook_creative_templates?: Maybe<Facebook_Creative_Templates_Mutation_Response>;
  /** delete single row from the table: "facebook_creative_templates" */
  delete_facebook_creative_templates_by_pk?: Maybe<Facebook_Creative_Templates>;
  /** delete data from the table: "facebook_creatives" */
  delete_facebook_creatives?: Maybe<Facebook_Creatives_Mutation_Response>;
  /** delete single row from the table: "facebook_creatives" */
  delete_facebook_creatives_by_pk?: Maybe<Facebook_Creatives>;
  /** delete data from the table: "invitations" */
  delete_invitations?: Maybe<Invitations_Mutation_Response>;
  /** delete single row from the table: "invitations" */
  delete_invitations_by_pk?: Maybe<Invitations>;
  /** delete data from the table: "projects" */
  delete_projects?: Maybe<Projects_Mutation_Response>;
  /** delete single row from the table: "projects" */
  delete_projects_by_pk?: Maybe<Projects>;
  /** delete data from the table: "projects_themes" */
  delete_projects_themes?: Maybe<Projects_Themes_Mutation_Response>;
  /** delete single row from the table: "projects_themes" */
  delete_projects_themes_by_pk?: Maybe<Projects_Themes>;
  /** delete data from the table: "teams" */
  delete_teams?: Maybe<Teams_Mutation_Response>;
  /** delete single row from the table: "teams" */
  delete_teams_by_pk?: Maybe<Teams>;
  /** delete data from the table: "teams_projects" */
  delete_teams_projects?: Maybe<Teams_Projects_Mutation_Response>;
  /** delete single row from the table: "teams_projects" */
  delete_teams_projects_by_pk?: Maybe<Teams_Projects>;
  /** delete data from the table: "teams_roles" */
  delete_teams_roles?: Maybe<Teams_Roles_Mutation_Response>;
  /** delete single row from the table: "teams_roles" */
  delete_teams_roles_by_pk?: Maybe<Teams_Roles>;
  /** delete data from the table: "teams_users" */
  delete_teams_users?: Maybe<Teams_Users_Mutation_Response>;
  /** delete single row from the table: "teams_users" */
  delete_teams_users_by_pk?: Maybe<Teams_Users>;
  /** delete data from the table: "themes_angles" */
  delete_themes_angles?: Maybe<Themes_Angles_Mutation_Response>;
  /** delete single row from the table: "themes_angles" */
  delete_themes_angles_by_pk?: Maybe<Themes_Angles>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  destroyUser: Scalars['Boolean']['output'];
  facebookAPIGet: Scalars['json']['output'];
  /** insert data into the table: "contact_form_submissions" */
  insert_contact_form_submissions?: Maybe<Contact_Form_Submissions_Mutation_Response>;
  /** insert a single row into the table: "contact_form_submissions" */
  insert_contact_form_submissions_one?: Maybe<Contact_Form_Submissions>;
  /** insert data into the table: "facebook_audiences" */
  insert_facebook_audiences?: Maybe<Facebook_Audiences_Mutation_Response>;
  /** insert a single row into the table: "facebook_audiences" */
  insert_facebook_audiences_one?: Maybe<Facebook_Audiences>;
  /** insert data into the table: "facebook_creative_templates" */
  insert_facebook_creative_templates?: Maybe<Facebook_Creative_Templates_Mutation_Response>;
  /** insert a single row into the table: "facebook_creative_templates" */
  insert_facebook_creative_templates_one?: Maybe<Facebook_Creative_Templates>;
  /** insert data into the table: "facebook_creatives" */
  insert_facebook_creatives?: Maybe<Facebook_Creatives_Mutation_Response>;
  /** insert a single row into the table: "facebook_creatives" */
  insert_facebook_creatives_one?: Maybe<Facebook_Creatives>;
  /** insert data into the table: "invitations" */
  insert_invitations?: Maybe<Invitations_Mutation_Response>;
  /** insert a single row into the table: "invitations" */
  insert_invitations_one?: Maybe<Invitations>;
  /** insert data into the table: "projects" */
  insert_projects?: Maybe<Projects_Mutation_Response>;
  /** insert a single row into the table: "projects" */
  insert_projects_one?: Maybe<Projects>;
  /** insert data into the table: "projects_themes" */
  insert_projects_themes?: Maybe<Projects_Themes_Mutation_Response>;
  /** insert a single row into the table: "projects_themes" */
  insert_projects_themes_one?: Maybe<Projects_Themes>;
  /** insert data into the table: "teams" */
  insert_teams?: Maybe<Teams_Mutation_Response>;
  /** insert a single row into the table: "teams" */
  insert_teams_one?: Maybe<Teams>;
  /** insert data into the table: "teams_projects" */
  insert_teams_projects?: Maybe<Teams_Projects_Mutation_Response>;
  /** insert a single row into the table: "teams_projects" */
  insert_teams_projects_one?: Maybe<Teams_Projects>;
  /** insert data into the table: "teams_roles" */
  insert_teams_roles?: Maybe<Teams_Roles_Mutation_Response>;
  /** insert a single row into the table: "teams_roles" */
  insert_teams_roles_one?: Maybe<Teams_Roles>;
  /** insert data into the table: "teams_users" */
  insert_teams_users?: Maybe<Teams_Users_Mutation_Response>;
  /** insert a single row into the table: "teams_users" */
  insert_teams_users_one?: Maybe<Teams_Users>;
  /** insert data into the table: "themes_angles" */
  insert_themes_angles?: Maybe<Themes_Angles_Mutation_Response>;
  /** insert a single row into the table: "themes_angles" */
  insert_themes_angles_one?: Maybe<Themes_Angles>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** Note that an invitation must exist with the user's email before they can join the team. */
  joinTeam: Scalars['Boolean']['output'];
  leaveTeam: Scalars['Boolean']['output'];
  login?: Maybe<LoginOutput>;
  /** Create new user. */
  register?: Maybe<RegisterOutput>;
  resendVerificationEmail: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  sendPasswordResetEmail: Scalars['Boolean']['output'];
  /** update data of the table: "contact_form_submissions" */
  update_contact_form_submissions?: Maybe<Contact_Form_Submissions_Mutation_Response>;
  /** update single row of the table: "contact_form_submissions" */
  update_contact_form_submissions_by_pk?: Maybe<Contact_Form_Submissions>;
  /** update multiples rows of table: "contact_form_submissions" */
  update_contact_form_submissions_many?: Maybe<Array<Maybe<Contact_Form_Submissions_Mutation_Response>>>;
  /** update data of the table: "facebook_audiences" */
  update_facebook_audiences?: Maybe<Facebook_Audiences_Mutation_Response>;
  /** update single row of the table: "facebook_audiences" */
  update_facebook_audiences_by_pk?: Maybe<Facebook_Audiences>;
  /** update multiples rows of table: "facebook_audiences" */
  update_facebook_audiences_many?: Maybe<Array<Maybe<Facebook_Audiences_Mutation_Response>>>;
  /** update data of the table: "facebook_creative_templates" */
  update_facebook_creative_templates?: Maybe<Facebook_Creative_Templates_Mutation_Response>;
  /** update single row of the table: "facebook_creative_templates" */
  update_facebook_creative_templates_by_pk?: Maybe<Facebook_Creative_Templates>;
  /** update multiples rows of table: "facebook_creative_templates" */
  update_facebook_creative_templates_many?: Maybe<Array<Maybe<Facebook_Creative_Templates_Mutation_Response>>>;
  /** update data of the table: "facebook_creatives" */
  update_facebook_creatives?: Maybe<Facebook_Creatives_Mutation_Response>;
  /** update single row of the table: "facebook_creatives" */
  update_facebook_creatives_by_pk?: Maybe<Facebook_Creatives>;
  /** update multiples rows of table: "facebook_creatives" */
  update_facebook_creatives_many?: Maybe<Array<Maybe<Facebook_Creatives_Mutation_Response>>>;
  /** update data of the table: "invitations" */
  update_invitations?: Maybe<Invitations_Mutation_Response>;
  /** update single row of the table: "invitations" */
  update_invitations_by_pk?: Maybe<Invitations>;
  /** update multiples rows of table: "invitations" */
  update_invitations_many?: Maybe<Array<Maybe<Invitations_Mutation_Response>>>;
  /** update data of the table: "projects" */
  update_projects?: Maybe<Projects_Mutation_Response>;
  /** update single row of the table: "projects" */
  update_projects_by_pk?: Maybe<Projects>;
  /** update multiples rows of table: "projects" */
  update_projects_many?: Maybe<Array<Maybe<Projects_Mutation_Response>>>;
  /** update data of the table: "projects_themes" */
  update_projects_themes?: Maybe<Projects_Themes_Mutation_Response>;
  /** update single row of the table: "projects_themes" */
  update_projects_themes_by_pk?: Maybe<Projects_Themes>;
  /** update multiples rows of table: "projects_themes" */
  update_projects_themes_many?: Maybe<Array<Maybe<Projects_Themes_Mutation_Response>>>;
  /** update data of the table: "teams" */
  update_teams?: Maybe<Teams_Mutation_Response>;
  /** update single row of the table: "teams" */
  update_teams_by_pk?: Maybe<Teams>;
  /** update multiples rows of table: "teams" */
  update_teams_many?: Maybe<Array<Maybe<Teams_Mutation_Response>>>;
  /** update data of the table: "teams_projects" */
  update_teams_projects?: Maybe<Teams_Projects_Mutation_Response>;
  /** update single row of the table: "teams_projects" */
  update_teams_projects_by_pk?: Maybe<Teams_Projects>;
  /** update multiples rows of table: "teams_projects" */
  update_teams_projects_many?: Maybe<Array<Maybe<Teams_Projects_Mutation_Response>>>;
  /** update data of the table: "teams_roles" */
  update_teams_roles?: Maybe<Teams_Roles_Mutation_Response>;
  /** update single row of the table: "teams_roles" */
  update_teams_roles_by_pk?: Maybe<Teams_Roles>;
  /** update multiples rows of table: "teams_roles" */
  update_teams_roles_many?: Maybe<Array<Maybe<Teams_Roles_Mutation_Response>>>;
  /** update data of the table: "teams_users" */
  update_teams_users?: Maybe<Teams_Users_Mutation_Response>;
  /** update single row of the table: "teams_users" */
  update_teams_users_by_pk?: Maybe<Teams_Users>;
  /** update multiples rows of table: "teams_users" */
  update_teams_users_many?: Maybe<Array<Maybe<Teams_Users_Mutation_Response>>>;
  /** update data of the table: "themes_angles" */
  update_themes_angles?: Maybe<Themes_Angles_Mutation_Response>;
  /** update single row of the table: "themes_angles" */
  update_themes_angles_by_pk?: Maybe<Themes_Angles>;
  /** update multiples rows of table: "themes_angles" */
  update_themes_angles_many?: Maybe<Array<Maybe<Themes_Angles_Mutation_Response>>>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update multiples rows of table: "users" */
  update_users_many?: Maybe<Array<Maybe<Users_Mutation_Response>>>;
  verifyEmail: Scalars['Boolean']['output'];
};


/** mutation root */
export type Mutation_RootChangeEmailArgs = {
  newEmail: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootCreateProjectArgs = {
  name: Scalars['String']['input'];
  team_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootCreateTeamArgs = {
  name: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Contact_Form_SubmissionsArgs = {
  where: Contact_Form_Submissions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contact_Form_Submissions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Facebook_AudiencesArgs = {
  where: Facebook_Audiences_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Facebook_Audiences_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Facebook_Creative_TemplatesArgs = {
  where: Facebook_Creative_Templates_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Facebook_Creative_Templates_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Facebook_CreativesArgs = {
  where: Facebook_Creatives_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Facebook_Creatives_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_InvitationsArgs = {
  where: Invitations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Invitations_By_PkArgs = {
  email: Scalars['String']['input'];
  team_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_ProjectsArgs = {
  where: Projects_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Projects_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Projects_ThemesArgs = {
  where: Projects_Themes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Projects_Themes_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_TeamsArgs = {
  where: Teams_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Teams_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Teams_ProjectsArgs = {
  where: Teams_Projects_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Teams_Projects_By_PkArgs = {
  project_id: Scalars['uuid']['input'];
  team_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Teams_RolesArgs = {
  where: Teams_Roles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Teams_Roles_By_PkArgs = {
  role: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Teams_UsersArgs = {
  where: Teams_Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Teams_Users_By_PkArgs = {
  team_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Themes_AnglesArgs = {
  where: Themes_Angles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Themes_Angles_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDestroyUserArgs = {
  password: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootFacebookApiGetArgs = {
  url: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootInsert_Contact_Form_SubmissionsArgs = {
  objects: Array<Contact_Form_Submissions_Insert_Input>;
  on_conflict?: InputMaybe<Contact_Form_Submissions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contact_Form_Submissions_OneArgs = {
  object: Contact_Form_Submissions_Insert_Input;
  on_conflict?: InputMaybe<Contact_Form_Submissions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Facebook_AudiencesArgs = {
  objects: Array<Facebook_Audiences_Insert_Input>;
  on_conflict?: InputMaybe<Facebook_Audiences_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Facebook_Audiences_OneArgs = {
  object: Facebook_Audiences_Insert_Input;
  on_conflict?: InputMaybe<Facebook_Audiences_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Facebook_Creative_TemplatesArgs = {
  objects: Array<Facebook_Creative_Templates_Insert_Input>;
  on_conflict?: InputMaybe<Facebook_Creative_Templates_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Facebook_Creative_Templates_OneArgs = {
  object: Facebook_Creative_Templates_Insert_Input;
  on_conflict?: InputMaybe<Facebook_Creative_Templates_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Facebook_CreativesArgs = {
  objects: Array<Facebook_Creatives_Insert_Input>;
  on_conflict?: InputMaybe<Facebook_Creatives_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Facebook_Creatives_OneArgs = {
  object: Facebook_Creatives_Insert_Input;
  on_conflict?: InputMaybe<Facebook_Creatives_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_InvitationsArgs = {
  objects: Array<Invitations_Insert_Input>;
  on_conflict?: InputMaybe<Invitations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Invitations_OneArgs = {
  object: Invitations_Insert_Input;
  on_conflict?: InputMaybe<Invitations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProjectsArgs = {
  objects: Array<Projects_Insert_Input>;
  on_conflict?: InputMaybe<Projects_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Projects_OneArgs = {
  object: Projects_Insert_Input;
  on_conflict?: InputMaybe<Projects_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Projects_ThemesArgs = {
  objects: Array<Projects_Themes_Insert_Input>;
  on_conflict?: InputMaybe<Projects_Themes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Projects_Themes_OneArgs = {
  object: Projects_Themes_Insert_Input;
  on_conflict?: InputMaybe<Projects_Themes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TeamsArgs = {
  objects: Array<Teams_Insert_Input>;
  on_conflict?: InputMaybe<Teams_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Teams_OneArgs = {
  object: Teams_Insert_Input;
  on_conflict?: InputMaybe<Teams_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Teams_ProjectsArgs = {
  objects: Array<Teams_Projects_Insert_Input>;
  on_conflict?: InputMaybe<Teams_Projects_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Teams_Projects_OneArgs = {
  object: Teams_Projects_Insert_Input;
  on_conflict?: InputMaybe<Teams_Projects_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Teams_RolesArgs = {
  objects: Array<Teams_Roles_Insert_Input>;
  on_conflict?: InputMaybe<Teams_Roles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Teams_Roles_OneArgs = {
  object: Teams_Roles_Insert_Input;
  on_conflict?: InputMaybe<Teams_Roles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Teams_UsersArgs = {
  objects: Array<Teams_Users_Insert_Input>;
  on_conflict?: InputMaybe<Teams_Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Teams_Users_OneArgs = {
  object: Teams_Users_Insert_Input;
  on_conflict?: InputMaybe<Teams_Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Themes_AnglesArgs = {
  objects: Array<Themes_Angles_Insert_Input>;
  on_conflict?: InputMaybe<Themes_Angles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Themes_Angles_OneArgs = {
  object: Themes_Angles_Insert_Input;
  on_conflict?: InputMaybe<Themes_Angles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootJoinTeamArgs = {
  teamId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootLeaveTeamArgs = {
  teamId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootRegisterArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootResetPasswordArgs = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootSendPasswordResetEmailArgs = {
  email: Scalars['String']['input'];
};


/** mutation root */
export type Mutation_RootUpdate_Contact_Form_SubmissionsArgs = {
  _set?: InputMaybe<Contact_Form_Submissions_Set_Input>;
  where: Contact_Form_Submissions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Contact_Form_Submissions_By_PkArgs = {
  _set?: InputMaybe<Contact_Form_Submissions_Set_Input>;
  pk_columns: Contact_Form_Submissions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Contact_Form_Submissions_ManyArgs = {
  updates: Array<Contact_Form_Submissions_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Facebook_AudiencesArgs = {
  _append?: InputMaybe<Facebook_Audiences_Append_Input>;
  _delete_at_path?: InputMaybe<Facebook_Audiences_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Facebook_Audiences_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Facebook_Audiences_Delete_Key_Input>;
  _inc?: InputMaybe<Facebook_Audiences_Inc_Input>;
  _prepend?: InputMaybe<Facebook_Audiences_Prepend_Input>;
  _set?: InputMaybe<Facebook_Audiences_Set_Input>;
  where: Facebook_Audiences_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Facebook_Audiences_By_PkArgs = {
  _append?: InputMaybe<Facebook_Audiences_Append_Input>;
  _delete_at_path?: InputMaybe<Facebook_Audiences_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Facebook_Audiences_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Facebook_Audiences_Delete_Key_Input>;
  _inc?: InputMaybe<Facebook_Audiences_Inc_Input>;
  _prepend?: InputMaybe<Facebook_Audiences_Prepend_Input>;
  _set?: InputMaybe<Facebook_Audiences_Set_Input>;
  pk_columns: Facebook_Audiences_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Facebook_Audiences_ManyArgs = {
  updates: Array<Facebook_Audiences_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Facebook_Creative_TemplatesArgs = {
  _append?: InputMaybe<Facebook_Creative_Templates_Append_Input>;
  _delete_at_path?: InputMaybe<Facebook_Creative_Templates_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Facebook_Creative_Templates_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Facebook_Creative_Templates_Delete_Key_Input>;
  _prepend?: InputMaybe<Facebook_Creative_Templates_Prepend_Input>;
  _set?: InputMaybe<Facebook_Creative_Templates_Set_Input>;
  where: Facebook_Creative_Templates_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Facebook_Creative_Templates_By_PkArgs = {
  _append?: InputMaybe<Facebook_Creative_Templates_Append_Input>;
  _delete_at_path?: InputMaybe<Facebook_Creative_Templates_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Facebook_Creative_Templates_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Facebook_Creative_Templates_Delete_Key_Input>;
  _prepend?: InputMaybe<Facebook_Creative_Templates_Prepend_Input>;
  _set?: InputMaybe<Facebook_Creative_Templates_Set_Input>;
  pk_columns: Facebook_Creative_Templates_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Facebook_Creative_Templates_ManyArgs = {
  updates: Array<Facebook_Creative_Templates_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Facebook_CreativesArgs = {
  _append?: InputMaybe<Facebook_Creatives_Append_Input>;
  _delete_at_path?: InputMaybe<Facebook_Creatives_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Facebook_Creatives_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Facebook_Creatives_Delete_Key_Input>;
  _prepend?: InputMaybe<Facebook_Creatives_Prepend_Input>;
  _set?: InputMaybe<Facebook_Creatives_Set_Input>;
  where: Facebook_Creatives_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Facebook_Creatives_By_PkArgs = {
  _append?: InputMaybe<Facebook_Creatives_Append_Input>;
  _delete_at_path?: InputMaybe<Facebook_Creatives_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Facebook_Creatives_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Facebook_Creatives_Delete_Key_Input>;
  _prepend?: InputMaybe<Facebook_Creatives_Prepend_Input>;
  _set?: InputMaybe<Facebook_Creatives_Set_Input>;
  pk_columns: Facebook_Creatives_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Facebook_Creatives_ManyArgs = {
  updates: Array<Facebook_Creatives_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_InvitationsArgs = {
  _set?: InputMaybe<Invitations_Set_Input>;
  where: Invitations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Invitations_By_PkArgs = {
  _set?: InputMaybe<Invitations_Set_Input>;
  pk_columns: Invitations_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Invitations_ManyArgs = {
  updates: Array<Invitations_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ProjectsArgs = {
  _set?: InputMaybe<Projects_Set_Input>;
  where: Projects_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Projects_By_PkArgs = {
  _set?: InputMaybe<Projects_Set_Input>;
  pk_columns: Projects_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Projects_ManyArgs = {
  updates: Array<Projects_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Projects_ThemesArgs = {
  _set?: InputMaybe<Projects_Themes_Set_Input>;
  where: Projects_Themes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Projects_Themes_By_PkArgs = {
  _set?: InputMaybe<Projects_Themes_Set_Input>;
  pk_columns: Projects_Themes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Projects_Themes_ManyArgs = {
  updates: Array<Projects_Themes_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_TeamsArgs = {
  _set?: InputMaybe<Teams_Set_Input>;
  where: Teams_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Teams_By_PkArgs = {
  _set?: InputMaybe<Teams_Set_Input>;
  pk_columns: Teams_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Teams_ManyArgs = {
  updates: Array<Teams_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Teams_ProjectsArgs = {
  _set?: InputMaybe<Teams_Projects_Set_Input>;
  where: Teams_Projects_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Teams_Projects_By_PkArgs = {
  _set?: InputMaybe<Teams_Projects_Set_Input>;
  pk_columns: Teams_Projects_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Teams_Projects_ManyArgs = {
  updates: Array<Teams_Projects_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Teams_RolesArgs = {
  _set?: InputMaybe<Teams_Roles_Set_Input>;
  where: Teams_Roles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Teams_Roles_By_PkArgs = {
  _set?: InputMaybe<Teams_Roles_Set_Input>;
  pk_columns: Teams_Roles_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Teams_Roles_ManyArgs = {
  updates: Array<Teams_Roles_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Teams_UsersArgs = {
  _set?: InputMaybe<Teams_Users_Set_Input>;
  where: Teams_Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Teams_Users_By_PkArgs = {
  _set?: InputMaybe<Teams_Users_Set_Input>;
  pk_columns: Teams_Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Teams_Users_ManyArgs = {
  updates: Array<Teams_Users_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Themes_AnglesArgs = {
  _set?: InputMaybe<Themes_Angles_Set_Input>;
  where: Themes_Angles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Themes_Angles_By_PkArgs = {
  _set?: InputMaybe<Themes_Angles_Set_Input>;
  pk_columns: Themes_Angles_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Themes_Angles_ManyArgs = {
  updates: Array<Themes_Angles_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Users_ManyArgs = {
  updates: Array<Users_Updates>;
};


/** mutation root */
export type Mutation_RootVerifyEmailArgs = {
  code: Scalars['String']['input'];
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "projects" */
export type Projects = {
  __typename?: 'projects';
  /** An array relationship */
  audiences: Array<Facebook_Audiences>;
  /** An aggregate relationship */
  audiences_aggregate: Facebook_Audiences_Aggregate;
  branding?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['timestamptz']['output'];
  /** An array relationship */
  creatives: Array<Facebook_Creatives>;
  /** An aggregate relationship */
  creatives_aggregate: Facebook_Creatives_Aggregate;
  id: Scalars['uuid']['output'];
  is_draft: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  objective?: Maybe<Scalars['String']['output']>;
  platform?: Maybe<Scalars['String']['output']>;
  project_type?: Maybe<Scalars['String']['output']>;
  start_time?: Maybe<Scalars['timestamptz']['output']>;
  stop_time?: Maybe<Scalars['timestamptz']['output']>;
  /** An array relationship */
  teams_projects: Array<Teams_Projects>;
  /** An aggregate relationship */
  teams_projects_aggregate: Teams_Projects_Aggregate;
  /** An array relationship */
  themes: Array<Projects_Themes>;
  /** An aggregate relationship */
  themes_aggregate: Projects_Themes_Aggregate;
  updated_at: Scalars['timestamptz']['output'];
};


/** columns and relationships of "projects" */
export type ProjectsAudiencesArgs = {
  distinct_on?: InputMaybe<Array<Facebook_Audiences_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Facebook_Audiences_Order_By>>;
  where?: InputMaybe<Facebook_Audiences_Bool_Exp>;
};


/** columns and relationships of "projects" */
export type ProjectsAudiences_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Facebook_Audiences_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Facebook_Audiences_Order_By>>;
  where?: InputMaybe<Facebook_Audiences_Bool_Exp>;
};


/** columns and relationships of "projects" */
export type ProjectsCreativesArgs = {
  distinct_on?: InputMaybe<Array<Facebook_Creatives_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Facebook_Creatives_Order_By>>;
  where?: InputMaybe<Facebook_Creatives_Bool_Exp>;
};


/** columns and relationships of "projects" */
export type ProjectsCreatives_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Facebook_Creatives_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Facebook_Creatives_Order_By>>;
  where?: InputMaybe<Facebook_Creatives_Bool_Exp>;
};


/** columns and relationships of "projects" */
export type ProjectsTeams_ProjectsArgs = {
  distinct_on?: InputMaybe<Array<Teams_Projects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Teams_Projects_Order_By>>;
  where?: InputMaybe<Teams_Projects_Bool_Exp>;
};


/** columns and relationships of "projects" */
export type ProjectsTeams_Projects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Teams_Projects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Teams_Projects_Order_By>>;
  where?: InputMaybe<Teams_Projects_Bool_Exp>;
};


/** columns and relationships of "projects" */
export type ProjectsThemesArgs = {
  distinct_on?: InputMaybe<Array<Projects_Themes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Projects_Themes_Order_By>>;
  where?: InputMaybe<Projects_Themes_Bool_Exp>;
};


/** columns and relationships of "projects" */
export type ProjectsThemes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Projects_Themes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Projects_Themes_Order_By>>;
  where?: InputMaybe<Projects_Themes_Bool_Exp>;
};

/** aggregated selection of "projects" */
export type Projects_Aggregate = {
  __typename?: 'projects_aggregate';
  aggregate?: Maybe<Projects_Aggregate_Fields>;
  nodes: Array<Projects>;
};

/** aggregate fields of "projects" */
export type Projects_Aggregate_Fields = {
  __typename?: 'projects_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Projects_Max_Fields>;
  min?: Maybe<Projects_Min_Fields>;
};


/** aggregate fields of "projects" */
export type Projects_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Projects_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "projects". All fields are combined with a logical 'AND'. */
export type Projects_Bool_Exp = {
  _and?: InputMaybe<Array<Projects_Bool_Exp>>;
  _not?: InputMaybe<Projects_Bool_Exp>;
  _or?: InputMaybe<Array<Projects_Bool_Exp>>;
  audiences?: InputMaybe<Facebook_Audiences_Bool_Exp>;
  audiences_aggregate?: InputMaybe<Facebook_Audiences_Aggregate_Bool_Exp>;
  branding?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  creatives?: InputMaybe<Facebook_Creatives_Bool_Exp>;
  creatives_aggregate?: InputMaybe<Facebook_Creatives_Aggregate_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  is_draft?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  objective?: InputMaybe<String_Comparison_Exp>;
  platform?: InputMaybe<String_Comparison_Exp>;
  project_type?: InputMaybe<String_Comparison_Exp>;
  start_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  stop_time?: InputMaybe<Timestamptz_Comparison_Exp>;
  teams_projects?: InputMaybe<Teams_Projects_Bool_Exp>;
  teams_projects_aggregate?: InputMaybe<Teams_Projects_Aggregate_Bool_Exp>;
  themes?: InputMaybe<Projects_Themes_Bool_Exp>;
  themes_aggregate?: InputMaybe<Projects_Themes_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "projects" */
export enum Projects_Constraint {
  /** unique or primary key constraint on columns "id" */
  ProjectsPkey = 'projects_pkey'
}

/** input type for inserting data into table "projects" */
export type Projects_Insert_Input = {
  audiences?: InputMaybe<Facebook_Audiences_Arr_Rel_Insert_Input>;
  branding?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  creatives?: InputMaybe<Facebook_Creatives_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_draft?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  objective?: InputMaybe<Scalars['String']['input']>;
  platform?: InputMaybe<Scalars['String']['input']>;
  project_type?: InputMaybe<Scalars['String']['input']>;
  start_time?: InputMaybe<Scalars['timestamptz']['input']>;
  stop_time?: InputMaybe<Scalars['timestamptz']['input']>;
  teams_projects?: InputMaybe<Teams_Projects_Arr_Rel_Insert_Input>;
  themes?: InputMaybe<Projects_Themes_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Projects_Max_Fields = {
  __typename?: 'projects_max_fields';
  branding?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  objective?: Maybe<Scalars['String']['output']>;
  platform?: Maybe<Scalars['String']['output']>;
  project_type?: Maybe<Scalars['String']['output']>;
  start_time?: Maybe<Scalars['timestamptz']['output']>;
  stop_time?: Maybe<Scalars['timestamptz']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Projects_Min_Fields = {
  __typename?: 'projects_min_fields';
  branding?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  objective?: Maybe<Scalars['String']['output']>;
  platform?: Maybe<Scalars['String']['output']>;
  project_type?: Maybe<Scalars['String']['output']>;
  start_time?: Maybe<Scalars['timestamptz']['output']>;
  stop_time?: Maybe<Scalars['timestamptz']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "projects" */
export type Projects_Mutation_Response = {
  __typename?: 'projects_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Projects>;
};

/** input type for inserting object relation for remote table "projects" */
export type Projects_Obj_Rel_Insert_Input = {
  data: Projects_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Projects_On_Conflict>;
};

/** on_conflict condition type for table "projects" */
export type Projects_On_Conflict = {
  constraint: Projects_Constraint;
  update_columns?: Array<Projects_Update_Column>;
  where?: InputMaybe<Projects_Bool_Exp>;
};

/** Ordering options when selecting data from "projects". */
export type Projects_Order_By = {
  audiences_aggregate?: InputMaybe<Facebook_Audiences_Aggregate_Order_By>;
  branding?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  creatives_aggregate?: InputMaybe<Facebook_Creatives_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  is_draft?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  objective?: InputMaybe<Order_By>;
  platform?: InputMaybe<Order_By>;
  project_type?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  stop_time?: InputMaybe<Order_By>;
  teams_projects_aggregate?: InputMaybe<Teams_Projects_Aggregate_Order_By>;
  themes_aggregate?: InputMaybe<Projects_Themes_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: projects */
export type Projects_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "projects" */
export enum Projects_Select_Column {
  /** column name */
  Branding = 'branding',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsDraft = 'is_draft',
  /** column name */
  Name = 'name',
  /** column name */
  Objective = 'objective',
  /** column name */
  Platform = 'platform',
  /** column name */
  ProjectType = 'project_type',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  StopTime = 'stop_time',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "projects" */
export type Projects_Set_Input = {
  branding?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_draft?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  objective?: InputMaybe<Scalars['String']['input']>;
  platform?: InputMaybe<Scalars['String']['input']>;
  project_type?: InputMaybe<Scalars['String']['input']>;
  start_time?: InputMaybe<Scalars['timestamptz']['input']>;
  stop_time?: InputMaybe<Scalars['timestamptz']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "projects" */
export type Projects_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Projects_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Projects_Stream_Cursor_Value_Input = {
  branding?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_draft?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  objective?: InputMaybe<Scalars['String']['input']>;
  platform?: InputMaybe<Scalars['String']['input']>;
  project_type?: InputMaybe<Scalars['String']['input']>;
  start_time?: InputMaybe<Scalars['timestamptz']['input']>;
  stop_time?: InputMaybe<Scalars['timestamptz']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Themes associated with a project */
export type Projects_Themes = {
  __typename?: 'projects_themes';
  /** An array relationship */
  angles: Array<Themes_Angles>;
  /** An aggregate relationship */
  angles_aggregate: Themes_Angles_Aggregate;
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  /** An object relationship */
  project: Projects;
  project_id: Scalars['uuid']['output'];
  updated_at: Scalars['timestamptz']['output'];
};


/** Themes associated with a project */
export type Projects_ThemesAnglesArgs = {
  distinct_on?: InputMaybe<Array<Themes_Angles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Themes_Angles_Order_By>>;
  where?: InputMaybe<Themes_Angles_Bool_Exp>;
};


/** Themes associated with a project */
export type Projects_ThemesAngles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Themes_Angles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Themes_Angles_Order_By>>;
  where?: InputMaybe<Themes_Angles_Bool_Exp>;
};

/** aggregated selection of "projects_themes" */
export type Projects_Themes_Aggregate = {
  __typename?: 'projects_themes_aggregate';
  aggregate?: Maybe<Projects_Themes_Aggregate_Fields>;
  nodes: Array<Projects_Themes>;
};

export type Projects_Themes_Aggregate_Bool_Exp = {
  count?: InputMaybe<Projects_Themes_Aggregate_Bool_Exp_Count>;
};

export type Projects_Themes_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Projects_Themes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Projects_Themes_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "projects_themes" */
export type Projects_Themes_Aggregate_Fields = {
  __typename?: 'projects_themes_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Projects_Themes_Max_Fields>;
  min?: Maybe<Projects_Themes_Min_Fields>;
};


/** aggregate fields of "projects_themes" */
export type Projects_Themes_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Projects_Themes_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "projects_themes" */
export type Projects_Themes_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Projects_Themes_Max_Order_By>;
  min?: InputMaybe<Projects_Themes_Min_Order_By>;
};

/** input type for inserting array relation for remote table "projects_themes" */
export type Projects_Themes_Arr_Rel_Insert_Input = {
  data: Array<Projects_Themes_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Projects_Themes_On_Conflict>;
};

/** Boolean expression to filter rows from the table "projects_themes". All fields are combined with a logical 'AND'. */
export type Projects_Themes_Bool_Exp = {
  _and?: InputMaybe<Array<Projects_Themes_Bool_Exp>>;
  _not?: InputMaybe<Projects_Themes_Bool_Exp>;
  _or?: InputMaybe<Array<Projects_Themes_Bool_Exp>>;
  angles?: InputMaybe<Themes_Angles_Bool_Exp>;
  angles_aggregate?: InputMaybe<Themes_Angles_Aggregate_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  project?: InputMaybe<Projects_Bool_Exp>;
  project_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "projects_themes" */
export enum Projects_Themes_Constraint {
  /** unique or primary key constraint on columns "id" */
  ProjectsThemesPkey = 'projects_themes_pkey'
}

/** input type for inserting data into table "projects_themes" */
export type Projects_Themes_Insert_Input = {
  angles?: InputMaybe<Themes_Angles_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  project?: InputMaybe<Projects_Obj_Rel_Insert_Input>;
  project_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Projects_Themes_Max_Fields = {
  __typename?: 'projects_themes_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  project_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "projects_themes" */
export type Projects_Themes_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Projects_Themes_Min_Fields = {
  __typename?: 'projects_themes_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  project_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "projects_themes" */
export type Projects_Themes_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "projects_themes" */
export type Projects_Themes_Mutation_Response = {
  __typename?: 'projects_themes_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Projects_Themes>;
};

/** input type for inserting object relation for remote table "projects_themes" */
export type Projects_Themes_Obj_Rel_Insert_Input = {
  data: Projects_Themes_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Projects_Themes_On_Conflict>;
};

/** on_conflict condition type for table "projects_themes" */
export type Projects_Themes_On_Conflict = {
  constraint: Projects_Themes_Constraint;
  update_columns?: Array<Projects_Themes_Update_Column>;
  where?: InputMaybe<Projects_Themes_Bool_Exp>;
};

/** Ordering options when selecting data from "projects_themes". */
export type Projects_Themes_Order_By = {
  angles_aggregate?: InputMaybe<Themes_Angles_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  project?: InputMaybe<Projects_Order_By>;
  project_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: projects_themes */
export type Projects_Themes_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "projects_themes" */
export enum Projects_Themes_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "projects_themes" */
export type Projects_Themes_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  project_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "projects_themes" */
export type Projects_Themes_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Projects_Themes_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Projects_Themes_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  project_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "projects_themes" */
export enum Projects_Themes_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Projects_Themes_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Projects_Themes_Set_Input>;
  /** filter the rows which have to be updated */
  where: Projects_Themes_Bool_Exp;
};

/** update columns of table "projects" */
export enum Projects_Update_Column {
  /** column name */
  Branding = 'branding',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsDraft = 'is_draft',
  /** column name */
  Name = 'name',
  /** column name */
  Objective = 'objective',
  /** column name */
  Platform = 'platform',
  /** column name */
  ProjectType = 'project_type',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  StopTime = 'stop_time',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Projects_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Projects_Set_Input>;
  /** filter the rows which have to be updated */
  where: Projects_Bool_Exp;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "contact_form_submissions" */
  contact_form_submissions: Array<Contact_Form_Submissions>;
  /** fetch aggregated fields from the table: "contact_form_submissions" */
  contact_form_submissions_aggregate: Contact_Form_Submissions_Aggregate;
  /** fetch data from the table: "contact_form_submissions" using primary key columns */
  contact_form_submissions_by_pk?: Maybe<Contact_Form_Submissions>;
  /** fetch data from the table: "facebook_audiences" */
  facebook_audiences: Array<Facebook_Audiences>;
  /** fetch aggregated fields from the table: "facebook_audiences" */
  facebook_audiences_aggregate: Facebook_Audiences_Aggregate;
  /** fetch data from the table: "facebook_audiences" using primary key columns */
  facebook_audiences_by_pk?: Maybe<Facebook_Audiences>;
  /** fetch data from the table: "facebook_creative_templates" */
  facebook_creative_templates: Array<Facebook_Creative_Templates>;
  /** fetch aggregated fields from the table: "facebook_creative_templates" */
  facebook_creative_templates_aggregate: Facebook_Creative_Templates_Aggregate;
  /** fetch data from the table: "facebook_creative_templates" using primary key columns */
  facebook_creative_templates_by_pk?: Maybe<Facebook_Creative_Templates>;
  /** An array relationship */
  facebook_creatives: Array<Facebook_Creatives>;
  /** An aggregate relationship */
  facebook_creatives_aggregate: Facebook_Creatives_Aggregate;
  /** fetch data from the table: "facebook_creatives" using primary key columns */
  facebook_creatives_by_pk?: Maybe<Facebook_Creatives>;
  /** An array relationship */
  invitations: Array<Invitations>;
  /** An aggregate relationship */
  invitations_aggregate: Invitations_Aggregate;
  /** fetch data from the table: "invitations" using primary key columns */
  invitations_by_pk?: Maybe<Invitations>;
  /** fetch data from the table: "projects" */
  projects: Array<Projects>;
  /** fetch aggregated fields from the table: "projects" */
  projects_aggregate: Projects_Aggregate;
  /** fetch data from the table: "projects" using primary key columns */
  projects_by_pk?: Maybe<Projects>;
  /** fetch data from the table: "projects_themes" */
  projects_themes: Array<Projects_Themes>;
  /** fetch aggregated fields from the table: "projects_themes" */
  projects_themes_aggregate: Projects_Themes_Aggregate;
  /** fetch data from the table: "projects_themes" using primary key columns */
  projects_themes_by_pk?: Maybe<Projects_Themes>;
  /** fetch data from the table: "teams" */
  teams: Array<Teams>;
  /** fetch aggregated fields from the table: "teams" */
  teams_aggregate: Teams_Aggregate;
  /** fetch data from the table: "teams" using primary key columns */
  teams_by_pk?: Maybe<Teams>;
  /** An array relationship */
  teams_projects: Array<Teams_Projects>;
  /** An aggregate relationship */
  teams_projects_aggregate: Teams_Projects_Aggregate;
  /** fetch data from the table: "teams_projects" using primary key columns */
  teams_projects_by_pk?: Maybe<Teams_Projects>;
  /** fetch data from the table: "teams_roles" */
  teams_roles: Array<Teams_Roles>;
  /** fetch aggregated fields from the table: "teams_roles" */
  teams_roles_aggregate: Teams_Roles_Aggregate;
  /** fetch data from the table: "teams_roles" using primary key columns */
  teams_roles_by_pk?: Maybe<Teams_Roles>;
  /** An array relationship */
  teams_users: Array<Teams_Users>;
  /** An aggregate relationship */
  teams_users_aggregate: Teams_Users_Aggregate;
  /** fetch data from the table: "teams_users" using primary key columns */
  teams_users_by_pk?: Maybe<Teams_Users>;
  /** fetch data from the table: "themes_angles" */
  themes_angles: Array<Themes_Angles>;
  /** fetch aggregated fields from the table: "themes_angles" */
  themes_angles_aggregate: Themes_Angles_Aggregate;
  /** fetch data from the table: "themes_angles" using primary key columns */
  themes_angles_by_pk?: Maybe<Themes_Angles>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Query_RootContact_Form_SubmissionsArgs = {
  distinct_on?: InputMaybe<Array<Contact_Form_Submissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contact_Form_Submissions_Order_By>>;
  where?: InputMaybe<Contact_Form_Submissions_Bool_Exp>;
};


export type Query_RootContact_Form_Submissions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contact_Form_Submissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contact_Form_Submissions_Order_By>>;
  where?: InputMaybe<Contact_Form_Submissions_Bool_Exp>;
};


export type Query_RootContact_Form_Submissions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootFacebook_AudiencesArgs = {
  distinct_on?: InputMaybe<Array<Facebook_Audiences_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Facebook_Audiences_Order_By>>;
  where?: InputMaybe<Facebook_Audiences_Bool_Exp>;
};


export type Query_RootFacebook_Audiences_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Facebook_Audiences_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Facebook_Audiences_Order_By>>;
  where?: InputMaybe<Facebook_Audiences_Bool_Exp>;
};


export type Query_RootFacebook_Audiences_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootFacebook_Creative_TemplatesArgs = {
  distinct_on?: InputMaybe<Array<Facebook_Creative_Templates_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Facebook_Creative_Templates_Order_By>>;
  where?: InputMaybe<Facebook_Creative_Templates_Bool_Exp>;
};


export type Query_RootFacebook_Creative_Templates_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Facebook_Creative_Templates_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Facebook_Creative_Templates_Order_By>>;
  where?: InputMaybe<Facebook_Creative_Templates_Bool_Exp>;
};


export type Query_RootFacebook_Creative_Templates_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootFacebook_CreativesArgs = {
  distinct_on?: InputMaybe<Array<Facebook_Creatives_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Facebook_Creatives_Order_By>>;
  where?: InputMaybe<Facebook_Creatives_Bool_Exp>;
};


export type Query_RootFacebook_Creatives_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Facebook_Creatives_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Facebook_Creatives_Order_By>>;
  where?: InputMaybe<Facebook_Creatives_Bool_Exp>;
};


export type Query_RootFacebook_Creatives_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootInvitationsArgs = {
  distinct_on?: InputMaybe<Array<Invitations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitations_Order_By>>;
  where?: InputMaybe<Invitations_Bool_Exp>;
};


export type Query_RootInvitations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitations_Order_By>>;
  where?: InputMaybe<Invitations_Bool_Exp>;
};


export type Query_RootInvitations_By_PkArgs = {
  email: Scalars['String']['input'];
  team_id: Scalars['uuid']['input'];
};


export type Query_RootProjectsArgs = {
  distinct_on?: InputMaybe<Array<Projects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Projects_Order_By>>;
  where?: InputMaybe<Projects_Bool_Exp>;
};


export type Query_RootProjects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Projects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Projects_Order_By>>;
  where?: InputMaybe<Projects_Bool_Exp>;
};


export type Query_RootProjects_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootProjects_ThemesArgs = {
  distinct_on?: InputMaybe<Array<Projects_Themes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Projects_Themes_Order_By>>;
  where?: InputMaybe<Projects_Themes_Bool_Exp>;
};


export type Query_RootProjects_Themes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Projects_Themes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Projects_Themes_Order_By>>;
  where?: InputMaybe<Projects_Themes_Bool_Exp>;
};


export type Query_RootProjects_Themes_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootTeamsArgs = {
  distinct_on?: InputMaybe<Array<Teams_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Teams_Order_By>>;
  where?: InputMaybe<Teams_Bool_Exp>;
};


export type Query_RootTeams_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Teams_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Teams_Order_By>>;
  where?: InputMaybe<Teams_Bool_Exp>;
};


export type Query_RootTeams_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootTeams_ProjectsArgs = {
  distinct_on?: InputMaybe<Array<Teams_Projects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Teams_Projects_Order_By>>;
  where?: InputMaybe<Teams_Projects_Bool_Exp>;
};


export type Query_RootTeams_Projects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Teams_Projects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Teams_Projects_Order_By>>;
  where?: InputMaybe<Teams_Projects_Bool_Exp>;
};


export type Query_RootTeams_Projects_By_PkArgs = {
  project_id: Scalars['uuid']['input'];
  team_id: Scalars['uuid']['input'];
};


export type Query_RootTeams_RolesArgs = {
  distinct_on?: InputMaybe<Array<Teams_Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Teams_Roles_Order_By>>;
  where?: InputMaybe<Teams_Roles_Bool_Exp>;
};


export type Query_RootTeams_Roles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Teams_Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Teams_Roles_Order_By>>;
  where?: InputMaybe<Teams_Roles_Bool_Exp>;
};


export type Query_RootTeams_Roles_By_PkArgs = {
  role: Scalars['String']['input'];
};


export type Query_RootTeams_UsersArgs = {
  distinct_on?: InputMaybe<Array<Teams_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Teams_Users_Order_By>>;
  where?: InputMaybe<Teams_Users_Bool_Exp>;
};


export type Query_RootTeams_Users_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Teams_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Teams_Users_Order_By>>;
  where?: InputMaybe<Teams_Users_Bool_Exp>;
};


export type Query_RootTeams_Users_By_PkArgs = {
  team_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};


export type Query_RootThemes_AnglesArgs = {
  distinct_on?: InputMaybe<Array<Themes_Angles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Themes_Angles_Order_By>>;
  where?: InputMaybe<Themes_Angles_Bool_Exp>;
};


export type Query_RootThemes_Angles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Themes_Angles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Themes_Angles_Order_By>>;
  where?: InputMaybe<Themes_Angles_Bool_Exp>;
};


export type Query_RootThemes_Angles_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "contact_form_submissions" */
  contact_form_submissions: Array<Contact_Form_Submissions>;
  /** fetch aggregated fields from the table: "contact_form_submissions" */
  contact_form_submissions_aggregate: Contact_Form_Submissions_Aggregate;
  /** fetch data from the table: "contact_form_submissions" using primary key columns */
  contact_form_submissions_by_pk?: Maybe<Contact_Form_Submissions>;
  /** fetch data from the table in a streaming manner: "contact_form_submissions" */
  contact_form_submissions_stream: Array<Contact_Form_Submissions>;
  /** fetch data from the table: "facebook_audiences" */
  facebook_audiences: Array<Facebook_Audiences>;
  /** fetch aggregated fields from the table: "facebook_audiences" */
  facebook_audiences_aggregate: Facebook_Audiences_Aggregate;
  /** fetch data from the table: "facebook_audiences" using primary key columns */
  facebook_audiences_by_pk?: Maybe<Facebook_Audiences>;
  /** fetch data from the table in a streaming manner: "facebook_audiences" */
  facebook_audiences_stream: Array<Facebook_Audiences>;
  /** fetch data from the table: "facebook_creative_templates" */
  facebook_creative_templates: Array<Facebook_Creative_Templates>;
  /** fetch aggregated fields from the table: "facebook_creative_templates" */
  facebook_creative_templates_aggregate: Facebook_Creative_Templates_Aggregate;
  /** fetch data from the table: "facebook_creative_templates" using primary key columns */
  facebook_creative_templates_by_pk?: Maybe<Facebook_Creative_Templates>;
  /** fetch data from the table in a streaming manner: "facebook_creative_templates" */
  facebook_creative_templates_stream: Array<Facebook_Creative_Templates>;
  /** An array relationship */
  facebook_creatives: Array<Facebook_Creatives>;
  /** An aggregate relationship */
  facebook_creatives_aggregate: Facebook_Creatives_Aggregate;
  /** fetch data from the table: "facebook_creatives" using primary key columns */
  facebook_creatives_by_pk?: Maybe<Facebook_Creatives>;
  /** fetch data from the table in a streaming manner: "facebook_creatives" */
  facebook_creatives_stream: Array<Facebook_Creatives>;
  /** An array relationship */
  invitations: Array<Invitations>;
  /** An aggregate relationship */
  invitations_aggregate: Invitations_Aggregate;
  /** fetch data from the table: "invitations" using primary key columns */
  invitations_by_pk?: Maybe<Invitations>;
  /** fetch data from the table in a streaming manner: "invitations" */
  invitations_stream: Array<Invitations>;
  /** fetch data from the table: "projects" */
  projects: Array<Projects>;
  /** fetch aggregated fields from the table: "projects" */
  projects_aggregate: Projects_Aggregate;
  /** fetch data from the table: "projects" using primary key columns */
  projects_by_pk?: Maybe<Projects>;
  /** fetch data from the table in a streaming manner: "projects" */
  projects_stream: Array<Projects>;
  /** fetch data from the table: "projects_themes" */
  projects_themes: Array<Projects_Themes>;
  /** fetch aggregated fields from the table: "projects_themes" */
  projects_themes_aggregate: Projects_Themes_Aggregate;
  /** fetch data from the table: "projects_themes" using primary key columns */
  projects_themes_by_pk?: Maybe<Projects_Themes>;
  /** fetch data from the table in a streaming manner: "projects_themes" */
  projects_themes_stream: Array<Projects_Themes>;
  /** fetch data from the table: "teams" */
  teams: Array<Teams>;
  /** fetch aggregated fields from the table: "teams" */
  teams_aggregate: Teams_Aggregate;
  /** fetch data from the table: "teams" using primary key columns */
  teams_by_pk?: Maybe<Teams>;
  /** An array relationship */
  teams_projects: Array<Teams_Projects>;
  /** An aggregate relationship */
  teams_projects_aggregate: Teams_Projects_Aggregate;
  /** fetch data from the table: "teams_projects" using primary key columns */
  teams_projects_by_pk?: Maybe<Teams_Projects>;
  /** fetch data from the table in a streaming manner: "teams_projects" */
  teams_projects_stream: Array<Teams_Projects>;
  /** fetch data from the table: "teams_roles" */
  teams_roles: Array<Teams_Roles>;
  /** fetch aggregated fields from the table: "teams_roles" */
  teams_roles_aggregate: Teams_Roles_Aggregate;
  /** fetch data from the table: "teams_roles" using primary key columns */
  teams_roles_by_pk?: Maybe<Teams_Roles>;
  /** fetch data from the table in a streaming manner: "teams_roles" */
  teams_roles_stream: Array<Teams_Roles>;
  /** fetch data from the table in a streaming manner: "teams" */
  teams_stream: Array<Teams>;
  /** An array relationship */
  teams_users: Array<Teams_Users>;
  /** An aggregate relationship */
  teams_users_aggregate: Teams_Users_Aggregate;
  /** fetch data from the table: "teams_users" using primary key columns */
  teams_users_by_pk?: Maybe<Teams_Users>;
  /** fetch data from the table in a streaming manner: "teams_users" */
  teams_users_stream: Array<Teams_Users>;
  /** fetch data from the table: "themes_angles" */
  themes_angles: Array<Themes_Angles>;
  /** fetch aggregated fields from the table: "themes_angles" */
  themes_angles_aggregate: Themes_Angles_Aggregate;
  /** fetch data from the table: "themes_angles" using primary key columns */
  themes_angles_by_pk?: Maybe<Themes_Angles>;
  /** fetch data from the table in a streaming manner: "themes_angles" */
  themes_angles_stream: Array<Themes_Angles>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "users" */
  users_stream: Array<Users>;
};


export type Subscription_RootContact_Form_SubmissionsArgs = {
  distinct_on?: InputMaybe<Array<Contact_Form_Submissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contact_Form_Submissions_Order_By>>;
  where?: InputMaybe<Contact_Form_Submissions_Bool_Exp>;
};


export type Subscription_RootContact_Form_Submissions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contact_Form_Submissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Contact_Form_Submissions_Order_By>>;
  where?: InputMaybe<Contact_Form_Submissions_Bool_Exp>;
};


export type Subscription_RootContact_Form_Submissions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootContact_Form_Submissions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Contact_Form_Submissions_Stream_Cursor_Input>>;
  where?: InputMaybe<Contact_Form_Submissions_Bool_Exp>;
};


export type Subscription_RootFacebook_AudiencesArgs = {
  distinct_on?: InputMaybe<Array<Facebook_Audiences_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Facebook_Audiences_Order_By>>;
  where?: InputMaybe<Facebook_Audiences_Bool_Exp>;
};


export type Subscription_RootFacebook_Audiences_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Facebook_Audiences_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Facebook_Audiences_Order_By>>;
  where?: InputMaybe<Facebook_Audiences_Bool_Exp>;
};


export type Subscription_RootFacebook_Audiences_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootFacebook_Audiences_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Facebook_Audiences_Stream_Cursor_Input>>;
  where?: InputMaybe<Facebook_Audiences_Bool_Exp>;
};


export type Subscription_RootFacebook_Creative_TemplatesArgs = {
  distinct_on?: InputMaybe<Array<Facebook_Creative_Templates_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Facebook_Creative_Templates_Order_By>>;
  where?: InputMaybe<Facebook_Creative_Templates_Bool_Exp>;
};


export type Subscription_RootFacebook_Creative_Templates_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Facebook_Creative_Templates_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Facebook_Creative_Templates_Order_By>>;
  where?: InputMaybe<Facebook_Creative_Templates_Bool_Exp>;
};


export type Subscription_RootFacebook_Creative_Templates_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootFacebook_Creative_Templates_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Facebook_Creative_Templates_Stream_Cursor_Input>>;
  where?: InputMaybe<Facebook_Creative_Templates_Bool_Exp>;
};


export type Subscription_RootFacebook_CreativesArgs = {
  distinct_on?: InputMaybe<Array<Facebook_Creatives_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Facebook_Creatives_Order_By>>;
  where?: InputMaybe<Facebook_Creatives_Bool_Exp>;
};


export type Subscription_RootFacebook_Creatives_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Facebook_Creatives_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Facebook_Creatives_Order_By>>;
  where?: InputMaybe<Facebook_Creatives_Bool_Exp>;
};


export type Subscription_RootFacebook_Creatives_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootFacebook_Creatives_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Facebook_Creatives_Stream_Cursor_Input>>;
  where?: InputMaybe<Facebook_Creatives_Bool_Exp>;
};


export type Subscription_RootInvitationsArgs = {
  distinct_on?: InputMaybe<Array<Invitations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitations_Order_By>>;
  where?: InputMaybe<Invitations_Bool_Exp>;
};


export type Subscription_RootInvitations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitations_Order_By>>;
  where?: InputMaybe<Invitations_Bool_Exp>;
};


export type Subscription_RootInvitations_By_PkArgs = {
  email: Scalars['String']['input'];
  team_id: Scalars['uuid']['input'];
};


export type Subscription_RootInvitations_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Invitations_Stream_Cursor_Input>>;
  where?: InputMaybe<Invitations_Bool_Exp>;
};


export type Subscription_RootProjectsArgs = {
  distinct_on?: InputMaybe<Array<Projects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Projects_Order_By>>;
  where?: InputMaybe<Projects_Bool_Exp>;
};


export type Subscription_RootProjects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Projects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Projects_Order_By>>;
  where?: InputMaybe<Projects_Bool_Exp>;
};


export type Subscription_RootProjects_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootProjects_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Projects_Stream_Cursor_Input>>;
  where?: InputMaybe<Projects_Bool_Exp>;
};


export type Subscription_RootProjects_ThemesArgs = {
  distinct_on?: InputMaybe<Array<Projects_Themes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Projects_Themes_Order_By>>;
  where?: InputMaybe<Projects_Themes_Bool_Exp>;
};


export type Subscription_RootProjects_Themes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Projects_Themes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Projects_Themes_Order_By>>;
  where?: InputMaybe<Projects_Themes_Bool_Exp>;
};


export type Subscription_RootProjects_Themes_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootProjects_Themes_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Projects_Themes_Stream_Cursor_Input>>;
  where?: InputMaybe<Projects_Themes_Bool_Exp>;
};


export type Subscription_RootTeamsArgs = {
  distinct_on?: InputMaybe<Array<Teams_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Teams_Order_By>>;
  where?: InputMaybe<Teams_Bool_Exp>;
};


export type Subscription_RootTeams_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Teams_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Teams_Order_By>>;
  where?: InputMaybe<Teams_Bool_Exp>;
};


export type Subscription_RootTeams_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootTeams_ProjectsArgs = {
  distinct_on?: InputMaybe<Array<Teams_Projects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Teams_Projects_Order_By>>;
  where?: InputMaybe<Teams_Projects_Bool_Exp>;
};


export type Subscription_RootTeams_Projects_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Teams_Projects_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Teams_Projects_Order_By>>;
  where?: InputMaybe<Teams_Projects_Bool_Exp>;
};


export type Subscription_RootTeams_Projects_By_PkArgs = {
  project_id: Scalars['uuid']['input'];
  team_id: Scalars['uuid']['input'];
};


export type Subscription_RootTeams_Projects_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Teams_Projects_Stream_Cursor_Input>>;
  where?: InputMaybe<Teams_Projects_Bool_Exp>;
};


export type Subscription_RootTeams_RolesArgs = {
  distinct_on?: InputMaybe<Array<Teams_Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Teams_Roles_Order_By>>;
  where?: InputMaybe<Teams_Roles_Bool_Exp>;
};


export type Subscription_RootTeams_Roles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Teams_Roles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Teams_Roles_Order_By>>;
  where?: InputMaybe<Teams_Roles_Bool_Exp>;
};


export type Subscription_RootTeams_Roles_By_PkArgs = {
  role: Scalars['String']['input'];
};


export type Subscription_RootTeams_Roles_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Teams_Roles_Stream_Cursor_Input>>;
  where?: InputMaybe<Teams_Roles_Bool_Exp>;
};


export type Subscription_RootTeams_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Teams_Stream_Cursor_Input>>;
  where?: InputMaybe<Teams_Bool_Exp>;
};


export type Subscription_RootTeams_UsersArgs = {
  distinct_on?: InputMaybe<Array<Teams_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Teams_Users_Order_By>>;
  where?: InputMaybe<Teams_Users_Bool_Exp>;
};


export type Subscription_RootTeams_Users_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Teams_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Teams_Users_Order_By>>;
  where?: InputMaybe<Teams_Users_Bool_Exp>;
};


export type Subscription_RootTeams_Users_By_PkArgs = {
  team_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};


export type Subscription_RootTeams_Users_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Teams_Users_Stream_Cursor_Input>>;
  where?: InputMaybe<Teams_Users_Bool_Exp>;
};


export type Subscription_RootThemes_AnglesArgs = {
  distinct_on?: InputMaybe<Array<Themes_Angles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Themes_Angles_Order_By>>;
  where?: InputMaybe<Themes_Angles_Bool_Exp>;
};


export type Subscription_RootThemes_Angles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Themes_Angles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Themes_Angles_Order_By>>;
  where?: InputMaybe<Themes_Angles_Bool_Exp>;
};


export type Subscription_RootThemes_Angles_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootThemes_Angles_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Themes_Angles_Stream_Cursor_Input>>;
  where?: InputMaybe<Themes_Angles_Bool_Exp>;
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootUsers_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Users_Stream_Cursor_Input>>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** columns and relationships of "teams" */
export type Teams = {
  __typename?: 'teams';
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  /** An array relationship */
  invitations: Array<Invitations>;
  /** An aggregate relationship */
  invitations_aggregate: Invitations_Aggregate;
  name: Scalars['String']['output'];
  /** An array relationship */
  teams_users: Array<Teams_Users>;
  /** An aggregate relationship */
  teams_users_aggregate: Teams_Users_Aggregate;
  updated_at: Scalars['timestamptz']['output'];
};


/** columns and relationships of "teams" */
export type TeamsInvitationsArgs = {
  distinct_on?: InputMaybe<Array<Invitations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitations_Order_By>>;
  where?: InputMaybe<Invitations_Bool_Exp>;
};


/** columns and relationships of "teams" */
export type TeamsInvitations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitations_Order_By>>;
  where?: InputMaybe<Invitations_Bool_Exp>;
};


/** columns and relationships of "teams" */
export type TeamsTeams_UsersArgs = {
  distinct_on?: InputMaybe<Array<Teams_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Teams_Users_Order_By>>;
  where?: InputMaybe<Teams_Users_Bool_Exp>;
};


/** columns and relationships of "teams" */
export type TeamsTeams_Users_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Teams_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Teams_Users_Order_By>>;
  where?: InputMaybe<Teams_Users_Bool_Exp>;
};

/** aggregated selection of "teams" */
export type Teams_Aggregate = {
  __typename?: 'teams_aggregate';
  aggregate?: Maybe<Teams_Aggregate_Fields>;
  nodes: Array<Teams>;
};

/** aggregate fields of "teams" */
export type Teams_Aggregate_Fields = {
  __typename?: 'teams_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Teams_Max_Fields>;
  min?: Maybe<Teams_Min_Fields>;
};


/** aggregate fields of "teams" */
export type Teams_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Teams_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "teams". All fields are combined with a logical 'AND'. */
export type Teams_Bool_Exp = {
  _and?: InputMaybe<Array<Teams_Bool_Exp>>;
  _not?: InputMaybe<Teams_Bool_Exp>;
  _or?: InputMaybe<Array<Teams_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  invitations?: InputMaybe<Invitations_Bool_Exp>;
  invitations_aggregate?: InputMaybe<Invitations_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  teams_users?: InputMaybe<Teams_Users_Bool_Exp>;
  teams_users_aggregate?: InputMaybe<Teams_Users_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "teams" */
export enum Teams_Constraint {
  /** unique or primary key constraint on columns "id" */
  TeamsPkey = 'teams_pkey'
}

/** input type for inserting data into table "teams" */
export type Teams_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitations?: InputMaybe<Invitations_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  teams_users?: InputMaybe<Teams_Users_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Teams_Max_Fields = {
  __typename?: 'teams_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Teams_Min_Fields = {
  __typename?: 'teams_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "teams" */
export type Teams_Mutation_Response = {
  __typename?: 'teams_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Teams>;
};

/** input type for inserting object relation for remote table "teams" */
export type Teams_Obj_Rel_Insert_Input = {
  data: Teams_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Teams_On_Conflict>;
};

/** on_conflict condition type for table "teams" */
export type Teams_On_Conflict = {
  constraint: Teams_Constraint;
  update_columns?: Array<Teams_Update_Column>;
  where?: InputMaybe<Teams_Bool_Exp>;
};

/** Ordering options when selecting data from "teams". */
export type Teams_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitations_aggregate?: InputMaybe<Invitations_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  teams_users_aggregate?: InputMaybe<Teams_Users_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: teams */
export type Teams_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** Projects that are owned by a team */
export type Teams_Projects = {
  __typename?: 'teams_projects';
  created_at: Scalars['timestamptz']['output'];
  /** An object relationship */
  project: Projects;
  project_id: Scalars['uuid']['output'];
  /** An object relationship */
  team: Teams;
  team_id: Scalars['uuid']['output'];
};

/** aggregated selection of "teams_projects" */
export type Teams_Projects_Aggregate = {
  __typename?: 'teams_projects_aggregate';
  aggregate?: Maybe<Teams_Projects_Aggregate_Fields>;
  nodes: Array<Teams_Projects>;
};

export type Teams_Projects_Aggregate_Bool_Exp = {
  count?: InputMaybe<Teams_Projects_Aggregate_Bool_Exp_Count>;
};

export type Teams_Projects_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Teams_Projects_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Teams_Projects_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "teams_projects" */
export type Teams_Projects_Aggregate_Fields = {
  __typename?: 'teams_projects_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Teams_Projects_Max_Fields>;
  min?: Maybe<Teams_Projects_Min_Fields>;
};


/** aggregate fields of "teams_projects" */
export type Teams_Projects_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Teams_Projects_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "teams_projects" */
export type Teams_Projects_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Teams_Projects_Max_Order_By>;
  min?: InputMaybe<Teams_Projects_Min_Order_By>;
};

/** input type for inserting array relation for remote table "teams_projects" */
export type Teams_Projects_Arr_Rel_Insert_Input = {
  data: Array<Teams_Projects_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Teams_Projects_On_Conflict>;
};

/** Boolean expression to filter rows from the table "teams_projects". All fields are combined with a logical 'AND'. */
export type Teams_Projects_Bool_Exp = {
  _and?: InputMaybe<Array<Teams_Projects_Bool_Exp>>;
  _not?: InputMaybe<Teams_Projects_Bool_Exp>;
  _or?: InputMaybe<Array<Teams_Projects_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  project?: InputMaybe<Projects_Bool_Exp>;
  project_id?: InputMaybe<Uuid_Comparison_Exp>;
  team?: InputMaybe<Teams_Bool_Exp>;
  team_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "teams_projects" */
export enum Teams_Projects_Constraint {
  /** unique or primary key constraint on columns "project_id", "team_id" */
  TeamsProjectsPkey = 'teams_projects_pkey'
}

/** input type for inserting data into table "teams_projects" */
export type Teams_Projects_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  project?: InputMaybe<Projects_Obj_Rel_Insert_Input>;
  project_id?: InputMaybe<Scalars['uuid']['input']>;
  team?: InputMaybe<Teams_Obj_Rel_Insert_Input>;
  team_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Teams_Projects_Max_Fields = {
  __typename?: 'teams_projects_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  project_id?: Maybe<Scalars['uuid']['output']>;
  team_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "teams_projects" */
export type Teams_Projects_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Teams_Projects_Min_Fields = {
  __typename?: 'teams_projects_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  project_id?: Maybe<Scalars['uuid']['output']>;
  team_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "teams_projects" */
export type Teams_Projects_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  project_id?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "teams_projects" */
export type Teams_Projects_Mutation_Response = {
  __typename?: 'teams_projects_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Teams_Projects>;
};

/** on_conflict condition type for table "teams_projects" */
export type Teams_Projects_On_Conflict = {
  constraint: Teams_Projects_Constraint;
  update_columns?: Array<Teams_Projects_Update_Column>;
  where?: InputMaybe<Teams_Projects_Bool_Exp>;
};

/** Ordering options when selecting data from "teams_projects". */
export type Teams_Projects_Order_By = {
  created_at?: InputMaybe<Order_By>;
  project?: InputMaybe<Projects_Order_By>;
  project_id?: InputMaybe<Order_By>;
  team?: InputMaybe<Teams_Order_By>;
  team_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: teams_projects */
export type Teams_Projects_Pk_Columns_Input = {
  project_id: Scalars['uuid']['input'];
  team_id: Scalars['uuid']['input'];
};

/** select columns of table "teams_projects" */
export enum Teams_Projects_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  TeamId = 'team_id'
}

/** input type for updating data in table "teams_projects" */
export type Teams_Projects_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  project_id?: InputMaybe<Scalars['uuid']['input']>;
  team_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "teams_projects" */
export type Teams_Projects_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Teams_Projects_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Teams_Projects_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  project_id?: InputMaybe<Scalars['uuid']['input']>;
  team_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "teams_projects" */
export enum Teams_Projects_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ProjectId = 'project_id',
  /** column name */
  TeamId = 'team_id'
}

export type Teams_Projects_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Teams_Projects_Set_Input>;
  /** filter the rows which have to be updated */
  where: Teams_Projects_Bool_Exp;
};

/** columns and relationships of "teams_roles" */
export type Teams_Roles = {
  __typename?: 'teams_roles';
  description: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

/** aggregated selection of "teams_roles" */
export type Teams_Roles_Aggregate = {
  __typename?: 'teams_roles_aggregate';
  aggregate?: Maybe<Teams_Roles_Aggregate_Fields>;
  nodes: Array<Teams_Roles>;
};

/** aggregate fields of "teams_roles" */
export type Teams_Roles_Aggregate_Fields = {
  __typename?: 'teams_roles_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Teams_Roles_Max_Fields>;
  min?: Maybe<Teams_Roles_Min_Fields>;
};


/** aggregate fields of "teams_roles" */
export type Teams_Roles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Teams_Roles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "teams_roles". All fields are combined with a logical 'AND'. */
export type Teams_Roles_Bool_Exp = {
  _and?: InputMaybe<Array<Teams_Roles_Bool_Exp>>;
  _not?: InputMaybe<Teams_Roles_Bool_Exp>;
  _or?: InputMaybe<Array<Teams_Roles_Bool_Exp>>;
  description?: InputMaybe<String_Comparison_Exp>;
  role?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "teams_roles" */
export enum Teams_Roles_Constraint {
  /** unique or primary key constraint on columns "role" */
  TeamsRolesPkey = 'teams_roles_pkey'
}

export enum Teams_Roles_Enum {
  /** An ordinary team member. */
  Member = 'member'
}

/** Boolean expression to compare columns of type "teams_roles_enum". All fields are combined with logical 'AND'. */
export type Teams_Roles_Enum_Comparison_Exp = {
  _eq?: InputMaybe<Teams_Roles_Enum>;
  _in?: InputMaybe<Array<Teams_Roles_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Teams_Roles_Enum>;
  _nin?: InputMaybe<Array<Teams_Roles_Enum>>;
};

/** input type for inserting data into table "teams_roles" */
export type Teams_Roles_Insert_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Teams_Roles_Max_Fields = {
  __typename?: 'teams_roles_max_fields';
  description?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Teams_Roles_Min_Fields = {
  __typename?: 'teams_roles_min_fields';
  description?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "teams_roles" */
export type Teams_Roles_Mutation_Response = {
  __typename?: 'teams_roles_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Teams_Roles>;
};

/** on_conflict condition type for table "teams_roles" */
export type Teams_Roles_On_Conflict = {
  constraint: Teams_Roles_Constraint;
  update_columns?: Array<Teams_Roles_Update_Column>;
  where?: InputMaybe<Teams_Roles_Bool_Exp>;
};

/** Ordering options when selecting data from "teams_roles". */
export type Teams_Roles_Order_By = {
  description?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
};

/** primary key columns input for table: teams_roles */
export type Teams_Roles_Pk_Columns_Input = {
  role: Scalars['String']['input'];
};

/** select columns of table "teams_roles" */
export enum Teams_Roles_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Role = 'role'
}

/** input type for updating data in table "teams_roles" */
export type Teams_Roles_Set_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "teams_roles" */
export type Teams_Roles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Teams_Roles_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Teams_Roles_Stream_Cursor_Value_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "teams_roles" */
export enum Teams_Roles_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Role = 'role'
}

export type Teams_Roles_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Teams_Roles_Set_Input>;
  /** filter the rows which have to be updated */
  where: Teams_Roles_Bool_Exp;
};

/** select columns of table "teams" */
export enum Teams_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "teams" */
export type Teams_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "teams" */
export type Teams_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Teams_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Teams_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "teams" */
export enum Teams_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Teams_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Teams_Set_Input>;
  /** filter the rows which have to be updated */
  where: Teams_Bool_Exp;
};

/** columns and relationships of "teams_users" */
export type Teams_Users = {
  __typename?: 'teams_users';
  created_at: Scalars['timestamptz']['output'];
  role: Teams_Roles_Enum;
  /** An object relationship */
  team: Teams;
  team_id: Scalars['uuid']['output'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid']['output'];
};

/** aggregated selection of "teams_users" */
export type Teams_Users_Aggregate = {
  __typename?: 'teams_users_aggregate';
  aggregate?: Maybe<Teams_Users_Aggregate_Fields>;
  nodes: Array<Teams_Users>;
};

export type Teams_Users_Aggregate_Bool_Exp = {
  count?: InputMaybe<Teams_Users_Aggregate_Bool_Exp_Count>;
};

export type Teams_Users_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Teams_Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Teams_Users_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "teams_users" */
export type Teams_Users_Aggregate_Fields = {
  __typename?: 'teams_users_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Teams_Users_Max_Fields>;
  min?: Maybe<Teams_Users_Min_Fields>;
};


/** aggregate fields of "teams_users" */
export type Teams_Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Teams_Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "teams_users" */
export type Teams_Users_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Teams_Users_Max_Order_By>;
  min?: InputMaybe<Teams_Users_Min_Order_By>;
};

/** input type for inserting array relation for remote table "teams_users" */
export type Teams_Users_Arr_Rel_Insert_Input = {
  data: Array<Teams_Users_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Teams_Users_On_Conflict>;
};

/** Boolean expression to filter rows from the table "teams_users". All fields are combined with a logical 'AND'. */
export type Teams_Users_Bool_Exp = {
  _and?: InputMaybe<Array<Teams_Users_Bool_Exp>>;
  _not?: InputMaybe<Teams_Users_Bool_Exp>;
  _or?: InputMaybe<Array<Teams_Users_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  role?: InputMaybe<Teams_Roles_Enum_Comparison_Exp>;
  team?: InputMaybe<Teams_Bool_Exp>;
  team_id?: InputMaybe<Uuid_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "teams_users" */
export enum Teams_Users_Constraint {
  /** unique or primary key constraint on columns "user_id", "team_id" */
  TeamsUsersPkey = 'teams_users_pkey'
}

/** input type for inserting data into table "teams_users" */
export type Teams_Users_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  role?: InputMaybe<Teams_Roles_Enum>;
  team?: InputMaybe<Teams_Obj_Rel_Insert_Input>;
  team_id?: InputMaybe<Scalars['uuid']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Teams_Users_Max_Fields = {
  __typename?: 'teams_users_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  team_id?: Maybe<Scalars['uuid']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "teams_users" */
export type Teams_Users_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Teams_Users_Min_Fields = {
  __typename?: 'teams_users_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  team_id?: Maybe<Scalars['uuid']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "teams_users" */
export type Teams_Users_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  team_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "teams_users" */
export type Teams_Users_Mutation_Response = {
  __typename?: 'teams_users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Teams_Users>;
};

/** on_conflict condition type for table "teams_users" */
export type Teams_Users_On_Conflict = {
  constraint: Teams_Users_Constraint;
  update_columns?: Array<Teams_Users_Update_Column>;
  where?: InputMaybe<Teams_Users_Bool_Exp>;
};

/** Ordering options when selecting data from "teams_users". */
export type Teams_Users_Order_By = {
  created_at?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  team?: InputMaybe<Teams_Order_By>;
  team_id?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: teams_users */
export type Teams_Users_Pk_Columns_Input = {
  team_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};

/** select columns of table "teams_users" */
export enum Teams_Users_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Role = 'role',
  /** column name */
  TeamId = 'team_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "teams_users" */
export type Teams_Users_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  role?: InputMaybe<Teams_Roles_Enum>;
  team_id?: InputMaybe<Scalars['uuid']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "teams_users" */
export type Teams_Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Teams_Users_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Teams_Users_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  role?: InputMaybe<Teams_Roles_Enum>;
  team_id?: InputMaybe<Scalars['uuid']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "teams_users" */
export enum Teams_Users_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Role = 'role',
  /** column name */
  TeamId = 'team_id',
  /** column name */
  UserId = 'user_id'
}

export type Teams_Users_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Teams_Users_Set_Input>;
  /** filter the rows which have to be updated */
  where: Teams_Users_Bool_Exp;
};

/** Angles associated with a given theme */
export type Themes_Angles = {
  __typename?: 'themes_angles';
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  /** An object relationship */
  theme: Projects_Themes;
  theme_id: Scalars['uuid']['output'];
  updated_at: Scalars['timestamptz']['output'];
};

/** aggregated selection of "themes_angles" */
export type Themes_Angles_Aggregate = {
  __typename?: 'themes_angles_aggregate';
  aggregate?: Maybe<Themes_Angles_Aggregate_Fields>;
  nodes: Array<Themes_Angles>;
};

export type Themes_Angles_Aggregate_Bool_Exp = {
  count?: InputMaybe<Themes_Angles_Aggregate_Bool_Exp_Count>;
};

export type Themes_Angles_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Themes_Angles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Themes_Angles_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "themes_angles" */
export type Themes_Angles_Aggregate_Fields = {
  __typename?: 'themes_angles_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Themes_Angles_Max_Fields>;
  min?: Maybe<Themes_Angles_Min_Fields>;
};


/** aggregate fields of "themes_angles" */
export type Themes_Angles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Themes_Angles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "themes_angles" */
export type Themes_Angles_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Themes_Angles_Max_Order_By>;
  min?: InputMaybe<Themes_Angles_Min_Order_By>;
};

/** input type for inserting array relation for remote table "themes_angles" */
export type Themes_Angles_Arr_Rel_Insert_Input = {
  data: Array<Themes_Angles_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Themes_Angles_On_Conflict>;
};

/** Boolean expression to filter rows from the table "themes_angles". All fields are combined with a logical 'AND'. */
export type Themes_Angles_Bool_Exp = {
  _and?: InputMaybe<Array<Themes_Angles_Bool_Exp>>;
  _not?: InputMaybe<Themes_Angles_Bool_Exp>;
  _or?: InputMaybe<Array<Themes_Angles_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  theme?: InputMaybe<Projects_Themes_Bool_Exp>;
  theme_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "themes_angles" */
export enum Themes_Angles_Constraint {
  /** unique or primary key constraint on columns "id" */
  ThemesAnglesPkey = 'themes_angles_pkey'
}

/** input type for inserting data into table "themes_angles" */
export type Themes_Angles_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  theme?: InputMaybe<Projects_Themes_Obj_Rel_Insert_Input>;
  theme_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Themes_Angles_Max_Fields = {
  __typename?: 'themes_angles_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  theme_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "themes_angles" */
export type Themes_Angles_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  theme_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Themes_Angles_Min_Fields = {
  __typename?: 'themes_angles_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  theme_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "themes_angles" */
export type Themes_Angles_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  theme_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "themes_angles" */
export type Themes_Angles_Mutation_Response = {
  __typename?: 'themes_angles_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Themes_Angles>;
};

/** on_conflict condition type for table "themes_angles" */
export type Themes_Angles_On_Conflict = {
  constraint: Themes_Angles_Constraint;
  update_columns?: Array<Themes_Angles_Update_Column>;
  where?: InputMaybe<Themes_Angles_Bool_Exp>;
};

/** Ordering options when selecting data from "themes_angles". */
export type Themes_Angles_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  theme?: InputMaybe<Projects_Themes_Order_By>;
  theme_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: themes_angles */
export type Themes_Angles_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "themes_angles" */
export enum Themes_Angles_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  ThemeId = 'theme_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "themes_angles" */
export type Themes_Angles_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  theme_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "themes_angles" */
export type Themes_Angles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Themes_Angles_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Themes_Angles_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  theme_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "themes_angles" */
export enum Themes_Angles_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  ThemeId = 'theme_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Themes_Angles_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Themes_Angles_Set_Input>;
  /** filter the rows which have to be updated */
  where: Themes_Angles_Bool_Exp;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  avatar_file_key?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['timestamptz']['output'];
  display_name?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  email_verification_code?: Maybe<Scalars['String']['output']>;
  email_verified: Scalars['Boolean']['output'];
  hashed_password: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  password_at: Scalars['timestamptz']['output'];
  password_reset_code?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  teams_users: Array<Teams_Users>;
  /** An aggregate relationship */
  teams_users_aggregate: Teams_Users_Aggregate;
  updated_at: Scalars['timestamptz']['output'];
};


/** columns and relationships of "users" */
export type UsersTeams_UsersArgs = {
  distinct_on?: InputMaybe<Array<Teams_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Teams_Users_Order_By>>;
  where?: InputMaybe<Teams_Users_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersTeams_Users_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Teams_Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Teams_Users_Order_By>>;
  where?: InputMaybe<Teams_Users_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  avatar_file_key?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  display_name?: InputMaybe<String_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  email_verification_code?: InputMaybe<String_Comparison_Exp>;
  email_verified?: InputMaybe<Boolean_Comparison_Exp>;
  hashed_password?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  password_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  password_reset_code?: InputMaybe<String_Comparison_Exp>;
  teams_users?: InputMaybe<Teams_Users_Bool_Exp>;
  teams_users_aggregate?: InputMaybe<Teams_Users_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint on columns "email" */
  UsersEmailKey = 'users_email_key',
  /** unique or primary key constraint on columns "id" */
  UsersPkey = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  avatar_file_key?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  email_verification_code?: InputMaybe<Scalars['String']['input']>;
  email_verified?: InputMaybe<Scalars['Boolean']['input']>;
  hashed_password?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  password_at?: InputMaybe<Scalars['timestamptz']['input']>;
  password_reset_code?: InputMaybe<Scalars['String']['input']>;
  teams_users?: InputMaybe<Teams_Users_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  avatar_file_key?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  display_name?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  email_verification_code?: Maybe<Scalars['String']['output']>;
  hashed_password?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  password_at?: Maybe<Scalars['timestamptz']['output']>;
  password_reset_code?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  avatar_file_key?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  display_name?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  email_verification_code?: Maybe<Scalars['String']['output']>;
  hashed_password?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  password_at?: Maybe<Scalars['timestamptz']['output']>;
  password_reset_code?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on_conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  avatar_file_key?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  display_name?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  email_verification_code?: InputMaybe<Order_By>;
  email_verified?: InputMaybe<Order_By>;
  hashed_password?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  password_at?: InputMaybe<Order_By>;
  password_reset_code?: InputMaybe<Order_By>;
  teams_users_aggregate?: InputMaybe<Teams_Users_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  AvatarFileKey = 'avatar_file_key',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  Email = 'email',
  /** column name */
  EmailVerificationCode = 'email_verification_code',
  /** column name */
  EmailVerified = 'email_verified',
  /** column name */
  HashedPassword = 'hashed_password',
  /** column name */
  Id = 'id',
  /** column name */
  PasswordAt = 'password_at',
  /** column name */
  PasswordResetCode = 'password_reset_code',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  avatar_file_key?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  email_verification_code?: InputMaybe<Scalars['String']['input']>;
  email_verified?: InputMaybe<Scalars['Boolean']['input']>;
  hashed_password?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  password_at?: InputMaybe<Scalars['timestamptz']['input']>;
  password_reset_code?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "users" */
export type Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Users_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_Stream_Cursor_Value_Input = {
  avatar_file_key?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  display_name?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  email_verification_code?: InputMaybe<Scalars['String']['input']>;
  email_verified?: InputMaybe<Scalars['Boolean']['input']>;
  hashed_password?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  password_at?: InputMaybe<Scalars['timestamptz']['input']>;
  password_reset_code?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  AvatarFileKey = 'avatar_file_key',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  Email = 'email',
  /** column name */
  EmailVerificationCode = 'email_verification_code',
  /** column name */
  EmailVerified = 'email_verified',
  /** column name */
  HashedPassword = 'hashed_password',
  /** column name */
  Id = 'id',
  /** column name */
  PasswordAt = 'password_at',
  /** column name */
  PasswordResetCode = 'password_reset_code',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Users_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Users_Set_Input>;
  /** filter the rows which have to be updated */
  where: Users_Bool_Exp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

export type UpdateAngleMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateAngleMutation = { __typename?: 'mutation_root', update_themes_angles_by_pk?: { __typename?: 'themes_angles', id: any } | null };

export type CreateAngleMutationVariables = Exact<{
  name: Scalars['String']['input'];
  themeId: Scalars['uuid']['input'];
}>;


export type CreateAngleMutation = { __typename?: 'mutation_root', insert_themes_angles_one?: { __typename?: 'themes_angles', name: string, id: any } | null };

export type UpdateDisplayNameMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  avatar_file_key?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateDisplayNameMutation = { __typename?: 'mutation_root', update_users_by_pk?: { __typename?: 'users', avatar_file_key?: string | null, email: string, display_name?: string | null } | null };

export type DestroyUserMutationVariables = Exact<{
  password: Scalars['String']['input'];
}>;


export type DestroyUserMutation = { __typename?: 'mutation_root', destroyUser: boolean };

export type ChangePasswordMutationVariables = Exact<{
  oldPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type ChangePasswordMutation = { __typename?: 'mutation_root', changePassword: boolean };

export type ChangeEmailMutationVariables = Exact<{
  newEmail: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type ChangeEmailMutation = { __typename?: 'mutation_root', changeEmail: boolean };

export type UpdateUserMutationVariables = Exact<{
  display_name: Scalars['String']['input'];
  id: Scalars['uuid']['input'];
}>;


export type UpdateUserMutation = { __typename?: 'mutation_root', update_users_by_pk?: { __typename?: 'users', display_name?: string | null, avatar_file_key?: string | null, email: string } | null };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'mutation_root', register?: { __typename?: 'RegisterOutput', token: string, id: string } | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'mutation_root', login?: { __typename?: 'LoginOutput', token: string, id: string } | null };

export type SendPasswordResetEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SendPasswordResetEmailMutation = { __typename?: 'mutation_root', sendPasswordResetEmail: boolean };

export type VerifyEmailMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type VerifyEmailMutation = { __typename?: 'mutation_root', verifyEmail: boolean };

export type ResetPasswordMutationVariables = Exact<{
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'mutation_root', resetPassword: boolean };

export type SubmitContactFormMutationVariables = Exact<{
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  message: Scalars['String']['input'];
}>;


export type SubmitContactFormMutation = { __typename?: 'mutation_root', insert_contact_form_submissions?: { __typename?: 'contact_form_submissions_mutation_response', affected_rows: number } | null };

export type FacebookApiGetMutationVariables = Exact<{
  url: Scalars['String']['input'];
}>;


export type FacebookApiGetMutation = { __typename?: 'mutation_root', facebookAPIGet: any };

export type FetchFacebookCreativeTemplatesQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchFacebookCreativeTemplatesQuery = { __typename?: 'query_root', facebook_creative_templates: Array<{ __typename?: 'facebook_creative_templates', name: string, ui_schema?: any | null, json_schema: any, updated_at: any, created_at: any, description?: string | null, creatomate_template_id: string, id: any }> };

export type UpdateFacebookAudiencesByProjectIdMutationVariables = Exact<{
  geo_locations: Scalars['jsonb']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  genders?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
  id: Scalars['uuid']['input'];
  min_age?: InputMaybe<Scalars['numeric']['input']>;
  max_age?: InputMaybe<Scalars['numeric']['input']>;
  device_platforms?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  facebook_positions?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  interests: Scalars['jsonb']['input'];
}>;


export type UpdateFacebookAudiencesByProjectIdMutation = { __typename?: 'mutation_root', update_facebook_audiences_by_pk?: { __typename?: 'facebook_audiences', id: any, name?: string | null, geo_locations: any, genders?: Array<number> | null, interests?: any | null, device_platforms: Array<string>, facebook_positions: Array<string>, min_age?: any | null, max_age?: any | null, updated_at: any } | null };

export type CreateFacebookAudienceMutationVariables = Exact<{
  geo_locations: Scalars['jsonb']['input'];
  name: Scalars['String']['input'];
  projectId: Scalars['uuid']['input'];
  publisher_platforms?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type CreateFacebookAudienceMutation = { __typename?: 'mutation_root', insert_facebook_audiences_one?: { __typename?: 'facebook_audiences', id: any, name?: string | null, geo_locations: any, device_platforms: Array<string>, interests?: any | null, publisher_platforms: Array<string>, facebook_positions: Array<string>, genders?: Array<number> | null, updated_at: any } | null };

export type GetFacebookAudiencesByProjectIdQueryVariables = Exact<{
  projectId: Scalars['uuid']['input'];
}>;


export type GetFacebookAudiencesByProjectIdQuery = { __typename?: 'query_root', facebook_audiences: Array<{ __typename?: 'facebook_audiences', id: any, name?: string | null, geo_locations: any, device_platforms: Array<string>, interests?: any | null, facebook_positions: Array<string>, genders?: Array<number> | null, min_age?: any | null, max_age?: any | null, updated_at: any }> };

export type CreateFacebookCreativeMutationVariables = Exact<{
  projectId: Scalars['uuid']['input'];
  templateId: Scalars['uuid']['input'];
}>;


export type CreateFacebookCreativeMutation = { __typename?: 'mutation_root', insert_facebook_creatives?: { __typename?: 'facebook_creatives_mutation_response', returning: Array<{ __typename?: 'facebook_creatives', id: any, created_at: any, data?: any | null, project_id: any, template_id: any, updated_at: any }> } | null };

export type FetchFacebookCreativesByProjectIdQueryVariables = Exact<{
  projectId: Scalars['uuid']['input'];
}>;


export type FetchFacebookCreativesByProjectIdQuery = { __typename?: 'query_root', facebook_creatives: Array<{ __typename?: 'facebook_creatives', project_id: any, template_id: any, updated_at: any, id: any, data?: any | null, created_at: any, facebook_creative_template: { __typename?: 'facebook_creative_templates', created_at: any, creatomate_template_id: string, description?: string | null, id: any, json_schema: any, name: string, ui_schema?: any | null, updated_at: any } }> };

export type FetchFacebookCreativeWithTemplateQueryVariables = Exact<{
  facebookCreativeId: Scalars['uuid']['input'];
}>;


export type FetchFacebookCreativeWithTemplateQuery = { __typename?: 'query_root', facebook_creatives_by_pk?: { __typename?: 'facebook_creatives', created_at: any, data?: any | null, id: any, project_id: any, template_id: any, updated_at: any, facebook_creative_template: { __typename?: 'facebook_creative_templates', created_at: any, creatomate_template_id: string, description?: string | null, id: any, json_schema: any, name: string, ui_schema?: any | null, updated_at: any } } | null };

export type UpdateFacebookCreativeMutationVariables = Exact<{
  facebookCreativeId: Scalars['uuid']['input'];
  data: Scalars['jsonb']['input'];
}>;


export type UpdateFacebookCreativeMutation = { __typename?: 'mutation_root', update_facebook_creatives_by_pk?: { __typename?: 'facebook_creatives', id: any, data?: any | null } | null };

export type CreateProjectMutationVariables = Exact<{
  name: Scalars['String']['input'];
  team_id: Scalars['uuid']['input'];
}>;


export type CreateProjectMutation = { __typename?: 'mutation_root', createProject?: { __typename?: 'ProjectOutput', id: any, name: string, team_id: any } | null };

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type DeleteProjectMutation = { __typename?: 'mutation_root', delete_projects_by_pk?: { __typename?: 'projects', id: any } | null };

export type UpdateProjectMutationVariables = Exact<{
  projectId: Scalars['uuid']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  objective?: InputMaybe<Scalars['String']['input']>;
  branding?: InputMaybe<Scalars['String']['input']>;
  platform?: InputMaybe<Scalars['String']['input']>;
  projectType?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['timestamptz']['input']>;
  stopTime?: InputMaybe<Scalars['timestamptz']['input']>;
}>;


export type UpdateProjectMutation = { __typename?: 'mutation_root', update_projects_by_pk?: { __typename?: 'projects', name: string, objective?: string | null, branding?: string | null, platform?: string | null, project_type?: string | null, is_draft: boolean, updated_at: any, start_time?: any | null, stop_time?: any | null } | null };

export type FetchProjectQueryVariables = Exact<{
  projectId: Scalars['uuid']['input'];
}>;


export type FetchProjectQuery = { __typename?: 'query_root', projects_by_pk?: { __typename?: 'projects', id: any, name: string, objective?: string | null, branding?: string | null, platform?: string | null, project_type?: string | null, is_draft: boolean, created_at: any, updated_at: any, start_time?: any | null, stop_time?: any | null } | null };

export type FetchProjectsQueryVariables = Exact<{
  teamId: Scalars['uuid']['input'];
}>;


export type FetchProjectsQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'projects', name: string, id: any, is_draft: boolean, project_type?: string | null, start_time?: any | null, stop_time?: any | null, created_at: any }> };

export type InviteUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  teamId: Scalars['uuid']['input'];
}>;


export type InviteUserMutation = { __typename?: 'mutation_root', insert_invitations_one?: { __typename?: 'invitations', created_at: any } | null };

export type CreateTeamMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateTeamMutation = { __typename?: 'mutation_root', createTeam: boolean };

export type FetchTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchTeamsQuery = { __typename?: 'query_root', teams: Array<{ __typename?: 'teams', name: string, id: any, created_at: any, teams_users_aggregate: { __typename?: 'teams_users_aggregate', aggregate?: { __typename?: 'teams_users_aggregate_fields', count: number } | null }, teams_users: Array<{ __typename?: 'teams_users', user_id: any, role: Teams_Roles_Enum }> }> };

export type FetchTeamQueryVariables = Exact<{
  teamId: Scalars['uuid']['input'];
}>;


export type FetchTeamQuery = { __typename?: 'query_root', teams_by_pk?: { __typename?: 'teams', id: any, name: string, created_at: any, teams_users: Array<{ __typename?: 'teams_users', user_id: any, created_at: any, user: { __typename?: 'users', email: string, created_at: any } }> } | null };

export type CheckMembershipQueryVariables = Exact<{
  teamId: Scalars['uuid']['input'];
  userId: Scalars['uuid']['input'];
}>;


export type CheckMembershipQuery = { __typename?: 'query_root', teams_users: Array<{ __typename?: 'teams_users', team_id: any }> };

export type LeaveTeamMutationVariables = Exact<{
  teamId: Scalars['uuid']['input'];
}>;


export type LeaveTeamMutation = { __typename?: 'mutation_root', leaveTeam: boolean };

export type JoinTeamMutationVariables = Exact<{
  teamId: Scalars['uuid']['input'];
}>;


export type JoinTeamMutation = { __typename?: 'mutation_root', joinTeam: boolean };

export type FetchThemesQueryVariables = Exact<{
  projectId: Scalars['uuid']['input'];
}>;


export type FetchThemesQuery = { __typename?: 'query_root', projects_themes: Array<{ __typename?: 'projects_themes', id: any, name: string, angles: Array<{ __typename?: 'themes_angles', id: any, name: string }> }> };

export type UpdateThemeMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateThemeMutation = { __typename?: 'mutation_root', update_projects_themes_by_pk?: { __typename?: 'projects_themes', id: any } | null };

export type DeleteThemeMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type DeleteThemeMutation = { __typename?: 'mutation_root', delete_projects_themes_by_pk?: { __typename?: 'projects_themes', id: any } | null };

export type CreateThemeMutationVariables = Exact<{
  name: Scalars['String']['input'];
  projectId: Scalars['uuid']['input'];
}>;


export type CreateThemeMutation = { __typename?: 'mutation_root', insert_projects_themes_one?: { __typename?: 'projects_themes', name: string, id: any } | null };


export const UpdateAngleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateAngle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_themes_angles_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateAngleMutation, UpdateAngleMutationVariables>;
export const CreateAngleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createAngle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"themeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_themes_angles_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"theme_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"themeId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateAngleMutation, CreateAngleMutationVariables>;
export const UpdateDisplayNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDisplayName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"avatar_file_key"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_users_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"avatar_file_key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"avatar_file_key"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatar_file_key"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"display_name"}}]}}]}}]} as unknown as DocumentNode<UpdateDisplayNameMutation, UpdateDisplayNameMutationVariables>;
export const DestroyUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DestroyUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"destroyUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<DestroyUserMutation, DestroyUserMutationVariables>;
export const ChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"oldPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"oldPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"oldPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}]}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ChangeEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newEmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newEmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newEmail"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<ChangeEmailMutation, ChangeEmailMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"display_name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_users_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"display_name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"display_name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"display_name"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_file_key"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const SendPasswordResetEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendPasswordResetEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendPasswordResetEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<SendPasswordResetEmailMutation, SendPasswordResetEmailMutationVariables>;
export const VerifyEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}]}]}}]} as unknown as DocumentNode<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}]}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SubmitContactFormDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitContactForm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_contact_form_submissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affected_rows"}}]}}]}}]} as unknown as DocumentNode<SubmitContactFormMutation, SubmitContactFormMutationVariables>;
export const FacebookApiGetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FacebookAPIGet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"facebookAPIGet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}}]}]}}]} as unknown as DocumentNode<FacebookApiGetMutation, FacebookApiGetMutationVariables>;
export const FetchFacebookCreativeTemplatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchFacebookCreativeTemplates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"facebook_creative_templates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"asc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ui_schema"}},{"kind":"Field","name":{"kind":"Name","value":"json_schema"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"creatomate_template_id"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<FetchFacebookCreativeTemplatesQuery, FetchFacebookCreativeTemplatesQueryVariables>;
export const UpdateFacebookAudiencesByProjectIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFacebookAudiencesByProjectID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"geo_locations"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"jsonb"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"genders"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"min_age"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"numeric"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"max_age"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"numeric"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"device_platforms"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"facebook_positions"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"interests"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"jsonb"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_facebook_audiences_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"geo_locations"},"value":{"kind":"Variable","name":{"kind":"Name","value":"geo_locations"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"genders"},"value":{"kind":"Variable","name":{"kind":"Name","value":"genders"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"min_age"},"value":{"kind":"Variable","name":{"kind":"Name","value":"min_age"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"max_age"},"value":{"kind":"Variable","name":{"kind":"Name","value":"max_age"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"device_platforms"},"value":{"kind":"Variable","name":{"kind":"Name","value":"device_platforms"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"facebook_positions"},"value":{"kind":"Variable","name":{"kind":"Name","value":"facebook_positions"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"interests"},"value":{"kind":"Variable","name":{"kind":"Name","value":"interests"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"geo_locations"}},{"kind":"Field","name":{"kind":"Name","value":"genders"}},{"kind":"Field","name":{"kind":"Name","value":"interests"}},{"kind":"Field","name":{"kind":"Name","value":"device_platforms"}},{"kind":"Field","name":{"kind":"Name","value":"facebook_positions"}},{"kind":"Field","name":{"kind":"Name","value":"min_age"}},{"kind":"Field","name":{"kind":"Name","value":"max_age"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<UpdateFacebookAudiencesByProjectIdMutation, UpdateFacebookAudiencesByProjectIdMutationVariables>;
export const CreateFacebookAudienceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFacebookAudience"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"geo_locations"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"jsonb"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publisher_platforms"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_facebook_audiences_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"geo_locations"},"value":{"kind":"Variable","name":{"kind":"Name","value":"geo_locations"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"project_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"publisher_platforms"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publisher_platforms"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"geo_locations"}},{"kind":"Field","name":{"kind":"Name","value":"device_platforms"}},{"kind":"Field","name":{"kind":"Name","value":"interests"}},{"kind":"Field","name":{"kind":"Name","value":"publisher_platforms"}},{"kind":"Field","name":{"kind":"Name","value":"facebook_positions"}},{"kind":"Field","name":{"kind":"Name","value":"genders"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<CreateFacebookAudienceMutation, CreateFacebookAudienceMutationVariables>;
export const GetFacebookAudiencesByProjectIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFacebookAudiencesByProjectID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"facebook_audiences"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"project_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"geo_locations"}},{"kind":"Field","name":{"kind":"Name","value":"device_platforms"}},{"kind":"Field","name":{"kind":"Name","value":"interests"}},{"kind":"Field","name":{"kind":"Name","value":"facebook_positions"}},{"kind":"Field","name":{"kind":"Name","value":"genders"}},{"kind":"Field","name":{"kind":"Name","value":"min_age"}},{"kind":"Field","name":{"kind":"Name","value":"max_age"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<GetFacebookAudiencesByProjectIdQuery, GetFacebookAudiencesByProjectIdQueryVariables>;
export const CreateFacebookCreativeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFacebookCreative"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"templateId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_facebook_creatives"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"project_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"template_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"templateId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"project_id"}},{"kind":"Field","name":{"kind":"Name","value":"template_id"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]}}]} as unknown as DocumentNode<CreateFacebookCreativeMutation, CreateFacebookCreativeMutationVariables>;
export const FetchFacebookCreativesByProjectIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchFacebookCreativesByProjectID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"facebook_creatives"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"project_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project_id"}},{"kind":"Field","name":{"kind":"Name","value":"template_id"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"facebook_creative_template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"creatomate_template_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"json_schema"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ui_schema"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]}}]} as unknown as DocumentNode<FetchFacebookCreativesByProjectIdQuery, FetchFacebookCreativesByProjectIdQueryVariables>;
export const FetchFacebookCreativeWithTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchFacebookCreativeWithTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"facebookCreativeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"facebook_creatives_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"facebookCreativeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"project_id"}},{"kind":"Field","name":{"kind":"Name","value":"template_id"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"facebook_creative_template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"creatomate_template_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"json_schema"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ui_schema"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]}}]} as unknown as DocumentNode<FetchFacebookCreativeWithTemplateQuery, FetchFacebookCreativeWithTemplateQueryVariables>;
export const UpdateFacebookCreativeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFacebookCreative"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"facebookCreativeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"jsonb"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_facebook_creatives_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"facebookCreativeId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]} as unknown as DocumentNode<UpdateFacebookCreativeMutation, UpdateFacebookCreativeMutationVariables>;
export const CreateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"team_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"team_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"team_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"team_id"}}]}}]}}]} as unknown as DocumentNode<CreateProjectMutation, CreateProjectMutationVariables>;
export const DeleteProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_projects_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const UpdateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"objective"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"branding"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"platform"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"timestamptz"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stopTime"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"timestamptz"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_projects_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"objective"},"value":{"kind":"Variable","name":{"kind":"Name","value":"objective"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"branding"},"value":{"kind":"Variable","name":{"kind":"Name","value":"branding"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"platform"},"value":{"kind":"Variable","name":{"kind":"Name","value":"platform"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"project_type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectType"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"start_time"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startTime"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"stop_time"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stopTime"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"objective"}},{"kind":"Field","name":{"kind":"Name","value":"branding"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"project_type"}},{"kind":"Field","name":{"kind":"Name","value":"is_draft"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"stop_time"}}]}}]}}]} as unknown as DocumentNode<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const FetchProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"objective"}},{"kind":"Field","name":{"kind":"Name","value":"branding"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"project_type"}},{"kind":"Field","name":{"kind":"Name","value":"is_draft"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"stop_time"}}]}}]}}]} as unknown as DocumentNode<FetchProjectQuery, FetchProjectQueryVariables>;
export const FetchProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchProjects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"teams_projects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"team_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}]}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"created_at"},"value":{"kind":"EnumValue","value":"desc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"is_draft"}},{"kind":"Field","name":{"kind":"Name","value":"project_type"}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"stop_time"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<FetchProjectsQuery, FetchProjectsQueryVariables>;
export const InviteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"inviteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_invitations_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"team_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<InviteUserMutation, InviteUserMutationVariables>;
export const CreateTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}]}}]} as unknown as DocumentNode<CreateTeamMutation, CreateTeamMutationVariables>;
export const FetchTeamsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchTeams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"teams_users_aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"teams_users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<FetchTeamsQuery, FetchTeamsQueryVariables>;
export const FetchTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"teams_users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FetchTeamQuery, FetchTeamQueryVariables>;
export const CheckMembershipDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"checkMembership"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams_users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_and"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"team_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"team_id"}}]}}]}}]} as unknown as DocumentNode<CheckMembershipQuery, CheckMembershipQueryVariables>;
export const LeaveTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"leaveTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaveTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}]}]}}]} as unknown as DocumentNode<LeaveTeamMutation, LeaveTeamMutationVariables>;
export const JoinTeamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"joinTeam"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"joinTeam"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"teamId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"teamId"}}}]}]}}]} as unknown as DocumentNode<JoinTeamMutation, JoinTeamMutationVariables>;
export const FetchThemesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchThemes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects_themes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"project_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"EnumValue","value":"desc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"angles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"EnumValue","value":"desc"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<FetchThemesQuery, FetchThemesQueryVariables>;
export const UpdateThemeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTheme"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_projects_themes_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateThemeMutation, UpdateThemeMutationVariables>;
export const DeleteThemeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTheme"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_projects_themes_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteThemeMutation, DeleteThemeMutationVariables>;
export const CreateThemeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTheme"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_projects_themes_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"project_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateThemeMutation, CreateThemeMutationVariables>;