import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { AuthContext, TeamsContext } from "../../stores/stores";
import { Teams as Team } from "../../gql/graphql";
import { QueryKey, useQuery } from "@tanstack/react-query";
import ErrorMessage from "../../components/lib/Error";

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
  const auth = useContext(AuthContext)
  const { data, error } = useQuery<Promise<Team[]>, Error, Team[], QueryKey>({
    queryKey: ['fetchTeams', auth.id],
    enabled: true,
    queryFn: () => teamsStore.fetchTeams()
  })
  return (
    <div className="background" >
      { error && <div className="my-3"><ErrorMessage message={error.message} /></div>}
      <div>
        <p className="text-xl font-bold">Teams</p>
        <p className="text-base">
          These are the teams that you are a member of
        </p>
      </div>
      { data && 
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
              data.map((item: Team) => tableRow(item))
            }
          </tbody>
        </table>
        }
    </div>
  )
})

export default TeamsPage