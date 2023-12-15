import { observer } from "mobx-react-lite";
import { Projects as Project } from "../../../../gql/graphql";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ProjectLandingPagesContext } from "../../../../stores/stores";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../../lib/Error";

import LandingPageTemplates from '../../../landing_page_templates/LandingPageTemplates';
import { ProjectStepChildProps } from "../../ProjectStepContainer";

const TestLandingPages: React.FC<ProjectStepChildProps> = observer((props: ProjectStepChildProps) => {

  const landingPagesStore = useContext(ProjectLandingPagesContext)
  const navigate = useNavigate()

  const { data: landingPages, isLoading: isLoadingLandingPages } = useQuery({
    queryKey: ['getLandingPages', props.project?.id],
    retry: false,
    queryFn: () => {
      return landingPagesStore.fetchLandingPagesByProject({ project: props.project! })
    },
  })

  const createLandingPage = useMutation({
    mutationFn: (payload: { project: Project, templateName: string }) => landingPagesStore.createLandingPageFromTemplate(payload),
    onSuccess: (data) => {
      if (data?.id) {
        navigate(`/project/${props.project?.id}/landing_page/${data.id}`)
      }
    }
  })

  return (
    <>
      <div>
        <div className="grid grid-cols-3 gap-4">
          {LandingPageTemplates.map((template) => {
            return (
              <div key={template.name} className="flex flex-col">
                <img src={`/src/assets/landing_page_templates/${template.name}.jpg`} />
                <div>{template.description}</div>
                <button
                  className="btn mt-5 btn-info normal-case text-white"
                  onClick={() => createLandingPage.mutate({ project: props.project!, templateName: template.name })}
                  disabled={createLandingPage.isLoading}
                >Customize Template</button>
              </div>
            )
          })}
        </div>
        {createLandingPage.isError && <ErrorMessage message={(createLandingPage.error as Error).message} />}

        <div className="text-lg configuration-title mb-4 mt-4">
          Landing Pages
        </div>
        {isLoadingLandingPages && <div>Loading...</div>}
        <div>Landing Pages Count : {landingPages?.length}</div>
        <div className="grid grid-cols-3 gap-4">
          {landingPages && landingPages.map((landingPage) => {
            return (
              <div key={landingPage.id} className="flex flex-col">
                <Link to={`/project/${props.project?.id}/landing_page/${landingPage.id}`}>
                  {landingPage.id}
                </Link>
              </div>
            )
          })}
        </div>

      </div>
    </>
  )
})

export default TestLandingPages