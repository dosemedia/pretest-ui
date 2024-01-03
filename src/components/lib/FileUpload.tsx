import axios from "axios"
import { SpinningLoading } from "./SpinningLoading"
import { useMutation } from "@tanstack/react-query"
import { observer } from "mobx-react-lite"
import {  authStore } from "../../stores/stores"

abstract class FileUpload  {
  form: FormData = new FormData()
  filePath: string = '' // ex. authStore.filesBaseUrl + '/files/project-assets'
  multerFieldName: string = '' // ex. avatar
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract upload(file: File | null | undefined): Promise<any>
}

export class ProjectBucketUpload extends FileUpload {
  projectId: string = ''
  folder: string = ''
  constructor ({ projectId, folder, filePath, multerFieldName }: { projectId: string, folder: string, filePath: string, multerFieldName: string }) {
    super()
    this.projectId = projectId
    this.filePath = filePath
    this.multerFieldName = multerFieldName
    this.folder = folder
  }
  async upload(file: File | null | undefined) {
    if (file) {
      this.form.append('project_id', this.projectId)
      this.form.append('folder',this.folder)
      // form.append('model', 'project_facebook_creative_template')
      this.form.append(this.multerFieldName, file)
      try {
        const response = await axios.post(this.filePath, this.form, {
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

const FileUploader = observer(({ uploader, onUpload, accept }: { uploader: FileUpload, onUpload: (arg0: string) => void, accept?: string | null }) => {
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
    onSuccess: (data) => { onUpload(`${uploader.filePath}/${data?.key}`); }
  })
  return (
  <>
    {uploadCreativeAssetMutation.isLoading ? <SpinningLoading isLoading={uploadCreativeAssetMutation.isLoading} /> : <input type="file" accept={accept || 'image/*'} className="file-input w-full max-w-xs" onChange={(e) => uploadCreativeAssetMutation.mutate(e.target.files)} />}
  </>
  )
})

export default FileUploader