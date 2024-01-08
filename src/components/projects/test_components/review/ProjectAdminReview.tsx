import { useMutation, useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { AuthContext, FacebookContext, ProjectsContext, ToastsContext } from "../../../../stores/stores";
import { SpinningLoading } from "../../../lib/SpinningLoading";
import ErrorMessage from "../../../lib/Error";
import { Projects as Project } from "../../../../gql/graphql";
import { CombinedError } from "urql";
import { DateTime } from "luxon";
import { FacebookAdAccount } from "../../../../stores/facebook";
import { ToastType } from "../../../../stores/toast";
import { ProjectStatus } from "../../../../stores/projects";

const ProjectAdminReview = observer(({ project }: { project?: Project }) => {
  const facebookStore = useContext(FacebookContext)
  const projectStore = useContext(ProjectsContext)
  const toastStore = useContext(ToastsContext)
  const authStore = useContext(AuthContext)
  const [teamName, setTeamName] = useState<string | undefined>('')
  const { data: facebookAdAccount, isLoading: facebookAdAccountLoading, error: facebookAdAccountError } = useQuery<FacebookAdAccount | undefined, CombinedError>({
    queryKey: ['fetchFacebookAdAccount'],
    queryFn: () => facebookStore.getFacebookAdAccount()
  })
  const submitForBuildMutation = useMutation({
    mutationKey: ['SubmitForBuildMutation'],
    mutationFn: () => projectStore.submitForBuild({ projectId: project?.id, returnUrl: window.location.href }),
    onSuccess: () => toastStore.addToast({ message: 'Project successfully submitted for build!', type: ToastType.SUCCESS }),
    onError: (e) => toastStore.addToast({ message: e as string, type: ToastType.ERROR })
  })
  function renderField(title: string, data: string) {
    return <><span className="text-gray-400">{title}</span> <span>{data}</span></>
  }

  useEffect(() => {
    setTeamName(project?.teams_projects[0]?.team?.name)
  }, [project])
  return (
    <>
      {authStore.superadmin &&
        <div>
          {<SpinningLoading isLoading={[facebookAdAccountLoading]} />}

          {project && teamName &&
            <div className="bg-gray-100 w-6/12 p-6 rounded-md" style={{ color: '#030102' }}>
              <p className="text-base font-bold">
                Admin Review <i className="text-sm font-normal">(invisible to users)</i>
              </p>
              {facebookAdAccountError && <div className="my-2"><ErrorMessage message={facebookAdAccountError.message} /></div>}
              <div className="flex flex-col gap-y-3 my-4">
                <div>
                  {renderField('Start time:', DateTime.fromISO(project.start_time).toLocaleString())}
                </div>
                <div>
                  {renderField('Stop time:', DateTime.fromISO(project.stop_time).toLocaleString())}
                </div>
                <div>
                  {facebookAdAccount && renderField('Facebook Ad Account:', facebookAdAccount?.name)}
                </div>
                <button disabled={project.status === ProjectStatus.SUBMITTED || submitForBuildMutation.data} className="btn gradient-background normal-case rounded-full text-white" onClick={() => submitForBuildMutation.mutate()}>
                  Submit For Build <SpinningLoading isLoading={submitForBuildMutation.isLoading} />
                </button>
              </div>
            </div>
          }
        </div>
      }
    </>
  )
})

export default ProjectAdminReview