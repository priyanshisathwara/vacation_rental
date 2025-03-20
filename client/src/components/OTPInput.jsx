import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function OTPVerification() {
  const [email, setEmail] = useState(""); // Set default or pass as prop
  const [otp, setOtp] = useState(0); // Set default or pass as prop
  const [page, setPage] = useState("otp");
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [disable, setDisable] = useState(true);

  function resendOTP() {
    if (disable) return;
    axios
      .post("http://localhost:8000/send_recovery_email", {
        OTP: otp,
        recipient_email: email,
      })
      .then(() => setDisable(true))
      .then(() => alert("A new OTP has successfully been sent to your email."))
      .then(() => setTimer(60))
      .catch(console.log);
  }

  function verifyOTP() {
    if (parseInt(OTPinput.join("")) === otp) {
      setPage("reset");
      return;
    }
    alert("The code you have entered is not correct, try again or re-send the link");
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        if (lastTimerCount <= 1) {
          clearInterval(interval);
          setDisable(false);
        }
        return lastTimerCount > 0 ? lastTimerCount - 1 : 0;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="bg-white shadow-lg rounded-3 p-5 text-center" style={{ maxWidth: "450px", width: "100%" }}>
        <h3 className="fw-bold">Email Verification</h3>
        <p className="text-muted">We have sent a code to your email <strong>{email}</strong></p>

        <form>
          <div className="row justify-content-center my-4">
            {[0, 1, 2, 3].map((index) => (
              <div className="col-3" key={index}>
                <input
                  maxLength="1"
                  className="form-control text-center fs-4 fw-bold border-success"
                  type="text"
                  onChange={(e) => {
                    let newOtpInput = [...OTPinput];
                    newOtpInput[index] = e.target.value;
                    setOTPinput(newOtpInput);
                  }}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={verifyOTP}
            className="btn btn-success w-100 py-2 fw-bold"
          >
            Verify Account
          </button>

          <div className="mt-3">
            <p className="mb-1">Didn't receive code?</p>
            <button
              type="button"
              className="btn btn-link p-0 fw-bold"
              style={{
                color: disable ? "gray" : "blue",
                cursor: disable ? "not-allowed" : "pointer",
                textDecoration: disable ? "none" : "underline",
              }}
              onClick={resendOTP}
              disabled={disable}
            >
              {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
