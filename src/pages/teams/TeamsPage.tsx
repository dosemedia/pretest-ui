import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { AuthContext, TeamsContext } from "../../stores/stores";
import { Teams as Team } from "../../gql/graphql";
import { QueryKey, useQuery } from "@tanstack/react-query";
import ErrorMessage from "../../components/lib/Error";
import CreateTeam from "../../components/teams/CreateTeam";
import { useNavigate } from "react-router-dom";

const TeamsPage = observer(() => {
  const teamsStore = useContext(TeamsContext)
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  const { data, error, refetch } = useQuery<Promise<Team[]>, Error, Team[], QueryKey>({
    queryKey: ['fetchTeams', auth.id],
    enabled: true,
    queryFn: () => teamsStore.fetchTeams()
  })
  function tableRow (team: Team) {
    
    return (
      <tr key={team.id} onClick={() => navigate(`/team/${team.id}`)} className="hover:bg-slate-100 cursor-pointer">
        <td>{team.name}</td>
        <th>{team.id}</th>
        <td>{new Date(team.created_at).toLocaleDateString()}</td>
        <td>{team.teams_users_aggregate?.aggregate?.count}</td>
        <td>{ teamsStore.checkIfOwnsTeam(team) ? <div className="badge badge-neutral">Owner</div> : <div className="badge">Member</div>}</td>
      </tr>
    )
  }
  return (
    <div className="background" >
      { error && <div className="my-3"><ErrorMessage message={error.message} /></div>}
      <div>
        <p className="text-xl font-bold">Teams</p>
        <p className="text-base">
          These are the teams that you are a member of
        </p>
      </div>
      { !teamsStore.ownsTeam &&
        <div className="mt-4">
          <CreateTeam onCreate={() => refetch()} />
        </div>
      }
      { data && 
        <table className="table mt-8">
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Created At</th>
              <th>Members</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item: Team) => tableRow(item))
            }
          </tbody>
        </table>
      }
      {
        data?.length === 0 && 
        <div className="mt-6">
          You are currently not a member of any teams
        </div>
      }
    </div>
  )
})

export default TeamsPage