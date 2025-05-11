import React, { Fragment, useState } from "react";

const validateName = (name) => {
    if(!name) return "Name is mandatory";
    if(name.length >50) return "Name length should be less than 50"
    return ""
};

const validatePassword=(password)=>{
    if(!password) return "Password is mandatory";
    if(password.length < 6) return "Password should be more than 6 characters long"
    return ""
}


const config = [
    {
        label: "Name",
        type: "text",
        name: "name",
        validation: validateName,
    },
    {
        label: "Password",
        type: "password",
        name: "password",
        validation: validatePassword,
    },
    {
        label: "Locations",
        type: "checkbox",
        name: "interests",
        options: ["India", "US", "Germany"],
    },
    {
        label: "Gender",
        type: "radio",
        name: "gender",
        options: ["Male", "Female", "Others"],
    },
    {
        label: "Date of Birth",
        type: "date",
        name: "date",
    },
    {
        label: "Years of Experience",
        type: "number",
        name: "experience",
    },
    {
        label: "Language",
        type: "select",
        name: "language",
        options: ["English", "Hindi"],
    },
];

const initialState = (config) => {
    const res = config.reduce((acc, curElem) => {
        if (curElem.type === "checkbox") {
            acc[curElem.name] = [];
        } else {
            acc[curElem.name] = "";
        }
        return acc;
    }, {errors:{}});
    return res;
};

const ConfigDrivenForm = () => {
    const [formState, setFormState] = useState(() => initialState(config));
   
    const changeHandler = (e,checkboxName) => {
        if (e.target.type === "checkbox") {
            console.log(e)
            const prevCheckboxArr = formState[checkboxName];
            setFormState((prev) => ({
                ...prev,
                [checkboxName]: e.target.checked
                    ? [...prevCheckboxArr, e.target.value]
                    : prevCheckboxArr.filter((item) => item !== e.target.value),
            }));
            
        } else {
            setFormState((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        }
        if(config.find(obj=>obj.name === e.target.name)?.validation){
            const validationResult=config.find(obj=>obj.name === e.target.name).validation(e.target.value)
            setFormState(prev=>({...prev,errors:{...prev.errors,[e.target.name] :validationResult }}))
        }
    };
    
     console.log(formState)
    const populateInput = (obj) => {
        const error=formState.errors[obj.name];
        console.log(error)
        switch (obj.type) {
            case "text":
            case "number":
            case "password":
            case "date":
                return (
                    <Fragment key={obj.name}>
                        <label htmlFor={obj.name}>{obj.label}</label>
                        <br />
                        <input
                            type={obj.type}
                            name={obj.name}
                            value={formState[obj.name]}
                            id={obj.name}
                            onChange={changeHandler}
                        />
                        {error && <p style={{color:'red'}}>{error}</p>}
                        <br />
                        <br />
                    </Fragment>
                );
            case "radio":
                return (
                    <Fragment key={obj.name}>
                        <label>{obj.label}</label>
                        <br />
                        {obj.options.map((option) => (
                            <Fragment key={option}>
                                <label htmlFor={option}>{option}</label>
                                <input
                                    type="radio"
                                    name={obj.name}
                                    id={option}
                                    style={{ marginRight: "8px" }}
                                    value={option}
                                    checked={formState[obj.name] === option}
                                    onChange={changeHandler}
                                />
                            </Fragment>
                        ))}
                          {error && <p style={{color:'red'}}>{error}</p>}
                        <br />
                        <br />
                    </Fragment>
                );

            case "select":
                return (
                    <Fragment key={obj.name}>
                        <label htmlFor={obj.name}>{obj.label}</label>
                        <br />
                        <select
                            value={formState[obj.name]}
                            id={obj.name}
                            name={obj.name}
                            onChange={changeHandler}
                        >
                            <option value="" disabled key="disabled">
                                Select {obj.label}
                            </option>
                            {obj.options.map((option) => (
                                <option value={option} key={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <br />
                    </Fragment>
                );

            case "checkbox":
                return (
                    <Fragment key={obj.name}>
                        <label>{obj.label}</label>
                        <br />
                        {obj.options.map((option) => (
                            <Fragment key={option}>
                                <label htmlFor={option}>{option}</label>
                                <input
                                    id={option}
                                    value={option}
                                    checked={formState[obj.name].includes(
                                        option
                                    )}
                                    type="checkbox"
                                    style={{ marginRight: "8px" }}
                                    onChange={(e)=>{changeHandler(e,obj.name)}}
                                />
                            </Fragment>
                        ))}
                          {error && <p style={{color:'red'}}>{error}</p>}
                        <br />
                        <br />
                    </Fragment>
                );

            default:
                return;
        }
    };
    return <div>{config.map((obj) => populateInput(obj))}</div>;
};

export default ConfigDrivenForm;
