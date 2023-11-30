import React, { useContext, useState } from 'react';
import CreativeTemplate from './CreativeTemplate';
import axios from 'axios'
import { AuthContext } from '../../stores/stores';
import { useMutation } from '@tanstack/react-query';
import { SpinningLoading } from '../lib/SpinningLoading';
import { useParams } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SimpleTextLogoRender: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="flex items-center justify-center" style={{ backgroundColor: data.background, width: '100%', height: 400 }}>
      <div className="bg-white rounded-xl w-10/12 p-8">
        <div className="flex items-center gap-x-6">
          <img src={data.logoImage} style={{ borderRadius: '100%', width: 60 }} />
          <div>
            <span className="font-bold">Elisabeth Parker<span className="mdi mdi-check-decagram text-blue-500 ml-2" /></span>
            <p className="text-gray-600 text-xxs">
              @elisabethparker
            </p>
          </div>
        </div>
        <div className="mt-6">
          {data.mainCopy}
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SimpleTextLogoForm: React.FC<{ data: any, onChange: (newData: any) => void }> = ({ data, onChange }) => {
  const [busy, setBusy] = useState(false)
  const authStore = useContext(AuthContext)
  const { projectId } = useParams() as { projectId: string }
  async function uploadCreativeAsset(file: File | null | undefined) {
    if (file) {
      setBusy(true)
      const form = new FormData()
      form.append('project_id', projectId)
      form.append('model', 'project_facebook_creative_template')
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
      }
    }
  }

  const uploadCreativeAssetMutation = useMutation({
    mutationFn: (files: FileList | null) => uploadCreativeAsset(files?.item(0)),
    onSuccess: (data) => { onChange({ ...formData, logoImage: authStore.filesBaseUrl + '/files/project-assets/' + data.key }); setBusy(false) }

  })

  const formData = data || {
    background: '#298493',
    logoImage: 'https://creatomate.com/files/assets/d6628425-8e35-4fee-9de8-a18d21309546',
    mainCopy: 'Cultivate an optimistic mind, use your imagination, always consider alternatives, and dare to believe that you can make possible what others think is impossible.'
  };

  return (
    <div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">
            <span className="text-sm">Background Color</span>
          </label>
          <input
            type="color"
            value={formData.background}
            onChange={(e) => onChange({ ...formData, background: e.target.value })}
          />
        </div>

        <div>
          <label className="label">
            <span className="text-sm">Logo Image</span>
          </label>
          {busy ? <SpinningLoading isLoading={uploadCreativeAssetMutation.isLoading} /> : <div>{formData?.logoImage ? <div><img src={formData.logoImage} style={{ width: 150 }} /><button className="btn btn-error text-white mt-3" onClick={() => onChange({ ...formData, logoImage: null })}>Remove</button></div> : <input type="file" className="file-input w-full max-w-xs" onChange={(e) => uploadCreativeAssetMutation.mutate(e.target.files)} />}</div>}
        </div>

      </div>


    </div>
  );
}

const SimpleTextLogo = {
  name: 'SimpleTextLogo',
  title: 'Simple Text and Logo',
  creatomate_template_id: '114d9542-c437-4bb3-91bd-d4543eeecea8',
  description: 'This creative contains a main body of text and logo on the right side of the page',
  render: SimpleTextLogoRender,
  form: SimpleTextLogoForm
} as CreativeTemplate;

export default SimpleTextLogo;
