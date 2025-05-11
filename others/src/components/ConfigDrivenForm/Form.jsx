import React, { useState } from "react";

const Form = () => {
    const [formState, setFormState] = useState({ uname: "", password: "" });
    const [gender, setGender] = useState("");
    const [lang, setLang] = useState("");

    const formHandler = (e) => {
        setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    console.log('lang',lang)

    return (
        <div>
            <input
                placeholder="Username"
                value={formState.uname}
                onChange={formHandler}
                name="uname"
            />
            <input
                placeholder="password"
                value={formState.password}
                onChange={formHandler}
                name="password"
            />
            <div>
                <label>Gender</label>
                <label htmlFor="male">Male</label>
                <input
                    id="male"
                    type="radio"
                    name="gender"
                    value="M"
                    checked={gender === "M"}
                    onChange={(e) => {
                        setGender(e.target.value);
                    }}
                />
                <label htmlFor="female">Female</label>
                <input
                    id="female"
                    type="radio"
                    name="gender"
                    value="F"
                    checked={gender === "F"}
                    onChange={(e) => {
                        setGender(e.target.value);
                    }}
                />
            </div>
            <div>
                <label htmlFor="language">Language</label>
                <select
                    id="language"
                    value={lang}
                    onChange={(e) => {
                        setLang(e.target.value);
                    }}
                >
                    <option value="" disabled>-- Select a language --</option>
                    <option value="EN">English</option>
                    <option value="HN">Hindi</option>
                </select>
            </div>
        </div>
    );
};

export default Form;
