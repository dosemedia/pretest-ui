import { useState } from "react"
import { Teams as Team, Projects as Project } from "../../gql/graphql"
function DeleteModal({ element_id, model, model_type, onDelete }: { element_id: string, model_type: string, model: Project | Team | null, onDelete: { (): void } }) {
  const [validationName, setValidationName] = useState('')
  return (
    <>
      <dialog id={element_id} className="modal">
        {model &&
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete {model_type}</h3>
            <p className="py-4">Are you sure you want to delete <span className="font-bold">{model.name}</span>?</p>
            <div>
              <input className="input w-full" value={validationName} onChange={(e) => setValidationName(e.target.value)} placeholder={`Type '${model.name}' in order to delete`} />
            </div>
            <div className="modal-action">
              <button className="btn btn-error text-white mr-3" onClick={() => onDelete()} disabled={validationName !== model.name}>Delete</button>
              <button className="btn" onClick={() => { setValidationName(''); (document.getElementById(element_id) as HTMLDialogElement).close() }}>Close</button>
            </div>
          </div>
        }
      </dialog>
    </>
  )
}

export default DeleteModal