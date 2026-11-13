
import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
const API_URL = "https://wfxffd7g-5000.inc1.devtunnels.ms/";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
      const users = await response.json();
      console.log(response)

      if (users.length === 0) {
        console.log('Invalid email or password.');
        return;
      }

      const user = users[0];
      localStorage.setItem('user', JSON.stringify(user));
      alert("Login Successful!");
      navigate(user.userType === 'provider' ? '/providerdashboard' : '/consumerdashboard');
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-content">
          <h1>Welcome Back</h1>

          <p className="subtitle">
            Enter your credentials to access your account.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>
        </div>

        <div className="signup-section">
          <span>Don't have an account?</span>
          <a href="/register"> Sign up</a>
        </div>

      </div>
    </div>
  );
}

export default Login;
