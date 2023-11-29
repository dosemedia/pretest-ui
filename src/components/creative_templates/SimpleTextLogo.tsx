import React from 'react';
import CreativeTemplate from './CreativeTemplate';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SimpleTextLogoRender = () => {
  return (
    <div>
      //TODO Creative Render
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SimpleTextLogoForm: React.FC<{ data: any, onChange : (newData: any) => void }> = ({ data, onChange }) => {
  const formData = data || {
    version: 1,
    ctaTitle: '',
    ctaSubtitle: '',
    ctaImageUrl: '',
    ctaColor1: '',
    ctaColor2: '',
  };

  return (
    <div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">
            <span className="text-sm">Page Title</span>
          </label>
          <input
            type="text"
            className="input"
            placeholder="Enter page title here"
            value={formData.ctaTitle}
            onChange={(e) => onChange({...formData, ctaTitle: e.target.value})}
          />
        </div>

        <div>
          <label className="label">
            <span className="text-sm">Page Subtitle</span>
          </label>
          <input
            type="text"
            className="input"
            placeholder="Enter page subtitle here"
            value={formData.ctaSubtitle}
            onChange={(e) => onChange({...formData, ctaSubtitle: e.target.value})}
          />
        </div>

        <div>
          <label className="label">
            <span className="text-sm">Header Image Url</span>
          </label>
          <input
            type="text"
            className="input"
            placeholder="Enter header image url here"
            value={formData.ctaImageUrl}
            onChange={(e) => onChange({...formData, ctaImageUrl: e.target.value})}
          />
        </div>

        <div>
          <label className="label">
            <span className="text-sm">Header Gradient Color 1</span>
          </label>
          <input
            type="color"
            className="input"
            placeholder="Enter header image url here"
            value={formData.ctaColor1}
            onChange={(e) => onChange({...formData, ctaColor1: e.target.value})}
          />
        </div>

        <div>
          <label className="label">
            <span className="text-sm">Header Gradient Color 2</span>
          </label>
          <input
            type="color"
            className="input"
            placeholder="Enter header image url here"
            value={formData.ctaColor2}
            onChange={(e) => onChange({...formData, ctaColor2: e.target.value})}
          />
        </div>

        <div>TODO form fields for additional page parameters.</div>

      </div>

    
    </div>
  );
}

const SimpleTextLogo = {
  name: 'SimpleTextLogo',
  title: 'Simple Text and Logo',
  description: 'This creative contains a main body of text and logo on the right side of the page',
  render: SimpleTextLogoRender,
  form: SimpleTextLogoForm
} as CreativeTemplate;

export default SimpleTextLogo;
