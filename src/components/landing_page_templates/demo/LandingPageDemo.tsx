import React from 'react';
import LandingPageTemplate from '../LandingPageTemplate'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { AnalyticsContext } from "../../../stores/stores"
import LandingPageDemoHeader from './LandingPageDemoHeader';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LandingPageDemoRender: React.FC<{ landingPageId: string, data: any }> = ({ landingPageId, data }) => {
  const analyticsStore = useContext(AnalyticsContext)
  const location = useLocation()

  async function onCtaClick() {  
    // Don't track events in page editor
    if (location.pathname.startsWith('/project')) {
      return
    }
    await analyticsStore.trackEvent(landingPageId, 'button_click', 'cta', null, location)
  }

  return (
    <div>
      { data && 
        <LandingPageDemoHeader ctaTitle={data.ctaTitle} ctaSubtitle={data.ctaSubtitle} ctaColor1={data.ctaColor1} ctaColor2={data.ctaColor2} ctaImageUrl={data.ctaImageUrl} onCtaClick={onCtaClick} />
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
