import { observer } from "mobx-react-lite";
import { Projects as Project } from "../../gql/graphql";
import { useContext, useState } from "react";
import { ProjectsContext, ToastsContext } from "../../stores/stores";
import { useQuery, QueryKey, useMutation } from "@tanstack/react-query";
import ErrorMessage from "../lib/Error";
import DeleteModal from "../lib/DeleteModal";

const ProjectsTable = observer(() => {
  const projectStore = useContext(ProjectsContext)
  const toastStore = useContext(ToastsContext)
  const [itemToDelete, setItemToDelete] = useState<Project | null>(null)
  const deleteModalID = 'delete_modal'
  const { data, error, isLoading, refetch } = useQuery<Promise<Project[] | undefined>, Error, Project[], QueryKey>({
    queryKey: ['fetchProjects'],
    queryFn: () => projectStore.fetchProjects({ teamId: "994c4906-c5a4-40f4-95ab-23b9ed5fb34d" })
  })
  const onDelete = useMutation({
    onSuccess: () => { 
      refetch();
      (document.getElementById(deleteModalID) as HTMLDialogElement).close();
      toastStore.addToast({ message: 'You have successfully deleted this project', type: 'success' })
    },
    mutationFn: () => projectStore.delete({ id: itemToDelete?.id }),
    onError: (error: Error) => {
      toastStore.addToast({ message: error.message, type: 'error' })
    }
  })
  function tableRow (project: Project) {
    return (
      <tr key={project.id}>
        <td>{project.name}</td>
        <th>{project.id}</th>
        <td>{new Date(project.created_at).toLocaleDateString()}</td>
        <td><button className="btn btn-circle btn-sm bg-error border-none" onClick={()=> { (document.getElementById(deleteModalID) as HTMLDialogElement).showModal(); setItemToDelete(project) }}><span className="mdi mdi-delete text-white"></span></button></td>
      </tr>
    )
  }
  return (
    <>
    <p className="text-xl font-bold">Projects</p>
     { isLoading && <div>loading...</div>}
     {
      error && <ErrorMessage message={error.message} />
     }
     { data && data.length == 0 && <div>You have no projects yet.</div>}
     { data && data.length > 0 &&
      <div>
        <table className="table mt-8">
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Created At</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((item: Project) => tableRow(item))
            }
          </tbody>
        </table>
      </div>
    }
    <DeleteModal element_id={deleteModalID} model={itemToDelete} onDelete={() => onDelete.mutate()}/>
    </>
  ) 
})

export default ProjectsTable