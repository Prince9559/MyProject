import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/Header.css";

export default function Header() {
  const { user, clearAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  const goHome = () => navigate("/dashboard");

  return (
    <header className="header">
      <div className="header-left" onClick={goHome} style={{ cursor: "pointer" }}>
        <div className="brand">My App</div>
      </div>
      <div className="header-right">
        {user ? (
          <>
            <span className="header-user">Hi, {user.name || user.email}</span>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <span className="header-guest">Guest</span>
        )}
      </div>
    </header>
  );
}
