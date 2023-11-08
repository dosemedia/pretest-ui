import { observer } from "mobx-react-lite";
import TestAudienceLocations from "./test_audience_components/TestAudienceLocations";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ProjectFacebookAudienceContext } from "../../../stores/stores";
import { useParams } from "react-router-dom";
import { SpinningLoading } from "../../lib/SpinningLoading";
import { Facebook_Audiences as FacebookAudience } from "../../../gql/graphql";
const TestAudience = observer(() => {
  const projectFacebookAudienceStore = useContext(ProjectFacebookAudienceContext)
  const { projectId } = useParams() as { projectId: string }
  const { data: facebookAudienceData, isLoading, refetch } = useQuery({
    queryKey: ['getProjectFacebookAudienceLocations'],
    retry: false,
    queryFn: () => projectFacebookAudienceStore.getFacebookAudiencesByProjectID({ projectId })
  })
  const projectFacebookAudienceMutation = useMutation({
    mutationKey: ['projectFacebookAudienceMutation'],
    mutationFn: (payload: object) => projectFacebookAudienceStore.updateFacebookAudiencesByID({ id: facebookAudienceData![0].id, payload }),
    onSuccess: () => refetch(),
    onError: (error) => console.log(error)
  })
  function onUpdate(payload: object) {
    console.log(payload)
    if (facebookAudienceData && facebookAudienceData[0]) {
      projectFacebookAudienceMutation.mutate(payload)
    }
  }
  return (<>
    <div>
      <div className="text-lg configuration-title mb-4">
        Create your own audience
      </div>
      {isLoading && <SpinningLoading isLoading={isLoading} size="lg" />}
      {!isLoading && facebookAudienceData && facebookAudienceData.length > 0 && <TestAudienceLocations onUpdate={onUpdate} projectFacebookAudience={facebookAudienceData[0] as FacebookAudience} />}
    </div>
  </>
  )
})

export default TestAudience