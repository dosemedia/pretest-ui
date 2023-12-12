import { observer } from "mobx-react-lite";
import { ReactElement } from "react";

const ProjectStepContainer: React.FC<{ children: ReactElement, title: string }> = observer(({ children, title }) => {
  return (
    <>
      <div className="text-lg configuration-title mb-4">
        {title}
      </div>
      {children}
    </>
  )
})

export default ProjectStepContainer