// src/components/FormPreview.js
import React, { useState } from 'react';
import FormField from './FormField';
import { validateRequired } from '../utils/validators';

const FormPreview = ({ fields, formTitle }) => {
  const [preview, setPreview] = useState(false);

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
    <>
      {preview ?
        <div className="previewForm">
          <form className='formPreview' onSubmit={handleSubmit}>
            <div>
              <div className="header">
                <img src="/close.svg" alt="" className='closeButton' onClick={() => setPreview(false)} />
              </div>
              <h3 style={{ textAlign: "center", fontSize: "24px" }}>{formTitle || "User Form"}</h3>
              {fields.map((field) => (
                <FormField
                  key={field.id}
                  field={field}
                  value={formValues[field.id]}
                  onChange={handleChange}
                />
              ))}
            </div>
            <button className='submitBtn' type="submit">Submit</button>
          </form>
        </div>
        :
        <div className='formPreview'>
          <div>
            <h3 style={{ textAlign: "center" }}>{formTitle || "User Form"}</h3>
            {fields.length === 0 ?
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <h2 style={{ color: "gray", fontSize: "15px" }}>No fields added yet</h2>
              </div>
              :
              (fields.map((field) => (
                <FormField
                  key={field.id}
                  field={field}
                  value={formValues[field.id]}
                  onChange={handleChange}
                />
              )))
            }
          </div>
          <button className='previewBtn' type="button" onClick={() => setPreview(true)}>Preview</button>
        </div>
      }
    </>
  );
};

export default FormPreview;