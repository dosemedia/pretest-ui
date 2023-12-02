import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from 'react'
import { ProjectLandingPagesContext } from "../stores/stores";
import ErrorMessage from "../components/lib/Error";
import { SpinningLoading } from "../components/lib/SpinningLoading";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { Landing_Pages as LandingPage } from "../gql/graphql";
import LandingPageRender from "../components/renders/LandingPageRender";
import { useLocation } from 'react-router-dom'
import { AnalyticsContext } from "../stores/stores"

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

  const analyticsStore = useContext(AnalyticsContext)
  const location = useLocation()

  useEffect(() => {
    // Don't track events in page editor
    if (location.pathname.startsWith('/project')) {
      return
    }
    // Note : When in develpment mode this will be called twice due to some top-notch engineering by the react team:
    // https://github.com/facebook/react/issues/24502#issuecomment-1118754581
    analyticsStore.trackEvent(landingPageId, 'view', 'landing_page', null, location)
  }, [])

  return (
  <>
    <div>
      { isLoading && <SpinningLoading isLoading={isLoading} /> }
      { landingPageError && <ErrorMessage message={landingPageError.message} />}

      { landingPage &&
      <LandingPageRender landingPageId={landingPageId} data={landingPage.data} component={landingPage.template_name} />
      }
    </div>
  </>
  )
})

export default LandingPageDetail