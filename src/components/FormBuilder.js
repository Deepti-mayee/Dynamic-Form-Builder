// src/components/FormBuilder.js
import React, { useState } from 'react';
import FormPreview from './FormPreview';
import './FormBuilder.css';
import SavedForms from './SavedForms';
import toast from 'react-hot-toast';

const FormBuilder = () => {
  const [formTitle, setFormTitle] = useState('');
  const [fields, setFields] = useState([]);
  const [currentField, setCurrentField] = useState({
    label: '',
    type: 'text',
    required: false,
    options: [],
  });
  const [dropdownOption, setDropdownOption] = useState('');

  const addField = () => {
    if (!currentField.label) {
      toast.error("Label is Required");
      return;
    }
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
      <div className="builderForm">
        <h2>Dynamic Form Builder</h2>
        <div className="field-settings">
          <div className="input-group">
            <label>Form Title</label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="Enter form title"
            />
          </div>
          <hr />
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
              <option value="email">Email</option>
              <option value="password">Password</option>
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
      </div>

      <FormPreview fields={fields} formTitle={formTitle} setFields={setFields} setCurrentField={setCurrentField} setFormTitle={setFormTitle} />

      <SavedForms fields={fields} />
    </div>
  );
};

export default FormBuilder;