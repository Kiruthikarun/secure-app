import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { login } from "./api";
import Register from "./Register";
import Home from "./Home";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import "./App.css";

function Login() {
  const [identifier, setIdentifier] = useState(""); // Username OR Email
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!identifier || !password) {
      setError("Please enter both username/email and password");
      return;
    }

    setError("");
    setIsLoading(true);
    try {
      const res = await login(identifier, password);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.access);
        localStorage.setItem("username", identifier);
        navigate("/home");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError(error.response?.data?.detail || "Incorrect Credentials");
      console.error(error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
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
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Access your financial dashboard</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="identifier">Username or Email</label>
            <div className="input-with-icon">
              <span className="input-icon">👤</span>
              <input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value.trim())}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
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
              />
            </div>
          </div>
          
          <div className="remember-me">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Remember me
            </label>
            <button className="text-button" onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </button>
          </div>
          
          <button 
            className="primary-button" 
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? 
              <span>
                <span className="loading-spinner"></span>
                Authenticating...
              </span> : 
              "Sign In"
            }
          </button>
          
          <div className="login-footer">
            <p>Don't have an account?</p>
            <button className="secondary-button" onClick={() => navigate("/register")}>
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;