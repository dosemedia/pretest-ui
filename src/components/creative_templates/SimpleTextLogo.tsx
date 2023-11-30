import React, { useContext, useState } from 'react';
import CreativeTemplate from './CreativeTemplate';
import axios from 'axios'
import { AuthContext } from '../../stores/stores';
import { useMutation } from '@tanstack/react-query';
import { SpinningLoading } from '../lib/SpinningLoading';
import { useParams } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SimpleTextLogoRender = () => {
  return (
    <div>
      // TODO Creative Render
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
      console.log(form)
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
    backgroundColor: '#298493',
    logoImage: null,
    mainCopy: 'This is some test copy'
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
            placeholder="Enter page title here"
            value={formData.ctaTitle}
            onChange={(e) => onChange({ ...formData, ctaTitle: e.target.value })}
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
  creatomate_template_id: '28a7bbff-d9fa-45e6-a503-b2c4960049e3',
  description: 'This creative contains a main body of text and logo on the right side of the page',
  render: SimpleTextLogoRender,
  form: SimpleTextLogoForm
} as CreativeTemplate;

export default SimpleTextLogo;
