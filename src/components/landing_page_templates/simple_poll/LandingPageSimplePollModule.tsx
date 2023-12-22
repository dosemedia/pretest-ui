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
        data={data}
        submitWait={submitWait}
        submitted={submitted}
        submitError=''
        onSubmit={onSubmit} />
      }
    </>
  );
}

const LandingPageSimplePollModule = {
  name: 'LandingPageSimplePoll',
  title: 'Poll',
  description: 'Header image and poll questions.',
  render: LandingPageSimplePollRender,
  form: LandingPageSimplePollForm
} as LandingPageTemplate;

export default LandingPageSimplePollModule;
