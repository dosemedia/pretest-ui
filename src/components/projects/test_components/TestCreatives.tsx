import { observer } from "mobx-react-lite";
import { Projects as Project, Facebook_Creative_Templates as FacebookCreativeTemplate } from "../../../gql/graphql";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FacebookCreativeTemplatesContext, ProjectFacebookCreativesContext } from "../../../stores/stores";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../lib/Error";

// TODO - Use onSave?
const TestCreatives = observer(({ project }: { project: Project, onSave: (payload: object) => void }) => {

  const facebookCreativeTemplatesStore = useContext(FacebookCreativeTemplatesContext)
  const facebookCreativesStore = useContext(ProjectFacebookCreativesContext)
  const navigate = useNavigate()

  const { data: facebookCreativeTemplates, isLoading : isLoadingFacebookCreativeTemplates } = useQuery({
    queryKey: ['getFacebookLandingPageTemplates'],
    retry: false,
    queryFn: () => {
      if ((project.platform === 'facebook') || (project.platform === 'instagram') || (project.platform === 'facebook_instagram')) {
        return facebookCreativeTemplatesStore.fetchTemplates()
      }
      return null
    },
  })

  const { data: facebookCreatives, isLoading: isLoadingFacebookCreatives } = useQuery({
    queryKey: ['getFacebookCreatives', project.id],
    retry: false,
    queryFn: () => {
      if ((project.platform === 'facebook') || (project.platform === 'instagram') || (project.platform === 'facebook_instagram')) {
        return facebookCreativesStore.fetchFacebookCreativesByProject({ project })
      }
      return null
    },
  })

  const createCreative = useMutation({
    mutationFn: (payload : { project: Project, template: FacebookCreativeTemplate }) => facebookCreativesStore.createFacebookCreativeFromTemplate(payload),
    onSuccess: (data) => {
      if (data?.id) {
        navigate(`/project/${project.id}/facebook_creative/${data.id}`)
      }
    }
  })

  return (
    <>
      <div>
        { isLoadingFacebookCreativeTemplates && <div>Loading...</div> }
        <div className="text-lg configuration-title mb-4">
          Choose an ad template
        </div>

        <div>Facebook Templates Count : { facebookCreativeTemplates?.length }</div>
        <div className="grid grid-cols-3 gap-4">
          { facebookCreativeTemplates && facebookCreativeTemplates.length > 0 && facebookCreativeTemplates.map((template) => {
            return (
              <div key={ template.id } className="flex flex-col">
                <img src={`https://creatomate.com/files/previews/${template.creatomate_template_id}?v=1683746204095`} />
                <button 
                  className="btn mt-5 btn-info normal-case text-white"
                  onClick={() => createCreative.mutate({project, template})}
                  disabled={createCreative.isLoading}
                >Customize Template</button>
              </div>
            )
          }) }
        </div>
        { createCreative.isError && <ErrorMessage message={(createCreative.error as Error).message} />}

        <div className="text-lg configuration-title mb-4 mt-4">
          Creatives
        </div>
        { isLoadingFacebookCreatives && <div>Loading...</div> }
        <div>Facebook Creatives Count : { facebookCreatives?.length }</div>
        <div className="grid grid-cols-3 gap-4">
          { facebookCreatives && facebookCreatives.map((creative) => {
            return (
              <div key={ creative.id } className="flex flex-col">
                <Link to={`/project/${project.id}/facebook_creative/${creative.id}`}>
                  <img src={`https://creatomate.com/files/previews/${creative.facebook_creative_template.creatomate_template_id}?v=1683746204095`} />
                </Link>
              </div>
            )
          }) }
        </div>

      </div>
    </>
  )
})

export default TestCreatives