import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext, TeamsContext, ToastsContext } from "../../stores/stores";
import { useContext } from 'react'
import { Teams as Team, Teams_Users as TeamUser } from "../../gql/graphql";
import ErrorMessage from "../../components/lib/Error";
import InviteUser from "../../components/teams/InviteUser";

const TeamMembers = observer(() => {
  const { teamId } = useParams() as { teamId: string }
  const teamStore = useContext(TeamsContext)
  const navigate = useNavigate()
  const authStore = useContext(AuthContext)
  const toastsStore = useContext(ToastsContext)
  const element_id = 'leave_team_dialog'
  const { data, isLoading, error } = useQuery<Promise<Team | null>, Error, Team, QueryKey>({
    queryKey: ['team', teamId],
    queryFn: () => teamStore.fetchTeam(teamId)
  })
  const leaveTeam = useMutation({
    mutationFn: () => teamStore.leaveTeam(teamId),
    onSuccess: () => {
      (document.getElementById(element_id) as HTMLDialogElement).close()
      toastsStore.addToast({ message: 'You have successfully left this team', type: 'success' })
      navigate(`/teams`)
    },
    onError: (error: Error) => toastsStore.addToast({ message: error.message, type: 'error' })
  })

  function tableRow (teamUser: TeamUser) {
    return (
      <tr key={teamUser.user_id}>
        <td>{teamUser.user?.email}</td>
        <td>{new Date(teamUser.created_at).toLocaleDateString()}</td>
        { teamUser.user_id === authStore.id && <td><button className="btn btn-error btn-sm text-white normal-case" onClick={() => (document.getElementById(element_id) as HTMLDialogElement).show()}>Leave</button></td> }
      </tr>
    )
  }
  
  return (
    <>
    <p className="text-lg font-bold">
      Members
    </p>
    <div className="mt-4"><InviteUser /></div>
    { error && <ErrorMessage message={error.message}/>}
    { isLoading && <div>loading...</div>}
    { data && 
      <div>
        <table className="table mt-8">
          <thead>
            <tr>
              <th>Email</th>
              <th>Joined On</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {
              data.teams_users.map((item: TeamUser) => tableRow(item))
            }
          </tbody>
        </table>
      </div>
    }
    <dialog id={element_id} className="modal">
      <div className="modal-box">
        <p className="text-lg font-bold">
          Leave Team
        </p>
        <p>
          Are you sure you want to leave this team?
        </p>
        <div className="modal-action">
          <button className="btn gradient-background normal-case border-0 text-white" onClick={() => leaveTeam.mutate()}>Yes</button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    </>
  )
})

export default TeamMembers