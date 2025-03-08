import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [progress, setProgress] = useState(0);


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/register', {name, email, password})
        .then(result =>{ 
            console.log(result)
            setMessage('Register Successfully'); 
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        if (message) {
            setProgress(100); // ✅ Move this inside useEffect
            let interval = setInterval(() => {
                setProgress(prev => {
                    if (prev <= 0) {
                        clearInterval(interval);
                        setTimeout(() => navigate("/"), 100);
                        return 0;
                    }
                    return prev - 1.67;
                });
            }, 50); 
    
            return () => clearInterval(interval);
        }
    }, [message, navigate]);
    

    return (
        <>
        {message && (
                <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'white',
                    color: 'black',
                    padding: '8px 12px',
                    borderRadius: '5px',
                    fontSize: '14px',
                    width: '300px',
                    textAlign: 'center',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                }}>
                    {message}
                    {/* Progress Bar */}
                    <div style={{
                        height: '4px',
                        backgroundColor: 'green',
                        width: `${progress}%`,
                        transition: 'width 0.05s linear',
                        marginTop: '5px',
                        borderRadius: '5px'
                    }} />
                </div>
            )}
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='name'>
                            <strong>Name</strong>
                        </label>
                        <input type='text' placeholder='Enter Name' autoComplete='off' name='name' className='form-control rounded-0'
                        onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='email'>
                            <strong>Email</strong>
                        </label>
                        <input type='text' placeholder='Enter email' autoComplete='off' name='email' className='form-control rounded-0'
                        onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='password'>
                            <strong>Password</strong>
                        </label>
                        <input type='password' placeholder='Enter password' autoComplete='off' name='password' className='form-control rounded-0' 
                        onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Register</button>
                    </form>
                    <p>Already Have an Account?</p>
                    <Link  to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>

               
            </div>
        </div>
        </>
    )
}
