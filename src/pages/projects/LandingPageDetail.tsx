import { QueryKey, useQuery, useMutation } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useContext, useState, useMemo } from 'react'
import ErrorMessage from "../../components/lib/Error";
import { Projects as Project, Landing_Pages as LandingPage } from "../../gql/graphql";
import { ProjectsContext, ProjectLandingPagesContext } from "../../stores/stores";
import { SpinningLoading } from "../../components/lib/SpinningLoading";
import LandingPageRender from "../../components/renders/LandingPageRender";
import _ from "lodash";
import LandingPageTemplates from '../../components/landing_page_templates/LandingPageTemplates';

// Grab each of the possible landing page forms from LandingPageTemplates
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const forms: { [key: string]: React.FC<{ data: any, onChange : (newData: any) => void }> } = {};
for (const template of LandingPageTemplates) {
  forms[template.name] = template.form;
}

const LandingPageDetail = observer(() => {
  const [dataSaved, setDataSaved] = useState(true)
  const [formData, setFormData] = useState(null);
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
    <div className="m-8">
      { isLoadingProject && <SpinningLoading isLoading={isLoadingProject} /> }
      { projectError && <ErrorMessage message={projectError.message} />}
      { project && <div>Project : {project.name}</div> }
      
      { isLoadingLandingPage && <SpinningLoading isLoading={isLoadingLandingPage} /> }
      { landingPageError && <ErrorMessage message={landingPageError.message} />}
      { landingPage && <div>Landing Page : {landingPage.id}</div> }
      { Form && 
        <Form
          data={formData}
          onChange={onChange}
        />
      }
      { !dataSaved && <div>Saving...</div> }
      { dataSaved && <div>Saved</div> }

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