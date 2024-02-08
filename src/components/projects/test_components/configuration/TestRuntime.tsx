import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { ProjectStepChildProps } from "../../ProjectStepContainer";
import { ProjectStatus } from "../../../../stores/projects";
const TestRuntime: React.FC<ProjectStepChildProps> = observer((props: ProjectStepChildProps) => {
  const [duration, setDuration] = useState(props.project?.duration)
  const items: number[] = [3, 4, 5]


  useEffect(() => {
    if (props.saveProject) {
      props.saveProject({ duration })
    }
  }, [duration])
  function selectionCard(item: number) {
    return (
      <div key={item} className={`card cursor-pointer ${duration === item && 'card-selected'} ${props.project?.status !== ProjectStatus.DRAFT && 'disabled'}`} style={{ backgroundColor: 'white', padding: '0px 0px', width: 174 }} onClick={() => setDuration(item)}>
        <div className="card-body">
          <div className="flex flex-col items-center">
            <span className="text-[42px] font-black text-black">{item}<span className="text-base font-bold ml-1">days</span></span>
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <div>
        <div>
          {/* <input
            disabled={props.project?.status !== ProjectStatus.DRAFT}
            type="datetime-local"
            id="meeting-time"
            className="rounded-lg p-3 mb-5"
            style={{ border: '1px solid grey' }}
            name="meeting-time"
            value={startTime.toFormat(dateFormat)}
            onChange={onChange} /> */}
        </div>
        <label className="label">
          <span className="text-sm opacity-60">Duration</span>
        </label>
        <div className="flex flex-wrap gap-y-10 gap-x-10">
          {items.map((item) => selectionCard(item))}
        </div>
        <div className="text-xxs opacity-60 font-medium mt-4">
          Orchard recommends a campaign run time to be <br></br> between 3 to 5 days. Standard run time is 5 days.
        </div>
      </div>
    </>
  )
})

export default TestRuntime