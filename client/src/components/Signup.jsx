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
    const [role, setRole] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        const newValues = { name, email, password, role };



        const validationErrors = Validation("", newValues);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            toast.error("Please enter valid values")
            return;
        }
        axios.post('http://localhost:8000/api/auth/register', { name, email, password, role })
            .then(result => {
                console.log(result)
                toast.success('Register Successfully');
                localStorage.setItem("user", JSON.stringify(result.data.user));
                setTimeout(() => navigate("/"), 1000);
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="register-page-container">
            <div className="register-box">
                <h2 className="register-title">Register</h2>
                <div className="register-radio-group">
        <label>
            <input
                type="radio"
                value="user"
                checked={role === "user"}
                onChange={(e) => setRole(e.target.value)}
            />
            User
        </label>
        <label style={{ marginLeft: '20px' }}>
            <input
                type="radio"
                value="owner"
                checked={role === "owner"}
                onChange={(e) => setRole(e.target.value)}
            />
            Owner
        </label>
    </div>
                <form onSubmit={handleSubmit}>
                    <div className="register-form-group">
                        <label><strong>Name</strong></label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            className="register-input"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setErrors((prev) => ({ ...prev, name: "" }));
                            }}
                        />
                        {errors?.name && <span className="register-error">{errors.name}</span>}
                    </div>

                    <div className="register-form-group">
                        <label><strong>Email</strong></label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            autoComplete="off"
                            className="register-input"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors((prev) => ({ ...prev, email: "" }));
                            }}
                        />
                        {errors?.email && <span className="register-error">{errors.email}</span>}
                    </div>

                    <div className="register-form-group">
                        <label><strong>Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            className="register-input"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrors((prev) => ({ ...prev, password: "" }));
                            }}
                        />
                        {errors?.password && <span className="register-error">{errors.password}</span>}
                    </div>

                    <button type="submit" className="register-btn">Register</button>
                </form>

                <p className="register-login-text">Already Have an Account?</p>
                <Link to="/login" className="register-login-btn">Login</Link>
            </div>
            <ToastContainer />
        </div>
    );
};

