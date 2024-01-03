import { useContext } from "react"
import { AuthContext } from '../../stores/stores';
import FileUploader, { ProjectBucketUpload } from '../lib/FileUpload';

function LandingPageImageField({ value, onChange, projectId }: { value: string, onChange: (value: string) => void, projectId: string }) {
  const authStore = useContext(AuthContext)

  return (
    <div>
      {value &&
        <div>
          <img src={value} style={{ maxWidth: 200 }} />
          <button className="btn btn-error text-white mt-3" onClick={() => onChange('')}>Remove</button>
        </div>
      }

      {!value &&
        <div>
          <label className="label">
            <span className="text-sm">Upload Image</span>
          </label>
          {<FileUploader uploader={new ProjectBucketUpload({ projectId: projectId, folder: 'landing_pages', filePath: authStore.filesBaseUrl + '/files/project-assets', multerFieldName: 'project_assets' })} onUpload={(url) => onChange(url)} />
          }
        </div>
      }
    </div>
  )
}

export default LandingPageImageField