import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { TeamsContext, AuthContext } from "../../stores/stores";
import { Teams as Team } from "../../gql/graphql";
import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import ErrorMessage from "../../components/lib/Error";
import { useNavigate, useParams } from "react-router-dom";
import { SpinningLoading } from '../../components/lib/SpinningLoading'
import MessageAlert from "../../components/MessageAlert";
import { Navigate } from 'react-router-dom';

const TeamsPage = observer(() => {
  const { teamId } = useParams() as { teamId: string }
  const teamsStore = useContext(TeamsContext)
  const authStore = useContext(AuthContext)
  const navigate = useNavigate()
  const { data: team, error: teamError, isLoading: teamIsLoading } = useQuery<Promise<Team | null>, Error, Team | null, QueryKey>({
    queryKey: ['fetchTeam', teamId],
    enabled: true,
    queryFn: () => teamsStore.fetchTeam(teamId)
  })
  const handleJoinTeam = () => {
    joinTeamMutation.mutate()
  }
  const joinTeamMutation = useMutation({
    mutationFn: () => teamsStore.joinTeam(teamId),
    onSuccess: () => {
      navigate('/team/' + teamId)
    }
  })
  const { data: isMember, error: isMemberError, isLoading: isMemberLoading } = useQuery<Promise<boolean>, Error, boolean, QueryKey>({
    queryKey: ['checkMembership', teamId, authStore.id],
    enabled: true,
    queryFn: () => teamsStore.checkMembership(teamId, authStore.id)
  })
  if (isMember) {
    // If user is already a member just redirect to team page
    return <Navigate to={'/team/' + teamId} replace />
  }
  return (
    <div className="background" >
      { teamError && <div className="my-3"><ErrorMessage message={teamError.message} /></div>}
      { isMemberError && <div className="my-3"><ErrorMessage message={isMemberError.message} /></div>}
      { joinTeamMutation.isError &&
        <div style={{marginTop: 20 }}>
          <MessageAlert message={(joinTeamMutation.error as Error).message} type="error" />
        </div>
      }
      <SpinningLoading isLoading={teamIsLoading || isMemberLoading} />
      { !teamIsLoading && !isMemberLoading && team &&
      <div>
        <p className="text-xl font-bold">Join : { team.name }</p>
        <button className="btn action-button text-base font-bold" onClick={handleJoinTeam} disabled={joinTeamMutation.isLoading}>
          Join Team <SpinningLoading isLoading={joinTeamMutation.isLoading} />
        </button>
      </div>
      }
      { !teamIsLoading && !isMemberLoading && !team &&
      <div>
        <div className="my-3"><ErrorMessage message="Team not found!" /></div>
      </div>
      }
    </div>
  )
})

export default TeamsPage