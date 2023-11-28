import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useContext } from 'react'
import { ProjectLandingPagesContext } from "../stores/stores";
import ErrorMessage from "../components/lib/Error";
import { SpinningLoading } from "../components/lib/SpinningLoading";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { Landing_Pages as LandingPage } from "../gql/graphql";
import LandingPageRender from "../components/LandingPageRender";

const LandingPageDetail = observer(() => {
  const { landingPageId } = useParams() as { projectId: string, landingPageId: string }
  
  const landingPagesStore = useContext(ProjectLandingPagesContext)

  const { data : landingPage, error: landingPageError, isLoading } = useQuery<Promise<LandingPage | undefined>, Error, LandingPage, QueryKey>({
    queryKey: ['landingPage', landingPageId],
    queryFn: async () => {
      const result = await landingPagesStore.fetchLandingPageWithTemplate(landingPageId)
      return result
    }
  })

  return (
  <>
    <div>
      { isLoading && <SpinningLoading isLoading={isLoading} /> }
      { landingPageError && <ErrorMessage message={landingPageError.message} />}

      { landingPage &&
      <LandingPageRender data={landingPage.data} component={landingPage.landing_page_template.component} />
      }
    </div>
  </>
  )
})

export default LandingPageDetail