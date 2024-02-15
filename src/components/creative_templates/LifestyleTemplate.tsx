import React from 'react';
import CreativeTemplate from './CreativeTemplate';
import { useParams } from 'react-router-dom';
import FileUploader, { ProjectBucketUpload } from '../lib/FileUpload';
import { authStore } from '../../stores/stores';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LifestyleTemplateRender: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="flex items-center" style={{ backgroundColor: data.background, aspectRatio: '4/5', position: 'relative', height: 400, width: '100%' }}>
      <img src={data.logoImage} style={{ position: 'absolute', top: '4%', right: '5%', width: 120 }} />
      <img src="/src/assets/creative_template_assets/smiley_face.png" style={{ position: 'absolute', bottom: 0, right: '20%', width: 180 }} />
      <img src="/src/assets/creative_template_assets/balloon.png" style={{ position: 'absolute', bottom: '42%', right: '12%', width: 100 }} />
      <div className="font-black ml-4 mb-10" style={{ width: '50%', textWrap: 'wrap', textOverflow: 'ellipsis' }}>
        <p style={{ maxWidth: '100%', fontSize: 'clamp(20px, 30px, 2.3vw)', color: '#00a86d', lineHeight: '35px' }}>
          { data.mainCopy }
        </p>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LifestyleTemplateForm: React.FC<{ data: any, onChange: (newData: any) => void }> = ({ data, onChange }) => {
  const { projectId } = useParams() as { projectId: string }

  const formData = data || {
    background: '#e8faec',
    logoImage: null,
    mainCopy: 'Balance your screentime.'
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
          <FileUploader uploader={new ProjectBucketUpload({ projectId: projectId, folder: 'project_facebook_creative_template', filePath: authStore.filesBaseUrl + '/files/project-assets', multerFieldName: 'project_assets' })} onUpload={(url) => onChange({ ...formData, logoImage: url })} />
          {<div>{formData?.logoImage &&
            <div>
              <img src={formData.logoImage} style={{ width: 150 }} />
              <button className="btn btn-error text-white mt-3" onClick={() => onChange({ ...formData, logoImage: null })}>Remove</button>
            </div>}</div>}
        </div>

      </div>


    </div>
  );
}

const LifestyleTemplate = {
  name: 'LifestyleTemplate',
  title: 'Lifestyle',
  creatomate_template_id: '4cdbe458-121e-4fb6-bfd7-c41aaac67c89',
  description: 'More traditional ad style that features your product in a context consumers can imagine themselves in.',
  render: LifestyleTemplateRender,
  form: LifestyleTemplateForm
} as CreativeTemplate;

export default LifestyleTemplate;
