import { QueryKey, useQuery, useMutation } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect, createRef } from 'react'
import ErrorMessage from "../../components/lib/Error";
import { Projects as Project, Facebook_Creatives as FacebookCreative } from "../../gql/graphql";
import { ProjectsContext, ProjectFacebookCreativesContext } from "../../stores/stores";
import { SpinningLoading } from "../../components/lib/SpinningLoading";
import validator from '@rjsf/validator-ajv8'
import Form from '@rjsf/core'
// import { RJSFValidationError } from '@rjsf/utils'
import { RegistryFieldsType } from '@rjsf/utils' // UiSchema
import { useDebounce } from "usehooks-ts";
import FileUrlField from "../../components/rjsf/FileUrlField";

const facebookCreativeDetail = observer(() => {
  const [formData, setFormData] = useState(null);
  const [ignoreSave, setIgnoreSave] = useState(false);
  // https://rjsf-team.github.io/react-jsonschema-form/docs/usage/validation
  const [validFormData, setValidFormData] = useState(null);
  // const [formErrors, setFormErrors] = useState([] as Array<RJSFValidationError>);
  const formRef = createRef<Form>();
  const { projectId, facebookCreativeId } = useParams() as { projectId: string, facebookCreativeId: string }
  
  const projectStore = useContext(ProjectsContext)
  const facebookCreativesStore = useContext(ProjectFacebookCreativesContext)

  const { data : project, error: projectError, isLoading: isLoadingProject } = useQuery<Promise<Project | undefined>, Error, Project, QueryKey>({
    queryKey: ['project', projectId],
    queryFn: () => projectStore.fetchProject({ projectId })
  })

  const { data : facebookCreative, error: facebookCreativeError, isLoading: isLoadingFacebookCreative } = useQuery<Promise<FacebookCreative | undefined>, Error, FacebookCreative, QueryKey>({
    queryKey: ['facebookCreative', facebookCreativeId],
    queryFn: async () => {
      const creative = await facebookCreativesStore.fetchFacebookCreativeWithTemplate(facebookCreativeId)
      // Prevent save trigger from this initial load
      setIgnoreSave(true)
      setFormData(creative?.data)
      return creative
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debouncedFormData = useDebounce<any>(formData, 1000)
  useEffect(() => {
    // Prevent save when not loaded from wiping out data
    if (facebookCreative && formData) {
      if (formRef.current?.validateForm()) {
        if (!ignoreSave) {
          updateCreative.mutate(debouncedFormData)
        }
        setIgnoreSave(false)
        setValidFormData(debouncedFormData)
      } else {
        console.log('form is invalid')
      }
    }
  }, [debouncedFormData])

  const updateCreative = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (data: any) => {
      console.log('~~ updateFacebookCreative')
      await facebookCreativesStore.updateFacebookCreative(facebookCreative?.id, data)
    }
  })

  const customFields: RegistryFieldsType = { fileUrl: FileUrlField }

  // Example uiSchema using custom widget : FileUrlField
  // const uiSchema: UiSchema = 
  // {
  //   "Main Copy": {
  //     "ui:autofocus": true,
  //     "ui:placeholder": "Put your social copy here!",
  //     "ui:classNames": "mt-5"
  //   },
  //   "Product 1": {
  //     "ui:field": "fileUrl",
  //     "ui:classNames": "mt-5"
  //   }
  // }

  return (
  <>
    <div className="m-8">
      { isLoadingProject && <SpinningLoading isLoading={isLoadingProject} /> }
      { projectError && <ErrorMessage message={projectError.message} />}
      { project && <div>Project : {project.name}</div> }
      
      { isLoadingFacebookCreative && <SpinningLoading isLoading={isLoadingFacebookCreative} /> }
      { facebookCreativeError && <ErrorMessage message={facebookCreativeError.message} />}
      { facebookCreative && <div>Facebook Creative : {facebookCreative.id}</div> }
      { facebookCreative &&
        // We could also use this which is very similar : https://jsonforms.io/docs/integrations/react/
        <Form
          schema={facebookCreative?.facebook_creative_template.json_schema}
          validator={validator}
          formData={formData}
          onChange={(e) => {setFormData(e.formData)}}
          // onError={(e) => {setFormErrors(e)}}
          ref={formRef}
          fields={customFields}
          uiSchema={facebookCreative?.facebook_creative_template.ui_schema}
        >
          <div>{ /* Hide submit form! */}</div>
        </Form>
      }
      { validFormData && <div className="mt-5">Data : {JSON.stringify(validFormData)}</div> }
      { updateCreative.isLoading && <div>Saving...</div> }
    </div>
  </>
  )
})

export default facebookCreativeDetail