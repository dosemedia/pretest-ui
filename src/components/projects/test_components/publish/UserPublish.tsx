import { observer } from "mobx-react-lite";
import { ProjectStepChildProps } from "../../ProjectStepContainer";

const UserPublish:React.FC<ProjectStepChildProps> = observer(() => {
  return (
    <>
      <div className="text-sm">
        Please reach out if you have any questions or concerns.<br></br>Our QA process usually takes 24 hours.
      </div>
      <div className="mt-3">
        <a className="contact-link" href="mailto:selfserve@orchard-insights.com">selfserve@orchard-insights.com</a>
      </div>
      <div>
        <a className="contact-link" href="phone:555-555-5555">555-555-5555</a>
      </div>
    </>
  )
})

export default UserPublish
