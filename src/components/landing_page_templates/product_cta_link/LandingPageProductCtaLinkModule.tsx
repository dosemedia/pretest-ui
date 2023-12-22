import React from 'react';
import LandingPageTemplate from '../LandingPageTemplate'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { AnalyticsContext } from "../../../stores/stores"
import LandingPageProductCtaLinkForm from './LandingPageProductCtaLinkForm'
import LandingPageProductCtaLink from './LandingPageProductCtaLink'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LandingPageProductCtaLinkRender: React.FC<{ landingPageId: string, data: any }> = ({ landingPageId, data }) => {
  const analyticsStore = useContext(AnalyticsContext)
  const location = useLocation()

  async function onClick() {  
    // Don't track events in page editor
    if (location.pathname.startsWith('/project')) {
      return
    }
    await analyticsStore.trackEvent(landingPageId, 'cta_link_click', null, null, location)
  }

  return (
    <>
      { data && 
        <LandingPageProductCtaLink 
        data={data}
        onClick={onClick} />
      }
    </>
  );
}

const LandingPageProductCtaLinkModule = {
  name: 'LandingPageProductCtaLink',
  title: 'Product CTA Link',
  description: 'Product image, title, header, and CTA link.',
  render: LandingPageProductCtaLinkRender,
  form: LandingPageProductCtaLinkForm
} as LandingPageTemplate;

export default LandingPageProductCtaLinkModule;
