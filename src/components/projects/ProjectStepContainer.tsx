/* eslint-disable @typescript-eslint/no-explicit-any */
// import { observer } from "mobx-react-lite";
import React, { PropsWithChildren, ReactElement, useContext, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ProjectsContext } from "../../stores/stores";
import { Projects as Project, Projects_Set_Input } from "../../gql/graphql";
import _ from 'lodash'
import ProjectMenu from "./ProjectMenu";
import { ProjectDraftMenu } from "./ProjectDraft";
import { DateTime } from "luxon";

interface Props {
  step: number
}

export interface ProjectStepChildProps {
  project?: Project,
  title?: string,
  onSave?: (arg0: Projects_Set_Input) => void
}


const ProjectStepContainer: React.FC<PropsWithChildren<Props>> = ({ step, children }) => {
  const projectStore = useContext(ProjectsContext)
  const { projectId } = useParams() as { projectId: string }
  const [currentStep, setCurrentStep] = useState<ProjectDraftMenu>()
  const setSearchParams = useSearchParams()[1];
  const { data: project, refetch } = useQuery({
    queryKey: ['fetchProject', projectId],
    retry: false,
    queryFn: () => projectStore.fetchFullProject({ projectId })
  })
  const projectMutation = useMutation({
    mutationFn: (payload: object) => projectStore.updateProject({ id: projectId, payload: payload as Project }),
    onSuccess: () => {
      console.log('~~ project updated')
      refetch()
    }
  })
  function projectHasChanges(payload: Projects_Set_Input) {
    // If payload is empty, update the project (Due to some components throwing out dummy updates because they aren't modifying the project directly, but we want the user to know their changes saved)
    if (Object.keys(payload).length === 0) {
      return true
    } 
    if (project) {
      for (const key of Object.keys(payload)) {
        if (project[key as keyof Project] !== payload[key as keyof Projects_Set_Input]) {
          return true
        }
      }
    }
    return false
  }
  const onSave = _.debounce(async (payload: Projects_Set_Input) => {
  
    if (projectHasChanges(payload)) {
      payload.updated_at = DateTime.now().toISO()
      await projectMutation.mutateAsync(payload)
    }
  }, 1000)
  async function onNext() {
    await currentStep?.overrideNext?.onNext()
    refetch()
  }
  return (
    <>
      <div className="flex flex-wrap justify-between gap-y-12 gap-x-4">
        <div className="flex-initial">
          {project && <ProjectMenu project={project} onSave={onSave} step={step} currentStep={(val: ProjectDraftMenu) => setCurrentStep(val)} />}
        </div>
        <div className="flex-initial w-full md:w-8/12">
          {project && React.Children.map(children as ReactElement, (child, index) => ((step - 1 === index) || child.props.alwaysShow) &&
            <>

              <div className="text-lg configuration-title mb-4">
                {child.props.title}
              </div>
              {React.cloneElement(child, { title: child.props.title, ...child.props, project, onSave, step } as React.FC<PropsWithChildren>)}
              <div>
                <div className="mt-5 flex gap-4">
                  {step > 1 && <button className="btn action-button secondary text-base text-black" onClick={() => setSearchParams({ step: (step - 1).toString() })}>
                    <span className="mdi mdi-chevron-left text-base" /> Go Back
                  </button>
                  }
                  {step < React.Children.count(children) && step != 6 && !child.props.alwaysShow &&
                    <button className="btn action-button text-base" onClick={() => currentStep?.overrideNext?.onNext ? onNext() : setSearchParams({ step: (step + 1).toString() })} disabled={!currentStep?.isComplete}>
                      {currentStep?.overrideNext?.name || 'Next'}
                    </button>
                  }
                </div>
              </div>
            </>
          )}
        </div>
      </div>
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

  //     </div>

  //   </>
  // )
}

export default ProjectStepContainer

