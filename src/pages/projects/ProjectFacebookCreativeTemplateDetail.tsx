import { QueryKey, useQuery, useMutation } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { useContext, useState, createRef, useEffect, useCallback } from 'react'
import ErrorMessage from "../../components/lib/Error";
import { ProjectFacebookCreativeTemplatesContext } from "../../stores/stores";
import { SpinningLoading } from "../../components/lib/SpinningLoading";
import validator from '@rjsf/validator-ajv8'
import Form from '@rjsf/core'
import { useSearchParams } from 'react-router-dom'
import { RegistryFieldsType } from '@rjsf/utils' // UiSchema
import FileUrlField from "../../components/rjsf/FileUrlField";
import _ from 'lodash'
import { Project_Facebook_Creative_Templates as ProjectFacebookCreativeTemplate } from "../../gql/graphql";
import ColorPickerField from "../../components/rjsf/ColorPickerField";

const projectFacebookCreativeTemplateDetail = observer(({ projectFacebookCreativeTemplateId }: { projectFacebookCreativeTemplateId: string }) => {
  const [formData, setFormData] = useState(null);
  // https://rjsf-team.github.io/react-jsonschema-form/docs/usage/validation
  const formRef = createRef<Form>();
  const [searchParams, setSearchParams] = useSearchParams()
  const projectFacebookCreativeTemplateStore = useContext(ProjectFacebookCreativeTemplatesContext)

  const { data: projectFacebookCreativeTemplate, error: facebookCreativeError, isLoading: isLoadingFacebookCreative, refetch } = useQuery<Promise<ProjectFacebookCreativeTemplate | undefined>, Error, ProjectFacebookCreativeTemplate, QueryKey>({
    queryKey: ['facebookCreative', projectFacebookCreativeTemplateId],
    queryFn: async () => {
      const creative = await projectFacebookCreativeTemplateStore.fetchProjectFacebookCreativeTemplateWithTemplate(projectFacebookCreativeTemplateId)
      // Prevent save trigger from this initial load
      setFormData(creative?.data)
      return creative
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debouncedFormData = useCallback(_.debounce((data: any) => {
    if (Object.keys(data).length > 0) {
      updateCreative.mutate(data)
    }
  }, 1000), [])

  const deleteProjectFacebookCreativeTemplateMutation = useMutation({
    mutationKey: ['deleteProjectFacebookCreativeTemplateMutation'],
    mutationFn: () => projectFacebookCreativeTemplateStore.deleteProjectFacebookCreativeTemplate(projectFacebookCreativeTemplateId),
    onSuccess: () => { searchParams.delete('project_facebook_creative_template_id'); searchParams.set('step', '6'); setSearchParams(searchParams) }
  })

  const updateCreative = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (data: any) => {
      console.log('~~ updateFacebookCreative')
      for (const key of Object.keys(projectFacebookCreativeTemplate?.facebook_creative_template.ui_schema)) {
        const item = projectFacebookCreativeTemplate?.facebook_creative_template.ui_schema[key]
        if (item['ui:widget'] === 'hidden') {
          data[key] = 'Place your copy here'
        }
      }
      return await projectFacebookCreativeTemplateStore.updateProjectFacebookCreativeTemplate(projectFacebookCreativeTemplate?.id, data)
    },
    onSuccess: () => refetch()
  })

  const customFields: RegistryFieldsType = { fileUrl: FileUrlField , colorPicker: ColorPickerField }

  useEffect(() => {
    if (!searchParams.get('project_facebook_creative_template_id')) {
      setSearchParams({ step: '6' })
    }
  }, [])


  return (
    <>
      <div className="mb-12">
        <button className="btn bg-error text-white normal-case border-none mb-3" onClick={() => deleteProjectFacebookCreativeTemplateMutation.mutate()}><SpinningLoading isLoading={deleteProjectFacebookCreativeTemplateMutation.isLoading} />Stop Using Template</button>
        <div className="flex flex-wrap justify-between items-start">
          <div className="w-6/12">
            {isLoadingFacebookCreative && <SpinningLoading isLoading={isLoadingFacebookCreative} />}
            {facebookCreativeError && <ErrorMessage message={facebookCreativeError.message} />}
            {projectFacebookCreativeTemplate &&
              // We could also use this which is very similar : https://jsonforms.io/docs/integrations/react/
              <div className="bg-gray-200 mt-8 rounded-md p-8">
                <span>Edit this template below or <span className="link" onClick={() => { searchParams.set('project_facebook_creative_template_id', ''); setSearchParams() }}>go back to templates</span></span>
                <Form
                  schema={projectFacebookCreativeTemplate?.facebook_creative_template.json_schema}
                  validator={validator}
                  formData={formData}
                  onChange={(e) => { debouncedFormData(e.formData) }}
                  ref={formRef}
                  fields={customFields}
                  className="text-sm opacity-60"
                  uiSchema={projectFacebookCreativeTemplate?.facebook_creative_template.ui_schema}
                >
                  <div>{ /* Hide submit form! */}</div>
                </Form>
              </div>
            }
            {updateCreative.isLoading && <div>Saving...</div>}
          </div>
        </div>
      </div>
    </>
  )
})

export default projectFacebookCreativeTemplateDetail