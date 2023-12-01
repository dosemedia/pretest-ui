import React from 'react';
import LandingPageTemplate from './LandingPageTemplate';
import {Helmet} from "react-helmet"
import { useLocation } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LandingPageDemoRender: React.FC<{ data: any }> = ({ data }) => {
  const location = useLocation()

  return (
    <div>
      <Helmet>
        {/* Don't modify page title in landing page editor, only on actual landing page: */}
        { !location.pathname.includes('project') &&
          <title>{ data.ctaTitle }</title>
        }
      </Helmet>
      { data && 
        <div className="grid grid-cols-2 gap-4" style={{
          backgroundImage: 'linear-gradient(to right, ' + data.ctaColor1 + ' , ' + data.ctaColor2 + ')'
        }}>
          <div>
            <div className="text-lg">{ data.ctaTitle }</div>
            <div>{ data.ctaSubtitle }</div>
          </div>
          <div>
            <img src={data.ctaImageUrl} alt="CTA" className='w-full' />
          </div>
        </div>
      }

      <div>TODO - poll options...</div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LandingPageDemoForm: React.FC<{ data: any, onChange : (newData: any) => void }> = ({ data, onChange }) => {
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

const LandingPageDemo = {
  name: 'LandingPageDemo',
  title: 'Landing Page Demo',
  description: 'This is the description for Landing Page Demo ...',
  render: LandingPageDemoRender,
  form: LandingPageDemoForm
} as LandingPageTemplate;

export default LandingPageDemo;
