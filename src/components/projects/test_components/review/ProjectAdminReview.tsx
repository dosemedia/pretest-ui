import { useMutation, useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AuthContext, FacebookContext, ProjectsContext, ToastsContext } from "../../../../stores/stores";
import { SpinningLoading } from "../../../lib/SpinningLoading";
import ErrorMessage from "../../../lib/Error";
import { CombinedError } from "urql";
import { DateTime } from "luxon";
import { FacebookAdAccount } from "../../../../stores/facebook";
import { ToastType } from "../../../../stores/toast";
import { ProjectStatus } from "../../../../stores/projects";
import { ProjectStepChildProps } from "../../ProjectStepContainer";

const ProjectAdminReview: React.FC<ProjectStepChildProps> = observer((props: ProjectStepChildProps) => {
  const dateFormat = "yyyy-MM-dd'T'HH:mm"
  const facebookStore = useContext(FacebookContext)
  const projectStore = useContext(ProjectsContext)
  const toastStore = useContext(ToastsContext)
  const authStore = useContext(AuthContext)
  const [startTime, setStartTime] = useState(DateTime.fromISO(props.project?.start_time || DateTime.now().toISO()).toLocal())
  const [stopTime, setStopTime] = useState(DateTime.fromISO(props.project?.stop_time || DateTime.now().plus({ days: props.project?.duration || 3 }).toISO()).toLocal())
  const { data: facebookAdAccount, isLoading: facebookAdAccountLoading, error: facebookAdAccountError } = useQuery<FacebookAdAccount | undefined, CombinedError>({
    queryKey: ['fetchFacebookAdAccount'],
    queryFn: () => facebookStore.getFacebookAdAccount()
  })
  const submitForBuildMutation = useMutation({
    mutationKey: ['SubmitForBuildMutation'],
    mutationFn: () => projectStore.submitForBuild({ projectId: props.project?.id, returnUrl: window.location.href }),
    onSuccess: () => {
      toastStore.addToast({ message: 'Project successfully submitted for build!', type: ToastType.SUCCESS });

    },
    onError: (e) => toastStore.addToast({ message: e as string, type: ToastType.ERROR })
  })
  function renderField(title: string, data: string) {
    return <><span className="text-gray-400">{title}</span> <span>{data}</span></>
  }

  useEffect(() => {
    if (props.saveProject) {
      props.saveProject({ start_time: startTime.toISO(), stop_time: startTime.plus({ days: props.project?.duration || 3 }) })
    }
  }, [startTime])

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    console.log('onChange')
    const date = DateTime.fromFormat(e.target.value, dateFormat)
    setStartTime(date)
    setStopTime(date.plus({ days: props.project?.duration || 3 }))
  }

  return (
    <>
      {authStore.superadmin &&
        <div>
          {<SpinningLoading isLoading={[facebookAdAccountLoading]} />}

          {props.project &&
            <div className="bg-gray-100 w-6/12 p-6 rounded-md" style={{ color: '#030102' }}>
              <p className="text-base font-bold">
                Admin Review <i className="text-sm font-normal">(invisible to users)</i>
              </p>
              {facebookAdAccountError && <div className="my-2"><ErrorMessage message={facebookAdAccountError.message} /></div>}
              <div className="flex flex-col gap-y-3 my-4">
                <label className="label">
                  <span className="text-sm opacity-60">Start Time</span>
                </label>
                <input
                  type="datetime-local"
                  id="meeting-time"
                  className="rounded-lg p-3 mb-5"
                  style={{ border: '1px solid grey' }}
                  name="meeting-time"
                  value={startTime?.toFormat(dateFormat)}
                  onChange={onChange} />
                <label className="label">
                  <span className="text-sm opacity-60">Stop Time</span>
                </label>
                <div>
                  {stopTime && DateTime.fromISO(stopTime.toISO()!).toLocaleString(DateTime.DATETIME_SHORT)}
                </div>
                <div>
                  {facebookAdAccount && renderField('Facebook Ad Account:', facebookAdAccount?.name)}
                </div>
                <button disabled={props.project?.status === ProjectStatus.SUBMITTED || submitForBuildMutation.data} className="btn gradient-background normal-case rounded-full text-white" onClick={() => submitForBuildMutation.mutate()}>
                  submit for build <SpinningLoading isLoading={submitForBuildMutation.isLoading} />
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