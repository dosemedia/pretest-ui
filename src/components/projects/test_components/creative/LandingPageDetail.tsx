import { QueryKey, useQuery, useMutation } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { Link, useSearchParams } from "react-router-dom";
import { useContext, useState, useMemo } from 'react'
import ErrorMessage from "../../../lib/Error";
import { Landing_Pages as LandingPage } from "../../../../gql/graphql";
import { ProjectLandingPagesContext } from "../../../../stores/stores";
import { SpinningLoading } from "../../../lib/SpinningLoading";
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

const LandingPageDetail: React.FC<ProjectStepChildProps> = observer((props: ProjectStepChildProps) =>  {
  const [dataSaved, setDataSaved] = useState(true)
  const [formData, setFormData] = useState(null);
  const searchParams = useSearchParams()[0]
  const landingPageId: string = searchParams.get('landing_page_id')!
  const projectId = props.project?.id
  const landingPagesStore = useContext(ProjectLandingPagesContext)

  const { data : landingPage, error: landingPageError, isLoading: isLoadingLandingPage } = useQuery<Promise<LandingPage | undefined>, Error, LandingPage, QueryKey>({
    queryKey: ['landingPage', landingPageId],
    queryFn: async () => {
      const landingPage = await landingPagesStore.fetchLandingPageWithTemplate(landingPageId)
      // Prevent save trigger from this initial load
      setFormData(landingPage?.data)
      return landingPage
    }
  })

  const updateLandingPage = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (data: any) => {
      console.log('~~ updateLandingPage')
      await landingPagesStore.updateLandingPage(landingPage?.id, { data })
    },
    onSuccess: () => {
      setDataSaved(true)
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveData = useMemo(() => _.debounce((data: any) => {
    updateLandingPage.mutate(data)
  }, 1000), [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (newData: any) => {
    setDataSaved(false)
    setFormData(newData)
    saveData(newData)
  }

  // Pick which form to use from the landing pages list
  const Form = landingPage ? forms[landingPage.template_name] : null;

  return (
  <>
    <div className="m-4">
      
      { isLoadingLandingPage && <SpinningLoading isLoading={isLoadingLandingPage} /> }
      { landingPageError && <ErrorMessage message={landingPageError.message} />}
      { Form && 
        <Form
          data={formData}
          onChange={onChange}
          projectId={projectId}
        />
      }
      { !dataSaved && <div className="my-4">Saving...</div> }
      { dataSaved && <div className="my-4">Saved</div> }

      <hr/>

      <Link to={`/page/${landingPageId}`} className="btn my-5" target="_blank">Open Page</Link>

      { landingPage && !isLoadingLandingPage &&
        <LandingPageRender landingPageId={landingPageId} data={formData} component={landingPage.template_name} />
      }
    </div>
  </>
  )
})

export default LandingPageDetail