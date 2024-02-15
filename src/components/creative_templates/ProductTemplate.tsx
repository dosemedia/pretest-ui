import React from 'react';
import CreativeTemplate from './CreativeTemplate';
import { useParams } from 'react-router-dom';
import FileUploader, { ProjectBucketUpload } from '../lib/FileUpload';
import { authStore } from '../../stores/stores';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductTemplateRender: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="flex items-center justify-evenly" style={{ backgroundColor: data.background, width: '100%', position: 'relative', aspectRatio: '1', height: 400 }}>
      <img src="/src/assets/creative_template_assets/pattern.png" style={{ objectFit: 'cover', position: 'absolute', width: '100%', height: '100%', zIndex: 1 }} />
      <div style={{ width: '50%', textWrap: 'wrap', textOverflow: 'ellipsis', position: 'relative', zIndex: 2 }}>
        <p className="text-center font-black" style={{ maxWidth: '100%', color: 'black', fontSize: '2.0rem', lineHeight: '40px' }}>
          {data.mainCopy}
        </p>
      </div>
      <div style={{ zIndex: 2 }}>{data.productImage ? <img src={data.productImage} style={{ width: 85 }} /> : <img src="/src/assets/creative_template_assets/package.png" style={{ width: 150 }} />}</div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProductTemplateForm: React.FC<{ data: any, onChange: (newData: any) => void }> = ({ data, onChange }) => {
  const { projectId } = useParams() as { projectId: string }

  const formData = data || {
    background: '#dce9be',
    productImage: null,
    mainCopy: 'Find the perfect on-the-go snack at your local bakery.'
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
  creatomate_template_id: '49285584-cc00-4707-b3d3-4d78bbd53d13',
  description: 'Traditional product-focused ad',
  render: ProductTemplateRender,
  form: ProductTemplateForm
} as CreativeTemplate;

export default ProductTemplate;
