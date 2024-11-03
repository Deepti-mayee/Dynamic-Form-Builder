// src/components/FormField.js
import React from 'react';

const FormField = ({ field, value, onChange }) => {
  return (
    <div>
      <label>{field.label} <span style={{ color: "red" }}>{field.required ? "*" : null}</span></label>
      {field.type === 'text' && (
        <input
          type="text"
          required={field.required}
          value={value}
          placeholder={`Enter ${field.label}`}
          onChange={(e) => onChange(field.id, e.target.value)}
        />
      )}
      {field.type === 'email' && (
        <input
          type="email"
          required={field.required}
          value={value}
          placeholder={`Enter ${field.label}`}
          onChange={(e) => onChange(field.id, e.target.value)}
        />
      )}
      {field.type === 'password' && (
        <input
          type="password"
          required={field.required}
          value={value}
          placeholder={`Enter ${field.label}`}
          onChange={(e) => onChange(field.id, e.target.value)}
        />
      )}
      {field.type === 'number' && (
        <input
          type="number"
          required={field.required}
          value={value}
          placeholder={`Enter ${field.label}`}
          onChange={(e) => onChange(field.id, e.target.value)}
        />
      )}
      {field.type === 'dropdown' && (
        <select
          required={field.required}
          value={value}
          placeholder={`Enter ${field.label}`}
          onChange={(e) => onChange(field.id, e.target.value)}
        >
          {field.options.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
      {field.type === 'checkbox' && (
        <input
          type="checkbox"
          checked={value}
          placeholder={`Enter ${field.label}`}
          onChange={(e) => onChange(field.id, e.target.checked)}
        />
      )}
    </div>
  );
};

export default FormField;