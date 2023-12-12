import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { ReactElement } from "react";
import { useSearchParams } from "react-router-dom";
import { ProjectDraftMenu } from "./ProjectDraft";
import { SpinningLoading } from "../lib/SpinningLoading";

const ProjectStepContainer: React.FC<{ children: ReactElement, title: string, currentStep: number, currentStepItem: ProjectDraftMenu | null | undefined }> = observer(({ children, title, currentStep, currentStepItem }) => {
  const setSearchParams = useSearchParams()[1]
  const [waiting, setIsWaiting] = useState(false)
  async function executeOnNext () {
    setIsWaiting(true)
    try {
      await currentStepItem?.overrideNext?.onNext()
    } catch (e) {
      console.log(e)
    }
    setIsWaiting(false)
  }
  return (
    <>
      <div>
        <div className="text-lg configuration-title mb-4">
          {title}
        </div>
        {children}
        <div>
          <div className="mt-5 flex gap-4">
            {currentStep > 1 && <button className="btn action-button secondary text-base text-black" onClick={() => setSearchParams({ step: (currentStep - 1).toString() })}>
              <span className="mdi mdi-chevron-left text-base" /> Go Back
            </button>
            }
            {currentStep < 13 && currentStep != 6 &&
              <button className="btn action-button text-base" onClick={() => currentStepItem?.overrideNext?.onNext ? executeOnNext() : setSearchParams({ step: (currentStep + 1).toString() })} disabled={!currentStepItem?.isComplete}>
                {currentStepItem?.overrideNext?.name || 'Next' } { waiting ? <SpinningLoading isLoading={waiting} /> : <span className="mdi mdi-chevron-right text-base" /> }
              </button>
            }
          </div>
        </div>
      </div>

    </>
  )
})

export default ProjectStepContainer