import React, { useState } from 'react';
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
  const [submitWait, setSubmitWait] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  async function onSubmit(selections: {[key: string]: Array<string>}) {  
    // Don't track events in page editor
    if (location.pathname.startsWith('/project')) {
      return
    }
    setSubmitWait(true)
    await analyticsStore.trackEvent(landingPageId, 'poll_submit', null, selections, location)
    setSubmitWait(false)
    setSubmitted(true)
  }

  return (
    <>
      { data && 
        <LandingPageSimplePoll 
        headerImageUrl={data.headerImageUrl}
        pageBackgroundColor={data.pageBackgroundColor}
        textColor={data.textColor}
        questions={data.questions}
        submitButtonText={data.submitButtonText}
        submitButtonBackgroundColor={data.submitButtonBackgroundColor}
        submitButtonTextColor={data.submitButtonTextColor}
        submitWait={submitWait}
        submitted={submitted}
        submitError=''
        submittedText={data.submittedText}
        onSubmit={onSubmit} />
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
