import React, { useState } from 'react'
import './Register.css';
import { useNavigate } from 'react-router-dom';

const platforms = ["Amazon", "Netflix", "Jio Hotstar"]
const API_URL = "https://wfxffd7g-5000.inc1.devtunnels.ms/";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    dob: "",
    userType: "",
    platforms: []
  });

  const navigate = useNavigate();
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlatformChange = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((item) => item !== platform)
        : [...prev, platform]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      
    try {
      console.log(formData)
      // Check existing email
      const checkResponse = await fetch(
        `${API_URL}/users?email=${encodeURIComponent(formData.email)}`
      );

      if (!checkResponse.ok) {
        console.log("Unable to check email.")
        throw new Error("Unable to check email.");
      }

      const existingUsers = await checkResponse.json();

      if (existingUsers.length > 0) {
        setError("An account with this email already exists.");
        return;
      }

      // Create new user
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration failed.");
      }

      // Navigate after successful registration
      navigate("/");

    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="page-container">
      <div className="signup-card">
        <div className="signup-header">
          <h1>Create an Account</h1>
          <p>
            Enter your information to register as a consumer or provider.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="john@example"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Address</label>
              <input
                type="text"
                name="address"
                placeholder="123 Main St, City, Country"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Date of birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>User Type</label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
              >
                <option value="">Select a user type</option>
                <option value="consumer">Consumer</option>
                <option value="provider">Provider</option>
              </select>
            </div>
          </div>

          {formData.userType === "provider" && (
            <div className="provider-section">
              <h3>Provider Platforms</h3>
              <p>Select the platforms you provide services for.</p>

              <div className="platform-grid">
                {platforms.map((platform) => (
                  <label className="platform-card" key={platform}>
                    <input
                      type="checkbox"
                      checked={selectedPlatforms.includes(platform)}
                      onChange={() => handlePlatformChange(platform)}
                    />
                    <span>{platform}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <button type="submit" className="submit-button">
            Create Account
          </button>

          <p className="login-text">
            Already have an account? <a href="/">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register

