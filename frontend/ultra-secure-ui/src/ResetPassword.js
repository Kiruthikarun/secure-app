import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const { uidb64, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/auth/reset-password/${uidb64}/${token}/`, { new_password: newPassword });
      setMessage(response.data.message);
      alert("Password Reset Successful! Please login.");
      navigate("/");
    } catch (error) {
      setMessage("Failed to reset password!");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input 
        type="password" 
        placeholder="Enter new password" 
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleReset}>Reset Password</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;
