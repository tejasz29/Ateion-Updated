import React, { useState } from "react";
import "../styles/login.css";

export default function LoginPage({ closeLogin }: any) {
  // 1. State to capture what the user types
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 2. SIGN IN HANDLER
  const handleLogin = async (e?: any) => {
    // Stop the page from refreshing when you click the button!
    if (e) e.preventDefault(); 

    try {
      // Dynamically pull the API URL. Falls back to localhost for local testing
      const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

      // Send the login request to the Spring Boot backend
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Grab the JSON user object from our Spring Boot backend
        const userData = await response.json();
        
        // Save it to localStorage so the Playground can read it [1]!
        //localStorage.setItem("user", JSON.stringify(userData));

        alert("Login successful!");
        if (closeLogin) closeLogin();
        
        // Redirect the user straight to the Playground!
        
      } else {
        const errorMsg = await response.text();
        alert("Login Failed: " + errorMsg);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Could not connect to the server. Please try again.");
    }
  };

  // 3. SOCIAL LOGIN HANDLERS
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
    <div className="login-container">
      <div className="login-card">
        
        {/* CLOSE BUTTON */}
        <button className="close-btn" onClick={closeLogin}>
          ✕
        </button>

        {/* LEFT SIDE */}
        <div className="left-side">
          <h1>Welcome Back</h1>
          <p>Log in to continue measuring your true capabilities and exploring your dashboard.</p>
        </div>

        {/* RIGHT SIDE */}
        <div className="right-side">
          <h2>Sign In</h2>

          {/* Wired up Email Input with name/id to prevent warnings */}
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Wired up Password Input with name/id to prevent warnings */}
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          <div className="divider">OR CONTINUE WITH</div>

          <button className="google-btn" onClick={handleGoogleLogin}>
            Continue with Google
          </button>

          <button className="linkedin-btn" onClick={handleLinkedinLogin}>
            Continue with LinkedIn
          </button>

          <button className="github-btn" onClick={handleGithubLogin}>
            Continue with GitHub
          </button>

        </div>
      </div>
    </div>
  );
}