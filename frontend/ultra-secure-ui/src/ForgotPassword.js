import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [identifier, setIdentifier] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    setError("");
    
    if (!identifier) {
      setError("Please enter your username or email.");
      return;
    }
    
    if (!newPassword || !confirmPassword) {
      setError("Please fill in all password fields.");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/password-reset/", {
        identifier,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      setMessage(response.data.message || "Password reset successful!");
      setResetSuccess(true);
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong with the password reset.");
      setResetSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleResetPassword();
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="brand-section">
          <div className="logo">
            <span className="logo-icon">F</span>
          </div>
          <h1 className="company-name">FinTrack</h1>
          <p className="tagline">Simplify. Secure. Succeed.</p>
        </div>
        <div className="features">
          <div className="feature">
            <div className="feature-icon">📊</div>
            <p>Real-time financial analytics</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🔒</div>
            <p>Bank-grade security standards</p>
          </div>
          <div className="feature">
            <div className="feature-icon">📱</div>
            <p>Seamless mobile integration</p>
          </div>
        </div>
      </div>
      <div className="login-right">
        <div className="login-form-container">
          {!resetSuccess ? (
            <>
              <h2>Reset Password</h2>
              <p className="login-subtitle">Secure your account with a new password</p>
              
              {error && <div className="error-message">{error}</div>}
              
              <div className="form-group">
                <label htmlFor="identifier">Username or Email</label>
                <div className="input-with-icon">
                  <span className="input-icon">👤</span>
                  <input
                    id="identifier"
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    placeholder="Enter your username or email"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <div className="input-with-icon">
                  <span className="input-icon">🔑</span>
                  <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    placeholder="Enter new password"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-with-icon">
                  <span className="input-icon">🔑</span>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              
              <button 
                className="primary-button" 
                onClick={handleResetPassword}
                disabled={isLoading}
              >
                {isLoading ? 
                  <span>
                    <span className="loading-spinner"></span>
                    Processing...
                  </span> : 
                  "Reset Password"
                }
              </button>
              
              <div className="login-footer">
                <p>Remember your password?</p>
                <button className="secondary-button" onClick={() => navigate("/")}>
                  Back to Login
                </button>
              </div>
            </>
          ) : (
            <div className="success-message-container">
              <div className="success-icon">✅</div>
              <h2>Password Reset Successful</h2>
              <p className="success-text">{message}</p>
              <button className="primary-button" onClick={() => navigate("/")}>
                Back to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;