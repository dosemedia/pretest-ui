import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { DateTime } from "luxon"
import { ProjectStepChildProps } from "../../ProjectStepContainer";
import { ProjectStatus } from "../../../../stores/projects";
const TestRuntime: React.FC<ProjectStepChildProps> = observer((props: ProjectStepChildProps) => {
  const dateFormat = "yyyy-MM-dd'T'hh:mm"
  const [startTime, setStartTime] = useState(DateTime.fromISO(props.project?.start_time || DateTime.now().toISO()).toLocal())
  const [stopTime, setStopTime] = useState(DateTime.fromISO(props.project?.stop_time || DateTime.now().toISO()).toLocal())
  interface Runtime {
    label: string,
    value: DateTime
  }
  const items: Runtime[] = [
    {
      label: '3',
      value: startTime.plus({ days: 3 })
    },
    {
      label: '4',
      value: startTime.plus({ days: 4 })
    },
    {
      label: '5',
      value: startTime.plus({ days: 5 })
    }
  ]

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const date = DateTime.fromFormat(e.target.value, dateFormat)
    setStartTime(date)
  }

  useEffect(() => {
    const diff = Math.abs(startTime.diff(stopTime, 'days').days)
    if (props.saveProject) {
      props.saveProject({ stop_time: diff <= 5 && diff >= 3 ? stopTime.toISO() : null, start_time: startTime.toISO() })
    }
  }, [startTime, stopTime])
  function selectionCard(item: Runtime) {
    return (
      <div key={item.label} className={`card cursor-pointer ${stopTime.day === item.value.day && 'card-selected'} ${props.project?.status !== ProjectStatus.DRAFT && 'disabled'}`} style={{ backgroundColor: 'white', padding: '0px 0px', width: 174 }} onClick={() => setStopTime(item.value)}>
        <div className="card-body">
          <div className="flex flex-col items-center">
            <span className="text-[42px] font-black text-black">{item.label}<span className="text-base font-bold ml-1">days</span></span>
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <div>
        <div>
          <label className="label">
            <span className="text-sm opacity-60">Start Time</span>
          </label>
          <input
            disabled={props.project?.status !== ProjectStatus.DRAFT}
            type="datetime-local"
            id="meeting-time"
            className="rounded-lg p-3 mb-5"
            style={{ border: '1px solid grey' }}
            name="meeting-time"
            value={startTime.toFormat(dateFormat)}
            onChange={onChange} />
        </div>
        <label className="label">
          <span className="text-sm opacity-60">Duration</span>
        </label>
        <div className="flex flex-wrap gap-y-10 gap-x-10">
          {items.map((item) => selectionCard(item))}
        </div>
        <div className="text-xxs opacity-60 font-medium mt-4">
        Orchard recommends a campaign run time to be <br></br> between 3 to 5 days. Standard run time is 3 days.
        </div>
      </div>
    </>
  )
})

export default TestRuntime