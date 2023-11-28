import { FieldProps } from '@rjsf/utils';
import React from 'react';

// Based on https://rjsf-team.github.io/react-jsonschema-form/docs/advanced-customization/custom-widgets-fields#custom-field-components

const ColorPickerField: React.FC<FieldProps> = ({ formData, onChange, schema }) => {
  return (
    <div>
      <div>{ schema.title }</div>
      <input type="color" value={formData} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export default ColorPickerField;
