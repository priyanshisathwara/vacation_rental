import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Forgot() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setErrors({ email: "Email is required" });
            return;
        }

        setErrors({});

        axios.post('http://localhost:8000/api/auth/reset-password', {email })
            .then(result => {
                console.log(result)
                toast.success('OTP sended Successfully');
                setTimeout(() => navigate(`/otp-form/${email}`), 1000);
            })
            .catch(err => console.log(err))
        console.log("Submitting email:", email);
    }


    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Send
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};


export default Forgot;
