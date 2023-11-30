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
            <label className="label">
              <span className="text-sm opacity-60">Type <span className="font-bold">{model.name}</span> in order to delete</span>
            </label>
            <div>
              <input className="input w-full" value={validationName} onChange={(e) => setValidationName(e.target.value)} onKeyUp={(e) => e.key === 'Enter' && onDelete()} />
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