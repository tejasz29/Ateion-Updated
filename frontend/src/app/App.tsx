import { BrowserRouter, Routes, Route } from "react-router";
import { useState } from "react";

import Homepage from "../imports/Homepage";
import GCOPage from "../imports/GCOPage";
import ContactPage from "../imports/ContactPage";
import ResourcesPage from "../imports/ResourcesPage";

import RegisterPage from "../imports/RegisterPage";
import LoginPage from "../imports/LoginPage";

export default function App() {

  const [showRegister, setShowRegister] = useState(false);

  const [showLogin, setShowLogin] = useState(false);

  return (

    <BrowserRouter>

      <Routes>

        {/* Homepage */}
        <Route
          path="/"
          element={
            <>

              {/* TOP RIGHT BUTTONS */}
              <div
                style={{
                  position: "fixed",
                  top: "20px",
                  right: "20px",
                  zIndex: 999,
                  display: "flex",
                  gap: "12px",
                }}
              >

                {/* SIGN IN */}
                <button
                  onClick={() => setShowLogin(true)}
                  style={{
                    padding: "12px 22px",
                    borderRadius: "12px",
                    border: "none",
                    background: "white",
                    color: "black",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Sign In
                </button>

                {/* SIGN UP */}
                <button
                  onClick={() => setShowRegister(true)}
                  style={{
                    padding: "12px 22px",
                    borderRadius: "12px",
                    border: "none",
                    background: "#ff5a4f",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Sign Up
                </button>

              </div>

              <Homepage />

              {/* REGISTER POPUP */}
              {
                showRegister && (
                  <RegisterPage
                    closeRegister={() =>
                      setShowRegister(false)
                    }
                  />
                )
              }

              {/* LOGIN POPUP */}
              {
                showLogin && (
                  <LoginPage
                    closeLogin={() =>
                      setShowLogin(false)
                    }
                  />
                )
              }

            </>
          }
        />

        {/* Other Pages */}
        <Route
          path="/gco"
          element={<GCOPage />}
        />

        <Route
          path="/contact"
          element={<ContactPage />}
        />

        {/* RESOURCES PAGE */}
        <Route
          path="/resources"
          element={<ResourcesPage />}
        />

      </Routes>

    </BrowserRouter>

  );
}