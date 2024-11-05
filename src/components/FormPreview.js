// src/components/FormPreview.js
import React, { useState } from 'react';
import FormField from './FormField';
import toast from 'react-hot-toast';
// import { validateRequired } from '../utils/validators';

const FormPreview = ({ fields, formTitle, setFields, setCurrentField, setFormTitle }) => {
  const [preview, setPreview] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);

  // State to manage form field values
  const [formValues, setFormValues] = useState(
    fields?.reduce((values, field) => {
      values[field.id] = field.type === 'checkbox' ? false : '';
      return values;
    }, {})
  );

  // Handle form field value changes
  const handleChange = (id, value) => {
    setFormValues((prevValues) => ({ ...prevValues, [id]: value }));
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDrop = (index) => {
    const updatedFields = [...fields];
    const draggedField = updatedFields.splice(draggedIndex, 1)[0];
    updatedFields.splice(index, 0, draggedField);
    setFields(updatedFields);
    setDraggedIndex(null);
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };


  // Handle form submission with validation
  const handleSubmit = () => {
    let isValid = true;

    // fields.forEach((field) => {
    //   if (field.required && !validateRequired(formValues[field.id])) {
    //     isValid = false;
    //     toast.error(`${field.label} is required`);
    //   }
    // });

    if (isValid) {
      let data = JSON.parse(localStorage.getItem('forms')) || [];
      if (fields.length === 0) {
        toast.error("Fields cannot be empty");
        setPreview(false);
        return;
      }
      const newData = data?.filter(item => item.id !== fields.id);
      data.push({
        fields: [...fields],
        id: Date.now(),
        title: formTitle || "UserForm"
      });
      localStorage.setItem('forms', JSON.stringify(data));
      setFields([]);
      setCurrentField({
        label: '',
        type: 'text',
        required: false,
        options: [],
      });
      setFormTitle("");
      setPreview(false);
      toast.success("Form Saved");
    }
  };

  return (
    <>
      {preview ?
        <div className="previewForm">
          <div className='formPreview'>
            <div>
              <div className="header">
                <img src="/close.svg" alt="" className='closeButton' onClick={() => setPreview(false)} />
              </div>
              <h3 style={{ textAlign: "center", fontSize: "24px" }}>{formTitle || "User Form"}</h3>
              {fields?.map((field) => (
                <FormField
                  key={field.id}
                  field={field}
                  value={formValues[field.id]}
                  onChange={handleChange}
                />
              ))}
            </div>
            <button className='submitBtn' type="button" onClick={handleSubmit}>Save</button>
          </div>
        </div>
        :
        <div className='formPreview'>
          <div>
            <h3 style={{ textAlign: "center" }}>{formTitle || "User Form"}</h3>
            {fields?.length === 0 ?
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <h2 style={{ color: "gray", fontSize: "15px" }}>No fields added yet</h2>
              </div>
              :
              <div className="draggable-field-list">
                {fields?.map((field, index) => (
                  <div
                    key={field.id}
                    className="draggable-field"
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(index)}
                  >
                    <span>{field.label} ({field.type}) {field.required ? "*" : null}</span>
                    <button type="button" onClick={() => removeField(index)} className="remove-btn">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            }
          </div>

          <button className='previewBtn' type="button" onClick={() => setPreview(true)}>
            <img src="/eye.svg" className='previewImage' alt="" />
            Preview
          </button>
        </div>
      }
    </>
  );
};

export default FormPreview;