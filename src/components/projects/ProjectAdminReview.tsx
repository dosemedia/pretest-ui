import { useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { AuthContext, FacebookContext } from "../../stores/stores";
import { SpinningLoading } from "../lib/SpinningLoading";
import ErrorMessage from "../lib/Error";
import { Projects as Project } from "../../gql/graphql";
import { CombinedError } from "urql";
import { DateTime } from "luxon";
import { FacebookAdAccount } from "../../stores/facebook";

const ProjectAdminReview = observer(({ project }: { project?: Project }) => {
  const facebookStore = useContext(FacebookContext)
  const authStore = useContext(AuthContext)
  const [teamName, setTeamName] = useState<string | undefined>('')
  const { data: facebookAdAccount, isLoading: facebookAdAccountLoading, error: facebookAdAccountError } = useQuery<FacebookAdAccount | undefined, CombinedError>({
    queryKey: ['fetchFacebookAdAccount'],
    queryFn: () => facebookStore.getFacebookAdAccount()
  })
  function renderField(title: string, data: string) {
    return <><span className="text-gray-400">{title}</span> <span>{data}</span></>
  }

  useEffect(() => {
    setTeamName(project?.teams_projects[0]?.team?.name)
  }, [project])
  return (
    <>
      {authStore.isSuperadmin() &&
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
              </div>
            </div>
          }
        </div>
      }
    </>
  )
})

export default ProjectAdminReview