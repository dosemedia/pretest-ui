/* eslint-disable @typescript-eslint/no-explicit-any */
// import { observer } from "mobx-react-lite";
import React, { PropsWithChildren, ReactElement, useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ProjectsContext } from "../../stores/stores";
import { Projects as Project, Projects_Set_Input } from "../../gql/graphql";
import _ from 'lodash'

interface Props {
  step: number
}

export interface ProjectStepChildProps {
  project?: Project,
  title?: string,
  step?: number,
  alwaysShow?: boolean
  onSave?: (arg0: Projects_Set_Input) => void
}


const ProjectStepContainer: React.FC<PropsWithChildren<Props>> = ({ step, children }) => {
  const projectStore = useContext(ProjectsContext)
  const { projectId } = useParams() as { projectId: string }
  const skipUpdate = useRef<boolean>()
  const { data: project, refetch } = useQuery({
    queryKey: ['fetchProject'],
    retry: false,
    queryFn: () => projectStore.fetchFullProject({ projectId })
  })
  const projectMutation = useMutation({
    mutationFn: (payload: object) => projectStore.updateProject({ id: projectId, payload: payload as Project }),
    onSuccess: () => {
      refetch()
    }
  })
  useEffect(() => {
    skipUpdate.current = true
  }, [step])
  const onSave = _.debounce(async (payload: object) => {
    if (!skipUpdate.current) {
      await projectMutation.mutateAsync(payload)
    }
    skipUpdate.current = false
  }, 1000)
  return (
    <>
      {project && React.Children.map(children as ReactElement, (child, index) => ((step - 1 === index) || child.props.alwaysShow) &&
        <div>
          <div className="text-lg configuration-title mb-4">
            {child.props.title}
          </div>
          {React.cloneElement(child, { title: child.props.title, ...child.props, project, onSave, step } as React.FC<PropsWithChildren>)}</div>)}
    </>
  )
  // const setSearchParams = useSearchParams()[1]
  // const [waiting, setIsWaiting] = useState(false)
  // async function executeOnNext () {
  //   setIsWaiting(true)
  //   try {
  //     await currentStepItem?.overrideNext?.onNext()
  //   } catch (e) {
  //     console.log(e)
  //   }
  //   setIsWaiting(false)
  // }
  // return (
  //   <>
  //     <div>
  //       <div className="text-lg configuration-title mb-4">
  //         {title}
  //       </div>
  //       {children}
  //       <div>
  //         <div className="mt-5 flex gap-4">
  //           {currentStep > 1 && <button className="btn action-button secondary text-base text-black" onClick={() => setSearchParams({ step: (currentStep - 1).toString() })}>
  //             <span className="mdi mdi-chevron-left text-base" /> Go Back
  //           </button>
  //           }
  //           {currentStep < 13 && currentStep != 6 &&
  //             <button className="btn action-button text-base" onClick={() => currentStepItem?.overrideNext?.onNext ? executeOnNext() : setSearchParams({ step: (currentStep + 1).toString() })} disabled={!currentStepItem?.isComplete}>
  //               {currentStepItem?.overrideNext?.name || 'Next' } { waiting ? <SpinningLoading isLoading={waiting} /> : <span className="mdi mdi-chevron-right text-base" /> }
  //             </button>
  //           }
  //         </div>
  //       </div>
  //     </div>

  //   </>
  // )
}

export default ProjectStepContainer