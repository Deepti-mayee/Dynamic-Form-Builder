// src/DynamicForm.js
import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const DynamicForm = () => {
    const [formFields, setFormFields] = useState([]);

    const initialValues = {
        fields: formFields,
    };

    const validationSchema = Yup.object().shape({
        fields: Yup.array().of(
            Yup.object().shape({
                label: Yup.string().required('Field label is required'),
                type: Yup.string().required('Field type is required'),
                required: Yup.boolean(),
            })
        ),
    });

    const handleSubmit = (values) => {
        console.log(values);
        // Handle API calls here to save form data
    };

    const renderField = (field, index) => {
        switch (field.type) {
            case 'text':
            case 'number':
                return (
                    <Field name={`fields.${index}.value`} placeholder={field.label} type={field.type} />
                );
            case 'checkbox':
                return (
                    <Field name={`fields.${index}.value`} type="checkbox" />
                );
            case 'dropdown':
                return (
                    <Field as="select" name={`fields.${index}.value`}>
                        <option value="">Select an option</option>
                        <option value="Option1">Option 1</option>
                        <option value="Option2">Option 2</option>
                    </Field>
                );
            default:
                return null;
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue }) => (
                <Form>
                    <FieldArray name="fields">
                        {({ insert, remove, push }) => (
                            <div>
                                {values.fields.length > 0 &&
                                    values.fields.map((field, index) => (
                                        <div key={index}>
                                            <Field name={`fields.${index}.label`} placeholder="Label" />
                                            <ErrorMessage name={`fields.${index}.label`} component="div" />
                                            
                                            <Field as="select" 
                                                   name={`fields.${index}.type`} 
                                                   onChange={(e) => {
                                                       // Update field type in form state
                                                       const newType = e.target.value;
                                                       setFieldValue(`fields.${index}.type`, newType);
                                                       // Reset the value field when type changes
                                                       setFieldValue(`fields.${index}.value`, ''); // Optional: reset value field
                                                   }}>
                                                <option value="">Select Field Type</option>
                                                <option value="text">Text</option>
                                                <option value="number">Number</option>
                                                <option value="checkbox">Checkbox</option>
                                                <option value="dropdown">Dropdown</option>
                                            </Field>
                                            <ErrorMessage name={`fields.${index}.type`} component="div" />
                                            
                                            {renderField(field, index)}
                                            <button type="button" onClick={() => remove(index)}>Remove</button>
                                        </div>
                                    ))}
                                <button type="button" onClick={() => push({ label: '', type: '', required: false })}>
                                    Add Field
                                </button>
                            </div>
                        )}
                    </FieldArray>
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    );
};

export default DynamicForm;
