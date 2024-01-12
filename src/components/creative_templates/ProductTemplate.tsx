import React, { useEffect } from 'react';
import CreativeTemplate from './CreativeTemplate';
import { useParams } from 'react-router-dom';
import FileUploader, { ProjectBucketUpload } from '../lib/FileUpload';
import { authStore } from '../../stores/stores';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductTemplateRender: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="flex items-center justify-evenly" style={{ backgroundColor: data.background, width: '100%', position: 'relative', height: 400 }}>
      <div style={{ width: '50%', textWrap: 'wrap', textOverflow: 'ellipsis' }}>
        <p className="text-center font-bold" style={{ maxWidth: '100%', color: 'white', fontSize: '2.5rem', lineHeight: '45px' }}>
          {data.mainCopy}
        </p>
      </div>
      {data.productImage ? <img src={data.productImage}  style={{ width: 150 }} /> : <img src="/src/assets/creative_template_assets/shimmer.png" style={{ width: 180 }} />}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductTemplateForm: React.FC<{ data: any, onChange: (newData: any) => void }> = ({ data, onChange }) => {
  const { projectId } = useParams() as { projectId: string }

  const formData = data || {
    background: '#f858ab',
    productImage: null,
    mainCopy: 'New Shimmer Cleaning Paste'
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
            <span className="text-sm">Product Image</span>
          </label>
          <FileUploader uploader={new ProjectBucketUpload({ projectId: projectId, folder: 'project_facebook_creative_template', filePath: authStore.filesBaseUrl + '/files/project-assets', multerFieldName: 'project_assets' })} onUpload={(url) => onChange({ ...formData, productImage: url })} />
          {<div>{formData?.productImage &&
            <div>
              <img src={formData.productImage} style={{ width: 150 }} />
              <button className="btn btn-error text-white mt-3" onClick={() => onChange({ ...formData, productImage: null })}>Remove</button>
            </div>}</div>}
        </div>

      </div>


    </div>
  );
}

const ProductTemplate = {
  name: 'ProductTemplate',
  title: 'Product',
  creatomate_template_id: 'd7c3146c-63cd-4348-b49d-2e496ae11976',
  description: 'This creative contains a lifestyle style ad template with a logo image and a background color',
  render: ProductTemplateRender,
  form: ProductTemplateForm
} as CreativeTemplate;

export default ProductTemplate;
