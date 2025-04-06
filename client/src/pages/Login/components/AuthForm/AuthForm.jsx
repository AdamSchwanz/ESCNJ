import { useState } from 'react';
import './AuthForm.css';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const AuthForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        username: '',
        password: '',
        login: ''
    });

    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleChange = (e) => {
        console.log("Field Name: ", e.target.name);
        console.log("Field Value: ", e.target.value);
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const validateData = () => {
        const newErrors = { ...errors };
        let hasErrors = false;
        const { username, password } = formData;
        if (!username) {
            newErrors.username = "Please enter a valid username";
            hasErrors = true;
        } else {
            newErrors.username = "";
        }
        if (!password) {
            newErrors.password = "Please enter a valid password";
            hasErrors = true;
        } else {
            newErrors.password = "";
        }
        setErrors((prevState) => ({ ...prevState, ...newErrors }));
        return !hasErrors;
    };

    const handleSubmit = () => {
        console.log("Form Data: ", formData);
        if (!validateData()) {
            return console.log("Invalid Data, stopping execution...");
        }
        console.log("Valid Data, continuing execution...");
        if (formData.username !== 'adam') {
            console.log("Invalid")
            setErrors((prevState) => ({ ...prevState, login: "Invalid Credentials!" }));
        } else {
            setErrors((prevState) => ({ ...prevState, login: "" }));
        }
        //send data to the backend
    };

    return (
        <div className="auth-form">
            <div className='input-container'>
                <label htmlFor='username' className='label'>Username</label>
                <input
                    type='text'
                    className='input'
                    id='username'
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                />
                {errors.username && <div className='error'>{errors.username}</div>}
            </div>
            <div className='input-container'>
                <label htmlFor='password' className='label'>Password</label>
                <div className='password-wrapper'>
                    <input
                        type={`${showPassword ? 'text' : 'password'}`}
                        className='input'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {!showPassword ?
                        <FaRegEye size={20} onClick={toggleShowPassword} />
                        :
                        <FaRegEyeSlash size={20} onClick={toggleShowPassword} />
                    }
                </div>
                {errors.password && <div className='error'>{errors.password}</div>}
            </div>
            <div className='input-container'>
                <button onClick={handleSubmit}>Login</button>
                {errors.login && <div className='error'>{errors.login}</div>}
            </div>
        </div>
    )
};

export default AuthForm;
