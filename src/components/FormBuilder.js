// src/components/FormBuilder.js
import React, { useState } from 'react';
import FormPreview from './FormPreview';
import './FormBuilder.css'; // Import CSS for styling

const FormBuilder = () => {
  const [fields, setFields] = useState([]);
  const [currentField, setCurrentField] = useState({
    label: '',
    type: 'text',
    required: false,
    options: [],
  });
  const [dropdownOption, setDropdownOption] = useState('');

  const addField = () => {
    setFields([...fields, { ...currentField, id: Date.now() }]);
    setCurrentField({ label: '', type: 'text', required: false, options: [] });
  };

  const addDropdownOption = () => {
    setCurrentField((prevField) => ({
      ...prevField,
      options: [...prevField.options, dropdownOption],
    }));
    setDropdownOption('');
  };

  return (
    <div className="form-builder-container">
      <h2>Dynamic Form Builder</h2>
      <div className="field-settings">
        <div className="input-group">
          <label>Label</label>
          <input
            type="text"
            value={currentField.label}
            onChange={(e) => setCurrentField({ ...currentField, label: e.target.value })}
            placeholder="Enter field label"
          />
        </div>

        <div className="input-group">
          <label>Type</label>
          <select
            value={currentField.type}
            onChange={(e) => setCurrentField({ ...currentField, type: e.target.value })}
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="dropdown">Dropdown</option>
            <option value="checkbox">Checkbox</option>
          </select>
        </div>

        {currentField.type === 'dropdown' && (
          <div className="input-group">
            <label>Dropdown Options</label>
            <input
              type="text"
              value={dropdownOption}
              onChange={(e) => setDropdownOption(e.target.value)}
              placeholder="Enter option"
            />
            <button type="button" onClick={addDropdownOption} className="add-option-btn">
              Add Option
            </button>
            <div className="options-list">
              {currentField.options.map((option, index) => (
                <span key={index} className="option-item">
                  {option}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="input-group">
          <label>Required</label>
          <input
            type="checkbox"
            checked={currentField.required}
            onChange={(e) => setCurrentField({ ...currentField, required: e.target.checked })}
          />
        </div>

        <button type="button" onClick={addField} className="add-field-btn">
          Add Field
        </button>
      </div>

      <FormPreview fields={fields} />
    </div>
  );
};

export default FormBuilder;
