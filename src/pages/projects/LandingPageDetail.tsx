import { QueryKey, useQuery, useMutation } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useContext, useState, useEffect, createRef } from 'react'
import ErrorMessage from "../../components/lib/Error";
import { Projects as Project, Landing_Pages as LandingPage } from "../../gql/graphql";
import { ProjectsContext, ProjectLandingPagesContext } from "../../stores/stores";
import { SpinningLoading } from "../../components/lib/SpinningLoading";
import validator from '@rjsf/validator-ajv8'
import Form from '@rjsf/core'
// import { RJSFValidationError } from '@rjsf/utils'
import { RegistryFieldsType } from '@rjsf/utils' // UiSchema
import { useDebounce } from "usehooks-ts";
import FileUrlField from "../../components/rjsf/FileUrlField";
import ColorPickerField from "../../components/rjsf/ColorPickerField";
import LandingPageArrayFieldTemplate from "../../components/rjsf/LandingPageArrayFieldTemplate";
import LandingPageRender from "../../components/LandingPageRender";

const LandingPageDetail = observer(() => {
  const [formData, setFormData] = useState(null);
  const [ignoreSave, setIgnoreSave] = useState(false);
  // https://rjsf-team.github.io/react-jsonschema-form/docs/usage/validation
  const [validFormData, setValidFormData] = useState(null);
  // const [formErrors, setFormErrors] = useState([] as Array<RJSFValidationError>);
  const formRef = createRef<Form>();
  const { projectId, landingPageId } = useParams() as { projectId: string, landingPageId: string }
  
  const projectStore = useContext(ProjectsContext)
  const landingPagesStore = useContext(ProjectLandingPagesContext)

  const { data : project, error: projectError, isLoading: isLoadingProject } = useQuery<Promise<Project | undefined>, Error, Project, QueryKey>({
    queryKey: ['project', projectId],
    queryFn: () => projectStore.fetchProject({ projectId })
  })

  const { data : landingPage, error: landingPageError, isLoading: isLoadingLandingPage } = useQuery<Promise<LandingPage | undefined>, Error, LandingPage, QueryKey>({
    queryKey: ['landingPage', landingPageId],
    queryFn: async () => {
      const landingPage = await landingPagesStore.fetchLandingPageWithTemplate(landingPageId)
      // Prevent save trigger from this initial load
      setIgnoreSave(true)
      setFormData(landingPage?.data)
      if (landingPage?.data) {
        setValidFormData(landingPage?.data)
      }
      return landingPage
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debouncedFormData = useDebounce<any>(formData, 1000)
  useEffect(() => {
    // Prevent save when not loaded from wiping out data
    if (landingPage && formData) {
      let formValid = false
      try {
        formValid = formRef.current?.validateForm() || false
      } catch (e) {
        console.log('~~ formRef.current?.validateForm() error', e)
      } 
      if (formValid) {
        console.log('~~ ignore save', ignoreSave)
        if (!ignoreSave) {
          updateLandingPage.mutate(debouncedFormData)
        }
        setValidFormData(debouncedFormData)
      } else {
        console.log('form is invalid')
      }
    }
    setIgnoreSave(false)
  }, [debouncedFormData])

  const updateLandingPage = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (data: any) => {
      console.log('~~ updateLandingPage')
      await landingPagesStore.updateLandingPage(landingPage?.id, data)
    }
  })

  const customFields: RegistryFieldsType = { 
    fileUrl: FileUrlField,
    colorPicker: ColorPickerField
  }

  return (
  <>
    <div className="m-8">
      { isLoadingProject && <SpinningLoading isLoading={isLoadingProject} /> }
      { projectError && <ErrorMessage message={projectError.message} />}
      { project && <div>Project : {project.name}</div> }
      
      { isLoadingLandingPage && <SpinningLoading isLoading={isLoadingLandingPage} /> }
      { landingPageError && <ErrorMessage message={landingPageError.message} />}
      { landingPage && <div>Landing Page : {landingPage.id}</div> }
      { landingPage && !isLoadingLandingPage && 
        // We could also use this which is very similar : https://jsonforms.io/docs/integrations/react/
        <Form
          schema={landingPage?.landing_page_template.json_schema}
          validator={validator}
          formData={formData}
          onChange={(e) => {setFormData(e.formData)}}
          // onError={(e) => {setFormErrors(e)}}
          ref={formRef}
          fields={customFields}
          uiSchema={landingPage?.landing_page_template.ui_schema}
          templates={{
            ArrayFieldTemplate: LandingPageArrayFieldTemplate
          }}
        >
          <div>{ /* Hide submit form! */}</div>
        </Form>
      }
      { validFormData && <div className="mt-5">Data : {JSON.stringify(validFormData)}</div> }
      { updateLandingPage.isLoading && <div>Saving...</div> }
      { !updateLandingPage.isLoading && <div>Saved</div> }

      <hr/>

      <Link to={`/page/${landingPageId}`} className="btn my-5" target="_blank">Open Page</Link>

      { landingPage && !isLoadingLandingPage &&
        <LandingPageRender data={validFormData} component={landingPage.landing_page_template.component} />
      }
    </div>
  </>
  )
})

export default LandingPageDetail