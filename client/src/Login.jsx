import React, { useState , useEffect} from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState(null)
    const [progress, setProgress] = useState(0)

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/login", { email, password });
            console.log("Response Data:", response.data);
            
            if (response.data.Login) {
                setMessage("Login Successfully");
                setProgress(100);
            } else {
                setMessage("No record found");
            }
        } catch (err) {
            console.error(err);
            setMessage("Error occurred. Try again.");
        }
    };

    useEffect(() => {
        if (message === "Login Successfully") {
            setProgress(100); // Ensure progress starts correctly

            let interval = setInterval(() => {
                setProgress(prev => {
                    if (prev <= 0) {
                        clearInterval(interval);
                        setTimeout(() => navigate("/"), 100); // ✅ Delayed navigation to prevent state updates in render
                        return 0;
                    }
                    return prev - 1.67; // Decrease progress
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
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
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
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Login</button>
                </form>
                <p>Don't Have an Account?</p>
                <Link to="/register" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Register</Link>


            </div>
        </div>
        </>
    )

}

export default Login;