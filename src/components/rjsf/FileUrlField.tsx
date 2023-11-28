import { FieldProps } from '@rjsf/utils';
import React from 'react';

// Based on https://rjsf-team.github.io/react-jsonschema-form/docs/advanced-customization/custom-widgets-fields#custom-field-components

const FileUrlField: React.FC<FieldProps> = ({ formData, onChange }) => {
  const [busy, setBusy] = React.useState(false);

  const handleNewUrl = async () => {
    // TODO - trigger this from a file dropzone
    // Upload file to S3, get URL
    // and then:
    setBusy(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newUrl = 'https://picsum.photos/300?rnd=' + new Date().getTime()
    onChange(newUrl)
    setBusy(false);
  }

  return (
    <div>
      <div>My Url: {formData}</div>
      <button className="btn" disabled={busy} onClick={handleNewUrl}>Click to pretend file drop</button>
    </div>
  );
}

export default FileUrlField;
