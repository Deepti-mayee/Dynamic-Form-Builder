// src/components/FormPreview.js
import React, { useState } from 'react';
import FormField from './FormField';
import { validateRequired } from '../utils/validators';

const FormPreview = ({ fields }) => {
  // State to manage form field values
  const [formValues, setFormValues] = useState(
    fields.reduce((values, field) => {
      values[field.id] = field.type === 'checkbox' ? false : '';
      return values;
    }, {})
  );

  // Handle form field value changes
  const handleChange = (id, value) => {
    setFormValues((prevValues) => ({ ...prevValues, [id]: value }));
  };

  // Handle form submission with validation
  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    fields.forEach((field) => {
      if (field.required && !validateRequired(formValues[field.id])) {
        isValid = false;
        alert(`${field.label} is required`);
      }
    });

    if (isValid) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Form Preview</h3>
      {fields.map((field) => (
        <FormField
          key={field.id}
          field={field}
          value={formValues[field.id]}
          onChange={handleChange}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormPreview;
