import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Validation from './SignupValidation';
import { ToastContainer, toast } from 'react-toastify';

export default function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault()
        const newValues = { name, email, password };

        // Validate inputs before proceeding
        const validationErrors = Validation("", newValues);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            toast.error("Please enter valid values")
            return;
        }
        axios.post('http://localhost:8000/register', { name, email, password })
            .then(result => {
                console.log(result)
                toast.success('Register Successfully');
                setTimeout(() => navigate("/"), 1000);
            })
            .catch(err => console.log(err))
    }


    return (
        <>
            <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
                <div className='bg-white p-3 rounded w-25'>
                    <h2>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='name'>
                                <strong>Name</strong>
                            </label>
                            <input type='text' placeholder='Enter Name' autoComplete='off' name='name' className='form-control rounded-0'
                                onChange={(e) => {
                                    setName(e.target.value)
                                    setErrors(prev => ({ ...prev, name: "" }))
                                    let error1 = Validation("checkName", { name: e.target.value, email, password })
                                    setErrors(error1);
                                }} />
                            {errors?.name && <span className="text-danger">{errors.name}</span>}
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='email'>
                                <strong>Email</strong>
                            </label>
                            <input type='text' placeholder='Enter email' autoComplete='off' name='email' className='form-control rounded-0'
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setErrors(prev => ({ ...prev, email: "" }))
                                    let error1 = Validation("checkEmail", { name, email: e.target.value, password })
                                    setErrors(error1);
                                }} />
                            {errors?.email && <span className="text-danger">{errors.email}</span>}
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='password'>
                                <strong>Password</strong>
                            </label>
                            <input type='password' placeholder='Enter password' autoComplete='off' name='password' className='form-control rounded-0'
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    setErrors(prev => ({ ...prev, password: "" }))
                                    let error1 = Validation("checkPassword", { name, email, password: e.target.value })
                                    setErrors(error1);
                                }} />
                            {errors?.password && <span className="text-danger">{errors.password}</span>}
                        </div>
                        <button type='submit' className='btn btn-success w-100 rounded-0'>Register</button>
                    </form>
                    <p>Already Have an Account?</p>
                    <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>


                </div>
            </div>
            <ToastContainer />
        </>
    )
}
