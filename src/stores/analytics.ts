import { makeAutoObservable } from 'mobx'
import { Location } from 'react-router-dom'

const hasuraBaseUrl = import.meta.env.VITE_HASURA_BASE_URL || 'http://localhost:8080'

export class Analytics {
  constructor() {
    makeAutoObservable(this)
  }
  async trackEvent(
    landingPageId: string,
    event: string,
    subEvent: string | null = null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any = null,
    location: Location | null = null
  ) : Promise<void> {

    // Parse search to fill in utms
    
    const postData = {
      landing_page_id: landingPageId,
      event,
      sub_event: subEvent,
      payload,
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_term: null,
      utm_content: null
    }
    
    if (location && location.search) {
      // Parse search string
      const utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
      const urlParams = new URLSearchParams(location.search)
      for (const utm of utms) {
        const utmValue = urlParams.get(utm)
        if (utmValue) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (postData as any)[utm] = utmValue
        }
      }
    }

    const submitUrl = `${hasuraBaseUrl}/v1/graphql`
    // Use sendBeacon to send events to maximize delivery rate
    const result = navigator.sendBeacon(submitUrl, JSON.stringify({
      query: `mutation insert_landing_page_events_one($objects: [landing_page_events_insert_input!]!) {
        insert_landing_page_events(objects: $objects) {
          affected_rows
        }
      }`,
      variables: {
        objects: [postData]
      }
    }))
    console.log('~~ trackEvent', postData.event, result)
  }
}
