import { observer } from "mobx-react-lite";
import { Projects as Project, Facebook_Creative_Templates as FacebookCreativeTemplate } from "../../../gql/graphql";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState, useEffect } from "react";
import { FacebookCreativeTemplatesContext, ProjectFacebookCreativeTemplatesContext } from "../../../stores/stores";
import ErrorMessage from "../../lib/Error";
import { useParams, useSearchParams } from 'react-router-dom'
import '../../../css/creative.css'
import _ from 'lodash'
import { Project_Facebook_Creative_Templates as ProjectFacebookCreativeTemplate } from "../../../gql/graphql";
// TODO - Use onSave?
const TestCreatives = observer(({ project }: { project: Project, onSave: (payload: object) => void }) => {

  const facebookCreativeTemplatesStore = useContext(FacebookCreativeTemplatesContext)
  const projectFacebookCreativesStore = useContext(ProjectFacebookCreativeTemplatesContext)
  const [searchParams, setSearchParams] = useSearchParams();
  const { project_facebook_creative_template_id } = useParams() as { project_facebook_creative_template_id: string }
  const [projectFacebookCreativeTemplateId, setProjectFacebookCreativeTemplateId] = useState<string | null>(project_facebook_creative_template_id)

  const { data: facebookCreativeTemplates, isLoading: isLoadingFacebookCreativeTemplates } = useQuery({
    queryKey: ['getFacebookCreativeTemplates'],
    retry: false,
    queryFn: () => {
      if ((project.platform === 'facebook') || (project.platform === 'instagram') || (project.platform === 'facebook_instagram')) {
        return facebookCreativeTemplatesStore.fetchTemplates()
      }
      return null
    },
  })

  const { data: projectFacebookCreativeTemplates, refetch } = useQuery({
    queryKey: ['getProjectFacebookCreativeTemplates'],
    queryFn: () => projectFacebookCreativesStore.fetchProjectFacebookCreativeTemplatesByProject({ project })
  })

  const createProjectFacebookCreativeTemplate = useMutation({
    mutationFn: (payload: { project: Project, template: FacebookCreativeTemplate }) => projectFacebookCreativesStore.createProjectFacebookCreativeTemplateFromTemplate(payload),
    onSuccess: (data) => { setSearchParams({ step: '7', 'project_facebook_creative_template_id': data.id });}
  })

  function isUsingTemplate(id: string) {
    return _.find(projectFacebookCreativeTemplates, (item: ProjectFacebookCreativeTemplate) => item.template_id === id)
  }

  function goToProjectFacebookCreativeTemplate(template: FacebookCreativeTemplate) {
    if (isUsingTemplate(template.id) && projectFacebookCreativeTemplates && projectFacebookCreativeTemplates.length > 0) {
      setSearchParams({ step: '7', 'project_facebook_creative_template_id': projectFacebookCreativeTemplates[0].id });
    } else {
      createProjectFacebookCreativeTemplate.mutate({ project, template })
    }
  }

  useEffect(() => {
    const id = searchParams.get('project_facebook_creative_template_id')
    setProjectFacebookCreativeTemplateId(id)
    refetch()
  }, [searchParams])

  return (
    <>
      <div>
        {isLoadingFacebookCreativeTemplates && <div>Loading...</div>}
        <div className="text-lg configuration-title mb-4">
          Choose an ad template
        </div>
        <div className="flex gap-x-4">
          {facebookCreativeTemplates && facebookCreativeTemplates.length > 0 && !projectFacebookCreativeTemplateId && facebookCreativeTemplates.map((template) => {
            return (
              <div key={template.id} className="flex flex-col cursor-pointer" style={{ width: 174, position: 'relative' }} onClick={() => goToProjectFacebookCreativeTemplate(template)}>
                <img className="creative-template-list-item" src={`https://creatomate.com/files/previews/${template.creatomate_template_id}?v=1683746204095`} />
                <div className="text-md font-bold mt-3">
                  {template.name}
                </div>
                <div className="text-xxs font-medium opacity-60">
                  {template.description}
                </div>
                {isUsingTemplate(template.id) && <div className="bg-success w-full text-white text-center text-sm p-1" style={{ position: 'absolute', top: 0, left: 0, borderRadius: '4px 4px 0 0'}}>
                  Using Template
                </div>}
              </div>
            )
          })}
        </div>
        {createProjectFacebookCreativeTemplate.isError && <ErrorMessage message={(createProjectFacebookCreativeTemplate.error as Error).message} />}
      </div>
    </>
  )
})

export default TestCreatives