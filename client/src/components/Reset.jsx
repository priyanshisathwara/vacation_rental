import React, { useState } from "react";
import axios from "axios";

export default function ResetPassword({ email }) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/reset-password", { email, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error resetting password. Try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <div className="mb-3">
          <label>New Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Change Password</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
