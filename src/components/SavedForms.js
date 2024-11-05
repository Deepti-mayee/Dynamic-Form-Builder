import React, { useEffect, useState } from 'react'
import FormField from './FormField';
import toast from 'react-hot-toast';

const getDate = (id) => {
    let day = new Date(id).getDay();
    let month = new Date(id).getMonth() + 1;
    let year = new Date(id).getFullYear();

    return `${day < 10 ? "0" + day : day}/${month}/${year}`;
}

const SavedForms = ({ fields }) => {
    const [forms, setForms] = useState([]);
    const [preview, setPreview] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        let storedForms = JSON.parse(localStorage.getItem("forms"));
        setForms(storedForms);
    }, [fields])

    const deleteForm = (fid) => {
        let newForm = forms?.filter(form => form.id !== fid);
        localStorage.setItem("forms", JSON.stringify(newForm));
        setForms(newForm);
        toast.success("Removed form successfully");
    }

    return (
        <>
            {preview ?
                <div className="previewForm">
                    <div className='formPreview'>
                        <div>
                            <div className="header">
                                <img src="/close.svg" alt="" className='closeButton' onClick={() => setPreview(false)} />
                            </div>
                            <h3 style={{ textAlign: "center", fontSize: "24px" }}>{data?.title || "User Form"}</h3>
                            {data?.fields?.map((field) => (
                                <FormField
                                    key={field.id}
                                    field={field}
                                />
                            ))}
                        </div>
                        <button className='submitBtn' type="button">Submit</button>
                    </div>
                </div>
                :
                <div className='savedForm'>
                    <h2>Saved Forms</h2>
                    {forms?.length === 0 ?
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <h2 style={{ color: "gray", fontSize: "15px" }}>No forms saved yet</h2>
                        </div>
                        :
                        <div className="forms">
                            {forms?.sort((a, b) => a.id - b.id).map((form, id) => (
                                <div className="formData" key={id}>
                                    <div className="header">
                                        <h3>{form?.title}</h3>
                                        <p>{getDate(form?.id)}</p>
                                    </div>
                                    <div className="buttons">
                                        <button className="viewButton" onClick={() => { setPreview(true); setData(form); }}>View</button>
                                        <button className="deleteButton" onClick={() => deleteForm(form?.id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default SavedForms