// src/pages/Login.js
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import "../styles/Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      const token = res.data.token || res.data.access_token;
      localStorage.setItem("token", token);
      if (res.data.user) {
        setAuthUser(res.data.user);
      }
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2 className="auth-title">Welcome Back 👋</h2>
        <p className="auth-subtitle">Login to access your dashboard</p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn-primary">Login</button>

        <p className="auth-footer">
          Don’t have an account?{" "}
          <Link to="/register" className="auth-link">Register</Link>
        </p>
      </form>
    </div>
  );
}
