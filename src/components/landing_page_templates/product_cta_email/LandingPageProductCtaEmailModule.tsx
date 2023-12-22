import React, { useState } from 'react';
import LandingPageTemplate from '../LandingPageTemplate'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { AnalyticsContext } from "../../../stores/stores"
import LandingPageProductCtaEmailForm from './LandingPageProductCtaEmailForm'
import LandingPageProductCtaEmail from './LandingPageProductCtaEmail'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LandingPageProductCtaEmailRender: React.FC<{ landingPageId: string, data: any }> = ({ landingPageId, data }) => {
  const analyticsStore = useContext(AnalyticsContext)
  const location = useLocation()
  const [submitWait, setSubmitWait] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function onSubmit(email: string) {  
    // Don't track events in page editor
    if (location.pathname.startsWith('/project')) {
      return
    }
    setSubmitWait(true)
    await analyticsStore.trackEvent(landingPageId, 'cta_email_submit', null, email, location)
    setSubmitWait(false)
    setSubmitted(true)
  }

  return (
    <>
      { data && 
        <LandingPageProductCtaEmail 
        data={data}
        submitWait={submitWait}
        submitted={submitted}
        submitError=''
        onSubmit={onSubmit} />
      }
    </>
  );
}

const LandingPageProductCtaEmailModule = {
  name: 'LandingPageProductCtaEmail',
  title: 'Product CTA Email',
  description: 'Product image, title, header, and email signup form.',
  render: LandingPageProductCtaEmailRender,
  form: LandingPageProductCtaEmailForm
} as LandingPageTemplate;

export default LandingPageProductCtaEmailModule;
