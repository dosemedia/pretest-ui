import { observer } from "mobx-react-lite";
import { ProjectStepChildProps } from "../../ProjectStepContainer";
import { useContext, useEffect, useState } from "react";
import TestAudience from "./TestAudience";
import { ProjectFacebookAudienceContext, ToastsContext } from "../../../../stores/stores";
import { useMutation } from "@tanstack/react-query";
import { Facebook_Audiences as FacebookAudience } from "../../../../gql/graphql";
import { ToastType } from "../../../../stores/toast";
import { SpinningLoading } from "../../../lib/SpinningLoading";

const TestAudienceContainer: React.FC<ProjectStepChildProps> = observer((props: ProjectStepChildProps) => {
  const [facebookAudiences, setFacebookAudiences] = useState(props.project?.facebook_audiences)
  const projectFacebookAudienceStore = useContext(ProjectFacebookAudienceContext)
  const toastsStore = useContext(ToastsContext)
  useEffect(() => {
    setFacebookAudiences(props.project?.facebook_audiences)
  }, [props.project?.facebook_audiences])
  const createProjectFacebookAudienceMutation = useMutation({
    mutationKey: ['createProjectFacebookAudienceMutation'],
    mutationFn: () => projectFacebookAudienceStore.createFacebookAudience({ project: props.project!, name: `Audience ${(props.project?.facebook_audiences.length || 0) + 1}` }),
    onSuccess: () => { if (props.saveProject) props.saveProject({}); toastsStore.addToast({ message: 'Successfully created a new audience', type: ToastType.SUCCESS }) },
    onError: (error: Error) => { toastsStore.addToast({ message: error.toString(), type: ToastType.ERROR }) },
  })
  return (
    <>
      {props.project?.platform ?
        <div>
          <div className="btn gradient-background text-white normal-case rounded-full" onClick={() => createProjectFacebookAudienceMutation.mutate()}>
            Create New Audience <SpinningLoading isLoading={createProjectFacebookAudienceMutation.isLoading} />
          </div>
          <div className="flex flex-col gap-y-3 mt-5">
            {facebookAudiences?.map((facebookAudience: FacebookAudience) => <TestAudience key={facebookAudience.id} audience={facebookAudience} props={props} />)}
          </div>
        </div> :
        <div className="alert alert-info text-white border-none">
          You must choose a platform before building an audience
        </div>
      }
    </>
  )
})

export default TestAudienceContainer