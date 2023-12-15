import React from 'react';
import LandingPageTemplate from '../LandingPageTemplate'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { AnalyticsContext } from "../../../stores/stores"
import LandingPageSimplePollForm from './LandingPageSimplePollForm'
import LandingPageSimplePoll from './LandingPageSimplePoll'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LandingPageSimplePollRender: React.FC<{ landingPageId: string, data: any }> = ({ landingPageId, data }) => {
  const analyticsStore = useContext(AnalyticsContext)
  const location = useLocation()

  async function onSubmit() {  
    // Don't track events in page editor
    if (location.pathname.startsWith('/project')) {
      return
    }
    await analyticsStore.trackEvent(landingPageId, 'button_click', 'cta', null, location)
  }

  return (
    <>
      { data && 
        <LandingPageSimplePoll onSubmit={onSubmit} />
      }
    </>
  );
}

const LandingPageDemo = {
  name: 'LandingPageDemo',
  title: 'Landing Page Demo',
  description: 'This is the description for Landing Page Demo ...',
  render: LandingPageSimplePollRender,
  form: LandingPageSimplePollForm
} as LandingPageTemplate;

export default LandingPageDemo;
