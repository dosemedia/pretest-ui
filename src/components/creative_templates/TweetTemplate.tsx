import React from 'react';
import CreativeTemplate from './CreativeTemplate';
import { useParams } from 'react-router-dom';
import FileUploader, { ProjectBucketUpload } from '../lib/FileUpload';
import { authStore } from '../../stores/stores';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TweetTemplateRender: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="flex items-center justify-center" style={{ backgroundColor: data.background, width: '100%', height: 400 }}>
      <div className="bg-white rounded-xl w-10/12 p-8">
        <div className="flex items-center gap-x-6">
          <img src={data.avatarImage} style={{ borderRadius: '100%', width: 60 }} />
          <div>
            <div className="flex items-center">
              <span className="font-bold text-md">Elisabeth Parker</span><span className="mdi mdi-check-decagram text-blue-500 ml-2" />
            </div>
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
const TweetTemplateForm: React.FC<{ data: any, onChange: (newData: any) => void }> = ({ data, onChange }) => {
  const { projectId } = useParams() as { projectId: string }

  const formData = data || {
    background: '#298493',
    avatarImage: null,
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
            <span className="text-sm">Avatar Image</span>
          </label>
          <FileUploader uploader={new ProjectBucketUpload({ projectId: projectId, folder: 'project_facebook_creative_template', filePath: authStore.filesBaseUrl + '/files/project-assets', multerFieldName: 'project_assets' })} onUpload={(url) => onChange({ ...formData, avatarImage: url })} />
          {<div>{formData?.avatarImage &&
            <div>
              <img src={formData.avatarImage} style={{ width: 150 }} />
              <button className="btn btn-error text-white mt-3" onClick={() => onChange({ ...formData, avatarImage: null })}>Remove</button>
            </div>}</div>}
        </div>

      </div>


    </div>
  );
}

const TweetTemplate = {
  name: 'TweetTemplate',
  title: 'Tweet',
  creatomate_template_id: '14274b18-58d0-425b-8c83-da593faac659',
  description: 'This creative contains a tweet style ad template with an avatar image and a background color',
  render: TweetTemplateRender,
  form: TweetTemplateForm
} as CreativeTemplate;

export default TweetTemplate;
