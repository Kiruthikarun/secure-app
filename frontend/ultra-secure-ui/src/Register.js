import React, { useState } from "react";
import { register } from "./api";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async () => {
    const cleanUsername = DOMPurify.sanitize(username);
    const cleanEmail = DOMPurify.sanitize(email);
    const cleanPassword = DOMPurify.sanitize(password);

    setError("");

    if (!cleanUsername || cleanUsername.length < 3) {
      setError("Username must be at least 3 characters long.");
      return;
    }
    if (!validateEmail(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(cleanPassword)) {
      setError("Password must have 6+ characters, including one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }

    setIsLoading(true);
    try {
      await register(cleanUsername, cleanEmail, cleanPassword);
      navigate("/");
    } catch (error) {
      let errorMessage = "Registration failed. Please try again.";

      // ✅ Extract error message from API response
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      }

      setError(errorMessage);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleRegister();
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
          <h2>Create Account</h2>
          <p className="login-subtitle">Join thousands managing their finances with FinTrack</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-with-icon">
              <span className="input-icon">👤</span>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.trim())}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder="Choose a username"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <span className="input-icon">✉️</span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder="your@email.com"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <span className="input-icon">🔑</span>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder="Create a secure password"
              />
            </div>
            <div className="password-hint">
              Must contain 6+ characters, uppercase, lowercase, number, and special character
            </div>
          </div>
          
          <button 
            className="primary-button" 
            onClick={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? 
              <span>
                <span className="loading-spinner"></span>
                Creating Account...
              </span> : 
              "Create Account"
            }
          </button>
          
          <div className="login-footer">
            <p>Already have an account?</p>
            <button className="secondary-button" onClick={() => navigate("/")}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
