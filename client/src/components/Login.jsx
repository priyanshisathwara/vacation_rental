import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import { ToastContainer, toast } from 'react-toastify';
import './Login.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newValues = { email, password };

        const validationErrors = Validation(newValues);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/auth/login", newValues);
            console.log("Response Data:", response.data);

            if (response.data.Login) {
                toast.success("Login Successfully");

                // Extracting user info from response
                const user = {
                    name: response.data.user.name,
                    email: response.data.user.email,
                    role: response.data.user.role
                };

                // Store in localStorage
                localStorage.setItem("user", JSON.stringify(user));

                // Navigate to profile
                setTimeout(() => navigate("/"), 1000);
            } else {
                toast.error("No record found");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error occurred. Try again.");
        }
    };

    return (
        <>
            <div className="login-page">
                <div className="login-container">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email"><strong>Email</strong></label>
                            <input
                                type="text"
                                placeholder="Enter email"
                                autoComplete="off"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password"><strong>Password</strong></label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                autoComplete="off"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <span className="error">{errors.password}</span>}
                        </div>

                        <Link to="/forgot" className="forgot-password">Forgot Password?</Link>

                        <button type="submit" className="login-btn">Login</button>
                    </form>

                    <p>Don't Have an Account?</p>
                    <Link to="/register" className="register-btn-in-login">Register</Link>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default Login;
