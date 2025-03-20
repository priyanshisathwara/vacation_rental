import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import { ToastContainer, toast } from 'react-toastify';

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
            const response = await axios.post("http://localhost:8000/login", newValues);
            console.log("Response Data:", response.data);

            if (response.data.Login) {
                toast.success("Login Successfully");
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
            <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
                <div className='bg-white p-3 rounded w-25'>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='email'>
                                <strong>Email</strong>
                            </label>
                            <input
                                type='text'
                                placeholder='Enter email'
                                autoComplete='off'
                                name='email'
                                className='form-control rounded-0'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <span className="text-danger">{errors.email}</span>}
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='password'>
                                <strong>Password</strong>
                            </label>
                            <input
                                type='password'
                                placeholder='Enter password'
                                autoComplete='off'
                                name='password'
                                className='form-control rounded-0'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <span className="text-danger">{errors.password}</span>}
                        </div>
                    <Link to="/send_recovery_email" className="d-flex justify-content-end text-success text-decoration-none small">Forgot Password?</Link>
        
                        <button type='submit' className='btn btn-success w-100 rounded-0'>Login</button>
                    </form>
                    <p>Don't Have an Account?</p>
                    <Link to="/register" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Register</Link>
                </div>
            </div>
            <ToastContainer/>
        </>
    );
}

export default Login;
