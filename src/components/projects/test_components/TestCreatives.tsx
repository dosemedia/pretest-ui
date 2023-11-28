import { observer } from "mobx-react-lite";
import { Projects as Project, Facebook_Creative_Templates as FacebookCreativeTemplate } from "../../../gql/graphql";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FacebookCreativeTemplatesContext, ProjectFacebookCreativeTemplatesContext } from "../../../stores/stores";
import ProjectFacebookCreativeTemplateDetail from "../../../pages/projects/ProjectFacebookCreativeTemplateDetail";
import ErrorMessage from "../../lib/Error";
import '../../../css/creative.css'

// TODO - Use onSave?
const TestCreatives = observer(({ project }: { project: Project, onSave: (payload: object) => void }) => {

  const facebookCreativeTemplatesStore = useContext(FacebookCreativeTemplatesContext)
  const projectFacebookCreativesStore = useContext(ProjectFacebookCreativeTemplatesContext)

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

  const { data: projectFacebookCreativeTemplates, isLoading: isLoadingFacebookCreatives } = useQuery({
    queryKey: ['getFacebookCreatives', project.id],
    retry: false,
    queryFn: () => {
      if ((project.platform === 'facebook') || (project.platform === 'instagram') || (project.platform === 'facebook_instagram')) {
        return projectFacebookCreativesStore.fetchProjectFacebookCreativeTemplatesByProject({ project })
      }
      return null
    },
  })

  const createProjectFacebookCreativeTemplate = useMutation({
    mutationFn: (payload: { project: Project, template: FacebookCreativeTemplate }) => projectFacebookCreativesStore.createProjectFacebookCreativeTemplateFromTemplate(payload)
  })

  return (
    <>
      <div>
        {isLoadingFacebookCreativeTemplates && <div>Loading...</div>}
        <div className="text-lg configuration-title mb-4">
          Choose an ad template
        </div>
        <div className="flex gap-x-4">
          {facebookCreativeTemplates && facebookCreativeTemplates.length > 0 && projectFacebookCreativeTemplates?.length === 0 && facebookCreativeTemplates.map((template) => {
            return (
              <div key={template.id} className="flex flex-col cursor-pointer" style={{ width: 174 }} onClick={() => createProjectFacebookCreativeTemplate.mutate({ project, template })}>
                <img className="creative-template-list-item" src={`https://creatomate.com/files/previews/${template.creatomate_template_id}?v=1683746204095`} />
                <div className="text-md font-bold mt-3">
                  {template.name}
                </div>
                <div className="text-xxs font-medium opacity-60">
                  {template.description}
                </div>
                {/* <button 
                  className="btn mt-5 btn-info normal-case text-white"
                  onClick={() => createCreative.mutate({project, template})}
                  disabled={createCreative.isLoading}
                >Customize Template</button> */}
              </div>
            )
          })}
        </div>
        {createProjectFacebookCreativeTemplate.isError && <ErrorMessage message={(createProjectFacebookCreativeTemplate.error as Error).message} />}
        {projectFacebookCreativeTemplates && projectFacebookCreativeTemplates?.length > 0 &&
          <div>
            {isLoadingFacebookCreatives && <div>Loading...</div>}
            {/* <div>Facebook Creatives Count : {facebookCreatives?.length}</div> */}
            <div>
              <ProjectFacebookCreativeTemplateDetail projectId={project.id} projectFacebookCreativeTemplateId={projectFacebookCreativeTemplates[0].id} />
            </div>
          </div>
        }
      </div>
    </>
  )
})

export default TestCreatives