import React from 'react';

interface LandingPageTemplate {
  name: string,
  title: string,
  description: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: React.FC<{ data: any, onChange : (newData: any) => void, projectId: string }>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: React.FC<{ landingPageId: string, data: any }>,
}

export default LandingPageTemplate;
