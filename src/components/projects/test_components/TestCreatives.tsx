import { observer } from "mobx-react-lite";
import { Projects as Project } from "../../../gql/graphql";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { ProjectFacebookCreativeTemplatesContext } from "../../../stores/stores";
import ErrorMessage from "../../lib/Error";
import { useSearchParams } from 'react-router-dom'
import '../../../css/creative.css'
import _ from 'lodash'
import { Project_Facebook_Creative_Templates as ProjectFacebookCreativeTemplate } from "../../../gql/graphql";
import CreativeTemplates from "../../creative_templates/CreativeTemplates";
import CreativeTemplate from "../../creative_templates/CreativeTemplate";
// TODO - Use onSave?
const TestCreatives = observer(({ project }: { project: Project, onSave: (payload: object) => void }) => {

  const projectFacebookCreativesStore = useContext(ProjectFacebookCreativeTemplatesContext)
  const [searchParams, setSearchParams] = useSearchParams();
  // const [projectFacebookCreativeTemplateId, setProjectFacebookCreativeTemplateId] = useState<string | null>(project_facebook_creative_template_id)


  const createProjectFacebookCreativeTemplate = useMutation({
    mutationFn: (payload: { project: Project, creativeTemplate: CreativeTemplate }) => projectFacebookCreativesStore.createProjectFacebookCreativeTemplateFromTemplate(payload),
    onSuccess: (data) => { setSearchParams({ step: '7', 'project_facebook_creative_template_id': data.id });}
  })

  const { data: projectFacebookCreativeTemplates, refetch } = useQuery({
    queryKey: ['getProjectFacebookCreativeTemplates'],
    queryFn: () => projectFacebookCreativesStore.fetchProjectFacebookCreativeTemplatesByProject({ project })
  })

  function isUsingTemplate(name: string) {
    return _.find(projectFacebookCreativeTemplates, (item: ProjectFacebookCreativeTemplate) => item.template_name === name)
  }

  function goToProjectFacebookCreativeTemplate(creativeTemplate: CreativeTemplate) {
    if (isUsingTemplate(creativeTemplate.name) && projectFacebookCreativeTemplates && projectFacebookCreativeTemplates.length > 0) {
      const foundProjectFacebookCreativeTemplate = _.find(projectFacebookCreativeTemplates, (item: ProjectFacebookCreativeTemplate) => item.template_name === creativeTemplate.name)
      setSearchParams({ step: '7', 'project_facebook_creative_template_id': foundProjectFacebookCreativeTemplate?.id });
    } else {
      createProjectFacebookCreativeTemplate.mutate({ project, creativeTemplate })
    }
  }

  useEffect(() => {
    refetch()
  }, [searchParams])

  return (
    <>
      <div>
        <div className="text-lg configuration-title mb-4">
          Choose an ad template
        </div>
        <div className="flex gap-x-4">
          {CreativeTemplates.map((template) => {
            return (
              <div key={template.name} className="flex flex-col cursor-pointer" style={{ width: 174, position: 'relative' }} onClick={() => goToProjectFacebookCreativeTemplate(template)}>
                <img className="creative-template-list-item" src={`https://creatomate.com/files/previews/${template.creatomate_template_id}?v=1683746204095`} />
                <div className="text-md font-bold mt-3">
                  {template.title}
                </div>
                <div className="text-xxs font-medium opacity-60">
                  {template.description}
                </div>
                {isUsingTemplate(template.name) && <div className="bg-success w-full text-white text-center text-sm p-1" style={{ position: 'absolute', top: 0, left: 0, borderRadius: '4px 4px 0 0'}}>
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