import { observer } from "mobx-react-lite";
import TestAudienceLocations from "./test_audience_components/TestAudienceLocations";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ProjectFacebookAudienceContext } from "../../../stores/stores";
import { useParams } from "react-router-dom";
import { SpinningLoading } from "../../lib/SpinningLoading";
import { Facebook_Audiences as FacebookAudience } from "../../../gql/graphql";
import TestAudienceGender from "./test_audience_components/TestAudienceGender";
import _ from 'lodash'
import TestAudienceAge from "./test_audience_components/TestAudienceAge";
import { Projects as Project } from "../../../gql/graphql";
import ErrorMessage from "../../lib/Error";
import TestAudiencePlatforms from "./test_audience_components/TestAudiencePlatforms";
import TestAudiencePositions from "./test_audience_components/TestAudiencePositions";
const TestAudience = observer(({ onSave, project }: { onSave: (payload: object) => void, project: Project }) => {
  const projectFacebookAudienceStore = useContext(ProjectFacebookAudienceContext)
  const { projectId } = useParams() as { projectId: string }
  const { data: facebookAudienceData, isLoading, refetch } = useQuery({
    queryKey: ['getProjectFacebookAudienceLocations'],
    retry: false,
    queryFn: () => projectFacebookAudienceStore.getFacebookAudiencesByProjectID({ projectId, createIfDoesNotExist: true })
  })
  const projectFacebookAudienceMutation = useMutation({
    mutationKey: ['projectFacebookAudienceMutation'],
    mutationFn: ({ payload, audience }: { payload: FacebookAudience, audience: FacebookAudience }) => projectFacebookAudienceStore.updateFacebookAudiencesByID({ id: audience.id, payload: { ...audience, ...payload } }),
    onSuccess: () => refetch(),
    onError: (error: Error) => console.log(error)
  })

  const onUpdate = _.debounce((payload: FacebookAudience, isUpdated: boolean) => {
    // Only update if there are updates
    if (facebookAudienceData && facebookAudienceData[0] && isUpdated) {
      projectFacebookAudienceMutation.mutate({ payload, audience: facebookAudienceData[0] })
      onSave({})
    }
  }, 200)
  return (
    <>
      {!project.platform ? <ErrorMessage message="You must complete the Platform step before moving to audience" /> :
      <div>
        <div className="text-lg configuration-title">
          Create your own audience
        </div>
        {isLoading && <SpinningLoading isLoading={isLoading} size="lg" />}
        <div className="flex flex-col gap-y-4">
          {!isLoading && facebookAudienceData && facebookAudienceData.length > 0 && <TestAudienceLocations onUpdate={onUpdate} projectFacebookAudience={facebookAudienceData[0] as FacebookAudience} />}
          {!isLoading && facebookAudienceData && facebookAudienceData.length > 0 && <TestAudienceGender onUpdate={onUpdate} projectFacebookAudience={facebookAudienceData[0] as FacebookAudience} />}
          {!isLoading && facebookAudienceData && facebookAudienceData.length > 0 && <TestAudienceAge onUpdate={onUpdate} projectFacebookAudience={facebookAudienceData[0] as FacebookAudience} />}
          {!isLoading && facebookAudienceData && facebookAudienceData.length > 0 && <TestAudiencePlatforms onUpdate={onUpdate} projectFacebookAudience={facebookAudienceData[0] as FacebookAudience} />}
          {!isLoading && facebookAudienceData && facebookAudienceData.length > 0 && <TestAudiencePositions onUpdate={onUpdate} projectFacebookAudience={facebookAudienceData[0] as FacebookAudience} />}
        </div>
      </div>
}
    </>
  )
})

export default TestAudience