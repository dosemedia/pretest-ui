import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { TeamsContext } from "../../stores/stores";
import { Teams as Team } from "../../gql/graphql";

function tableRow (team: Team) {
  return (
    <tr key={team.id}>
      <td>{team.name}</td>
      <th>{team.id}</th>
      <td>{new Date(team.created_at).toLocaleDateString()}</td>
    </tr>
  )
}

const TeamsPage = observer(() => {
  const teamsStore = useContext(TeamsContext)
  return (
    <div className="background" >
      <div>
        <p className="text-xl font-bold">Teams</p>
        <p className="text-base">
          These are the teams that you are a member of
        </p>
      </div>
      <table className="table mt-8">
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {
            teamsStore.teams.map((item: Team) => tableRow(item))
          }
        </tbody>
      </table>
    </div>
  )
})

export default TeamsPage