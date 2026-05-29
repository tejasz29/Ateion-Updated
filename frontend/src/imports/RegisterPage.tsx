import React, { useState } from "react";
import "../styles/register.css";

export default function RegisterPage({ closeRegister }: any) {
  // 1. Unified Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "", 
    ageSegment: ""
  });

  // 2. CREATE ACCOUNT HANDLER
  const handleCreateAccount = async (e?: any) => {
    if (e) e.preventDefault();

    
    // Check if passwords match before sending to the backend
    if (formData.password !== formData.confirmPassword) {
        alert("Error: Passwords do not match!");
        return;
    }

    try {
      // Dynamically pull the API URL. Falls back to localhost for local testing
      const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

      // Send the POST request to the backend
      const response = await fetch(`${apiUrl}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,     
          email: formData.email,
          password: formData.password,
          ageSegment: formData.ageSegment  
        }),
      });

      const message = await response.text();

      if (response.ok) {
        alert("Success: " + message);
        if (closeRegister) closeRegister();
      } else {
        alert("Failed: " + message);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Could not connect to the server. Please try again.");
    }
  };

  // 3. SOCIAL LOGIN HANDLERS
  // Dynamically get the backend URL for OAuth redirects
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

  const handleGoogleLogin = () => {
    window.location.href = `${backendUrl}/oauth2/authorization/google`;
  };

  const handleLinkedinLogin = () => {
    window.location.href = `${backendUrl}/oauth2/authorization/linkedin`;
  };

  const handleGithubLogin = () => {
    window.location.href = `${backendUrl}/oauth2/authorization/github`;
  };

  return (

    <div className="register-container">
      <div className="register-card">

        {/* CLOSE BUTTON */}
        <button
          className="close-btn"
          onClick={closeRegister}
        >
          ✕
        </button>

        {/* LEFT SIDE */}
        <div className="left-side">
          <h1>
            Join Ateion
          </h1>
          <p>
            Reimagining education with innovation,
            workshops and modern learning.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="right-side">
          <h2>Create Account</h2>

          {/* --- FIXED: Added id, name, value, and onChange to ALL inputs! --- */}
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />

          <select 
            id="ageSegment"
            name="ageSegment"
            className="w-full p-[17px] my-[10px] rounded-[14px] border border-[#e5e7eb] bg-[#faf7f2] text-[15px] outline-none focus:border-[#ff5a4f] text-[#374151]"
            value={formData.ageSegment || ""}
            onChange={(e) => setFormData({...formData, ageSegment: e.target.value})}
            required
          >
            <option value="" disabled>Select your Age Segment...</option>
            <option value="Segment 1 (Age 8-11)">Segment 1 (Ages 8-11)</option>
            <option value="Segment 2 (Age 12-14)">Segment 2 (Ages 12-14)</option>
            <option value="Segment 3 (Age 15-17)">Segment 3 (Ages 15-17)</option>
            <option value="Segment 4 (Age 18-21)">Segment 4 (Ages 18-21)</option>
            <option value="Segment 5 (Professional)">Segment 5 (Professional / 22+)</option>
          </select>

          {/* CREATE ACCOUNT BUTTON */}
          <button
            className="register-btn"
            onClick={handleCreateAccount}
          >
            Create Account
          </button>

          {/* DIVIDER */}
          <div className="divider">
            OR CONTINUE WITH
          </div>

          {/* GOOGLE */}
          <button
            className="google-btn"
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </button>

          {/* LINKEDIN */}
          <button
            className="linkedin-btn"
            onClick={handleLinkedinLogin}
          >
            Continue with LinkedIn
          </button>

          {/* GITHUB */}
          <button
            className="github-btn"
            onClick={handleGithubLogin}
          >
            Continue with GitHub
          </button>

        </div>
      </div>
    </div>
  );
}