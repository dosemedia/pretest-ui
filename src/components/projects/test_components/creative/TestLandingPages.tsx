import { observer } from "mobx-react-lite";
import { Projects as Project } from "../../../../gql/graphql";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ProjectLandingPagesContext } from "../../../../stores/stores";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ErrorMessage from "../../../lib/Error";
import LandingPageRender from "../../../renders/LandingPageRender";
import _ from "lodash";
import LandingPageTemplates from '../../../landing_page_templates/LandingPageTemplates';
import { ProjectStepChildProps } from "../../ProjectStepContainer";

// Grab each of the possible landing page forms from LandingPageTemplates
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const forms: { [key: string]: React.FC<{ data: any, onChange : (newData: any) => void, projectId: string }> } = {};
for (const template of LandingPageTemplates) {
  forms[template.name] = template.form;
}


const TestLandingPages: React.FC<ProjectStepChildProps> = observer((props: ProjectStepChildProps) => {

  const landingPagesStore = useContext(ProjectLandingPagesContext)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const { data: landingPages, isLoading: isLoadingLandingPages, refetch: refetchLandingPages } = useQuery({
    queryKey: ['getLandingPages', props.project?.id],
    retry: false,
    queryFn: () => {
      if (props.onSave) props.onSave({})
      return landingPagesStore.fetchLandingPagesByProject({ project: props.project! })
    },
  })

  const createLandingPage = useMutation({
    mutationFn: (payload: { project: Project, templateName: string }) => landingPagesStore.createLandingPageFromTemplate(payload),
    onSuccess: (data) => {
      if (data?.id) {
        setSearchParams({ step: parseInt(searchParams.get('step')) + 1, landing_page_id: data.id })
        if (props.onSave) props.onSave({})
      }
    }
  })

  return (
    <>
      <div>
        { landingPages && landingPages.length == 0 &&
          <div className="grid grid-cols-3 gap-4">
            {LandingPageTemplates.map((template) => {
              return (
                <div key={template.name} className="flex flex-col">
                  <img src={`/src/assets/landing_page_templates/${template.name}.jpg`} />
                  <div>{template.description}</div>
                  <button
                    className="btn mt-5 btn-primary"
                    onClick={() => createLandingPage.mutate({ project: props.project!, templateName: template.name })}
                    disabled={createLandingPage.isLoading}
                  >Use Template</button>
                </div>
              )
            })}
          </div>
        }
        {createLandingPage.isError && <ErrorMessage message={(createLandingPage.error as Error).message} />}

        {isLoadingLandingPages && <div>Loading...</div>}
        <div className="grid grid-cols-3 gap-4">
          {landingPages && landingPages.map((landingPage) => {
            return (
              <div key={landingPage.id} className="flex flex-col">

                <Link to={`/project/${props.project?.id}/landing_page/${landingPage.id}`}>
                  <div style={{zoom: '25%'}}>
                    <LandingPageRender landingPageId={landingPage.id} data={landingPage.data} component={landingPage.template_name} />
                  </div>
                </Link>
                <div className="btn btn-primary" onClick={() => { setSearchParams({ step: parseInt(searchParams.get('step')) + 1, landing_page_id: landingPage.id }) }}>
                  Edit Page
                </div>
                
                <DeleteLandingPage onDeleted={refetchLandingPages} landingPageId={landingPage.id} />
              </div>
            )
          })}
        </div>

      </div>
    </>
  )
})

function DeleteLandingPage({ 
  onDeleted,
  landingPageId
}: { 
  onDeleted: () => void,
  landingPageId: string
}) {
  const landingPagesStore = useContext(ProjectLandingPagesContext)

  const deleteLandingPage = useMutation({
    mutationFn: () => landingPagesStore.deleteLandingPage(landingPageId),
    onSuccess: () => {
      onDeleted()
    }
  })

  return (
    <>
      <button className="btn" onClick={()=>(document.getElementById(landingPageId + '_delete_modal') as any).showModal()}>
        Delete Page
      </button>
      <dialog id={landingPageId + '_delete_modal'} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Really delete this landing page?</h3>
          <p>The page and all data associated with it will be destroyed. This cannot be undone.</p>
          <div className="modal-action">
            <button className="btn btn-error text-white" disabled={deleteLandingPage.isLoading} onClick={() => deleteLandingPage.mutate()}>
              {deleteLandingPage.isLoading && <span className="loading loading-spinner"></span>}
              Delete Page
            </button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-ghost">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default TestLandingPages