import React from 'react';

interface CreativeTemplate {
  name: string,
  title: string,
  description: string,
  creatomate_template_id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: React.FC<{ data: any, onChange : (newData: any) => void }>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: React.FC,
}

export default CreativeTemplate;
