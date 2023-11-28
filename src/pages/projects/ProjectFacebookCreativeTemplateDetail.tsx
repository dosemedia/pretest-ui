import { QueryKey, useQuery, useMutation } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { useContext, useState, useEffect, createRef, useCallback } from 'react'
import ErrorMessage from "../../components/lib/Error";
import { ProjectFacebookCreativeTemplatesContext } from "../../stores/stores";
import { SpinningLoading } from "../../components/lib/SpinningLoading";
import validator from '@rjsf/validator-ajv8'
import Form from '@rjsf/core'
// import { RJSFValidationError } from '@rjsf/utils'
import { RegistryFieldsType } from '@rjsf/utils' // UiSchema
import FileUrlField from "../../components/rjsf/FileUrlField";
import CreatomateTemplates from "../../components/CreatomateTemplates";
import _ from 'lodash'
import { Project_Facebook_Creative_Templates as ProjectFacebookCreativeTemplate } from "../../gql/graphql";

const projectFacebookCreativeTemplateDetail = observer(({ projectFacebookCreativeTemplateId }: { projectId: string, projectFacebookCreativeTemplateId: string }) => {
  const [formData, setFormData] = useState(null);
  const [ignoreSave, setIgnoreSave] = useState(false);
  // https://rjsf-team.github.io/react-jsonschema-form/docs/usage/validation
  const [validFormData, setValidFormData] = useState(null);
  const formRef = createRef<Form>();
  const projectFacebookCreativeTemplateStore = useContext(ProjectFacebookCreativeTemplatesContext)

  const { data: projectFacebookCreativeTemplate, error: facebookCreativeError, isLoading: isLoadingFacebookCreative, refetch } = useQuery<Promise<ProjectFacebookCreativeTemplate | undefined>, Error, ProjectFacebookCreativeTemplate, QueryKey>({
    queryKey: ['facebookCreative', projectFacebookCreativeTemplateId],
    queryFn: async () => {
      const creative = await projectFacebookCreativeTemplateStore.fetchProjectFacebookCreativeTemplateWithTemplate(projectFacebookCreativeTemplateId)
      // Prevent save trigger from this initial load
      setIgnoreSave(true)
      setFormData(creative?.data)
      if (creative?.data) {
        setValidFormData(creative?.data)
      }
      return creative
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debouncedFormData = useCallback(_.debounce((data: any) => {
    updateCreative.mutate(data)
  }, 1000), [])

  const updateCreative = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (data: any) => {
      console.log('~~ updateFacebookCreative')
      await projectFacebookCreativeTemplateStore.updateProjectFacebookCreativeTemplate(projectFacebookCreativeTemplate?.id, data)
    },
    onSuccess: () => refetch()
  })

  const customFields: RegistryFieldsType = { fileUrl: FileUrlField }


  return (
    <>
      <div className="m-8">
        <div className="flex flex-wrap justify-between items-start">
          <div className="w-6/12">
            {isLoadingFacebookCreative && <SpinningLoading isLoading={isLoadingFacebookCreative} />}
            {facebookCreativeError && <ErrorMessage message={facebookCreativeError.message} />}
            {projectFacebookCreativeTemplate&&
              // We could also use this which is very similar : https://jsonforms.io/docs/integrations/react/
              <Form
                schema={projectFacebookCreativeTemplate?.facebook_creative_template.json_schema}
                validator={validator}
                formData={formData}
                onChange={(e) => { debouncedFormData(e.formData) }}
                // onError={(e) => {setFormErrors(e)}}
                ref={formRef}
                fields={customFields}
                uiSchema={projectFacebookCreativeTemplate?.facebook_creative_template.ui_schema}
              >
                <div>{ /* Hide submit form! */}</div>
              </Form>
            }
            {validFormData && <div className="mt-5">Data : {JSON.stringify(validFormData)}</div>}
            {updateCreative.isLoading && <div>Saving...</div>}
          </div>
          <div className="w-5/12">
            <CreatomateTemplates templateId={projectFacebookCreativeTemplate?.facebook_creative_template.creatomate_template_id} data={validFormData} />
          </div>
        </div>
      </div>
    </>
  )
})

export default projectFacebookCreativeTemplateDetail