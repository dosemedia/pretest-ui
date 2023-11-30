import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { useContext, useState, useEffect, useCallback } from 'react'
import { ProjectFacebookCreativeTemplatesContext } from "../../stores/stores";
import { SpinningLoading } from "../../components/lib/SpinningLoading";
import { useSearchParams } from 'react-router-dom'
import _ from 'lodash'
import CreativeTemplates from "../../components/creative_templates/CreativeTemplates";
import { Project_Facebook_Creative_Templates as ProjectFacebookCreativeTemplate } from "../../gql/graphql";
import ErrorMessage from "../../components/lib/Error";

const projectFacebookCreativeTemplateDetail = observer(({ projectFacebookCreativeTemplateId }: { projectFacebookCreativeTemplateId: string }) => {
  const [formData, setFormData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams()
  const projectFacebookCreativeTemplateStore = useContext(ProjectFacebookCreativeTemplatesContext)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const forms: { [key: string]: React.FC<{ data: any, onChange: (newData: any) => void }> } = {};
  for (const template of CreativeTemplates) {
    forms[template.name] = template.form;
  }

  const { data: projectFacebookCreativeTemplate, error: facebookCreativeError, isLoading: isLoadingFacebookCreative } = useQuery<Promise<ProjectFacebookCreativeTemplate | undefined>, Error, ProjectFacebookCreativeTemplate, QueryKey>({
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
      return await projectFacebookCreativeTemplateStore.updateProjectFacebookCreativeTemplate(projectFacebookCreativeTemplate?.id, data)
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (newData: any) => {
    // setDataSaved(false)
    setFormData(newData)
    debouncedFormData(newData)
  }


  useEffect(() => {
    if (!searchParams.get('project_facebook_creative_template_id')) {
      setSearchParams({ step: '6' })
    }
  }, [])

  const Form = projectFacebookCreativeTemplate ? forms[projectFacebookCreativeTemplate.template_name] : null;


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
                {Form &&
                  <Form
                    data={formData}
                    onChange={onChange}
                  />
                }
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