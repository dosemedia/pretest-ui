import { Teams as Team, Projects as Project } from "../../gql/graphql"
function DeleteModal ({ element_id, model, model_type, onDelete }: { element_id: string, model_type: string, model: Project | Team | null, onDelete: { (): void } }) {
  return (
    <>
      <dialog id={element_id} className="modal">
        { model && 
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete {model_type}</h3>
            <p className="py-4">Are you sure you want to delete <span className="font-bold">{model.name}</span>?</p>
            <div className="modal-action">
              <button className="btn btn-error text-white mr-3" onClick={() => onDelete()}>Delete</button>
              <button className="btn" onClick={() => (document.getElementById(element_id) as HTMLDialogElement).close()}>Close</button>
            </div>
          </div>
        }
      </dialog>
    </>
  )
}

export default DeleteModal