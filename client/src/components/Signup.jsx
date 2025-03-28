import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Validation from './SignupValidation';
import { ToastContainer, toast } from 'react-toastify';
import "./Signup.css";

export default function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault()
        const newValues = { name, email, password };

        const validationErrors = Validation("", newValues);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            toast.error("Please enter valid values")
            return;
        }
        axios.post('http://localhost:8000/api/auth/register', { name, email, password })
            .then(result => {
                console.log(result)
                toast.success('Register Successfully');
                setTimeout(() => navigate("/"), 1000);
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="register-page">
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name"><strong>Name</strong></label>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        autoComplete="off"
                        name="name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setErrors((prev) => ({ ...prev, name: "" }));
                            let error1 = Validation("checkName", { name: e.target.value, email, password });
                            setErrors(error1);
                        }}
                    />
                    {errors?.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input
                        type="text"
                        placeholder="Enter Email"
                        autoComplete="off"
                        name="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors((prev) => ({ ...prev, email: "" }));
                            let error1 = Validation("checkEmail", { name, email: e.target.value, password });
                            setErrors(error1);
                        }}
                    />
                    {errors?.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        autoComplete="off"
                        name="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrors((prev) => ({ ...prev, password: "" }));
                            let error1 = Validation("checkPassword", { name, email, password: e.target.value });
                            setErrors(error1);
                        }}
                    />
                    {errors?.password && <span className="error">{errors.password}</span>}
                </div>

                <button type="submit" className="register-btn">Register</button>
            </form>
            
            <p>Already Have an Account?</p>
            <Link to="/login" className="login-btn">Login</Link>
        </div>
        <ToastContainer />
    </div>
);
};

