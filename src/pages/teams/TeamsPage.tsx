import { observer } from "mobx-react-lite";

const TeamsPage = observer(() => {
  return (
    <div className="background" >
      <div>
        <p className="text-xl font-bold">Teams</p>
        <p className="text-base">
          These are the teams that you are a member of. Select a team, or create a new one.
        </p>
      </div>
    </div>
  )
})

export default TeamsPage