import axios from "axios"
import { SpinningLoading } from "./lib/SpinningLoading"
import { useMutation } from "@tanstack/react-query"
import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { AuthContext, authStore } from "../stores/stores"

abstract class FileUpload  {
  form: FormData = new FormData()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract upload(file: File | null | undefined): Promise<any>
}

export class ProjectBucketUpload extends FileUpload {
  projectId: string = ''
  model: string = ''
  constructor ({ projectId, model }: { projectId: string, model: string }) {
    super()
    this.projectId = projectId
    this.model = model
  }
  async upload(file: File | null | undefined) {
    if (file) {
      this.form.append('project_id', this.projectId)
      this.form.append('model',this.model)
      // form.append('model', 'project_facebook_creative_template')
      this.form.append('project_assets', file)
      try {
        const response = await axios.post(authStore.filesBaseUrl + '/files/project-assets', this.form, {
          headers: {
            Authorization: 'Bearer ' + authStore.token
          }
        })
        return response.data
      } catch (e) {
        return new Error(e as string)
      }
    }
  }
}

const FileUploader = observer(({ uploader, onUpload }: { uploader: FileUpload, onUpload: (arg0: object) => void }) => {
  const authStore = useContext(AuthContext)
  async function uploadAsset(file: File | null | undefined) {
    try {
      const fileData = await uploader.upload(file)
      return fileData
    } catch (e) {
      console.log(e)
    }
  }

  const uploadCreativeAssetMutation = useMutation({
    mutationFn: (files: FileList | null) => uploadAsset(files?.item(0)),
    onSuccess: (data) => { onUpload({ logoImage: authStore.filesBaseUrl + '/files/project-assets/' + data?.key }); }
  })
  return (
  <>
    {uploadCreativeAssetMutation.isLoading ? <SpinningLoading isLoading={uploadCreativeAssetMutation.isLoading} /> : <input type="file" className="file-input w-full max-w-xs" onChange={(e) => uploadCreativeAssetMutation.mutate(e.target.files)} />}
  </>
  )
})

export default FileUploader