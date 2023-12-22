import axios from 'axios'
import { useContext, useState } from "react"
import { AuthContext } from '../../stores/stores';
import { useMutation } from '@tanstack/react-query';
import { SpinningLoading } from '../lib/SpinningLoading';

function LandingPageImageField({ value, onChange, projectId }: { value: string, onChange: (value: string) => void, projectId: string }) {
  const [busy, setBusy] = useState(false)
  const authStore = useContext(AuthContext)

  async function uploadImage(file: File | null | undefined) {
    if (file) {
      setBusy(true)
      const form = new FormData()
      form.append('project_id', projectId)
      form.append('model', 'landing_pages')
      form.append('project_assets', file)
      try {
        const response = await axios.post(authStore.filesBaseUrl + '/files/project-assets', form, {
          headers: {
            Authorization: 'Bearer ' + authStore.token
          }
        })
        return response.data
      } catch (e) {
        setBusy(false)
        return new Error(e as string)
      } finally {
        setBusy(false)
      }
    }
  }

  const uploadImageMutation = useMutation({
    mutationFn: (files: FileList | null) => uploadImage(files?.item(0)),
    onSuccess: (data) => { 
      onChange(authStore.filesBaseUrl + '/files/project-assets/' + data.key)
    }
  })

  return (
    <div>
      { value && 
      <div>
        <img src={value} style={{ maxWidth: 200 }} /> 
        <button className="btn btn-error text-white mt-3" onClick={() => onChange('')}>Remove</button>
      </div>
      }

      { !value && 
        <div>
          <label className="label">
            <span className="text-sm">Upload Image</span>
          </label>
          {busy ? 
            <SpinningLoading isLoading={uploadImageMutation.isLoading} />
            :
            <input 
              type="file"
              className="file-input w-full max-w-xs"
              onChange={(e) => uploadImageMutation.mutate(e.target.files)} />
          }
        </div>
      }

      {/* <input
        type="text"
        className="input"
        placeholder="Enter header image url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      /> */}
    </div>
  )
}

export default LandingPageImageField