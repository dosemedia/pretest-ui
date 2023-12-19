import { useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FacebookContext, ProjectsContext } from "../../stores/stores";
import { SpinningLoading } from "../lib/SpinningLoading";
import ErrorMessage from "../lib/Error";
import { Projects as Project } from "../../gql/graphql";
import { CombinedError } from "urql";
import UserReview from "./test_components/review/UserReview";
import { DateTime } from "luxon";
import { FacebookAdAccount } from "../../stores/facebook";

const ProjectAdminReview = observer(() => {
  const projectStore = useContext(ProjectsContext)
  const facebookStore = useContext(FacebookContext)
  const { projectId } = useParams() as { projectId: string }
  const [teamName, setTeamName] = useState<string | undefined>('')
  const { data: facebookAdAccount, isLoading: facebookAdAccountLoading, error: facebookAdAccountError } = useQuery<FacebookAdAccount | undefined, CombinedError>({
    queryKey: ['fetchFacebookAdAccount'],
    queryFn: () => facebookStore.getFacebookAdAccount()
  })
  const { data: project, isLoading, error } = useQuery<Project | undefined, CombinedError>({
    queryKey: ['fetchProject'],
    queryFn: () => projectStore.fetchFullProject({ projectId }),
  })
  function getError(): string {
    if (error) {
      return error.message
    } else if (facebookAdAccountError) {
      return facebookAdAccountError?.message
    }
    return ''
  }
  function renderField(title: string, data: string) {
    return <><span className="text-gray-400">{title}</span> <span>{data}</span></>
  }

  useEffect(() => {
    setTeamName(project?.teams_projects[0]?.team?.name)
  }, [project])
  return (
    <>
      <div className="m-8">
        {<SpinningLoading isLoading={[isLoading, facebookAdAccountLoading ]} />}
        {getError() && <ErrorMessage message={getError()} />}
        {project && teamName &&
          <div style={{ color: '#030102' }}>
            <div className="text-sm opacity-60">
              Project Review
            </div>
            <div className="text-lg">
              <span>{teamName}</span>: <span className="font-bold">{project.name}</span>
            </div>
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
            <div>
              <UserReview title="Review your test" onSave={() => { }} project={project} />
            </div>
          </div>
        }
      </div>
    </>
  )
})

export default ProjectAdminReview