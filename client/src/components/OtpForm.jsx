import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";


const OtpFrom = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const { email } = useParams();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // Only last digit
    setOtp(newOtp);

    if (index < 3 && value) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerify = () => {
    const enteredOTP = otp.join("");
    if (enteredOTP.length < 4) {
      toast.error("Please enter 4 digit")
      return;
    }

    axios.post('http://localhost:8000/api/auth/verify-otp', { enteredOTP, email })
      .then((res => {
        console.log("respaonse :", res.data)
        if (res?.data?.error) {
          toast.error(res?.data?.error);
        }
        if (res?.data?.message) {
          toast.success(res?.data?.message);
        }
      }))
      .catch((error) => {
        toast.error("Verification failed. Please try again.");
      });

  };

  const handleResendOTP = () => {
    setOtp(["", "", "", ""]);
    setTimer(60);
    setIsResendDisabled(true);

    axios
      .post("http://localhost:8000/api/auth/resend-otp", { email })
      .then((res) => {
        if (res?.data?.error) {
          toast.error(res?.data?.error);
        } else {
          toast.success(res?.data?.message || "New OTP sent successfully.");
        }
      })
      .catch((error) => {
        toast.error("Failed to resend OTP. Please try again.");
        setIsResendDisabled(false);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg text-center" style={{ width: "350px" }}>
        <h3 className="mb-3">Enter OTP </h3>

        <div className="d-flex justify-content-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              maxLength={1}
              className="form-control text-center otp-box"
              style={{
                width: "50px",
                height: "50px",
                fontSize: "1.5rem",
                borderRadius: "8px",
                border: "2px solid #007bff",
              }}
            />
          ))}
        </div>

        <button onClick={handleVerify} className="btn btn-primary mt-3 w-100">
          Verify OTP
        </button>

        <p className="text-danger mt-2">
          {timer > 0
            ? `Resend OTP in 00:${timer < 10 ? `0${timer}` : timer}`
            : "Time out!"}
        </p>

        <button
          onClick={handleResendOTP}
          className="btn btn-secondary w-100"
          disabled={isResendDisabled}
        >
          Resend OTP
        </button>
        <ToastContainer />

      </div>
    </div>
  );
};

export default OtpFrom;
