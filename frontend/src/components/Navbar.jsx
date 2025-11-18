import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(){
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <header className="nav-dark">
      <div className="container nav-inner">
        <div className="brand">
          <Link to="/" className="brand-link">
            <div className="brand-logo">OT</div>
            <div>
              <div className="brand-title">Online Tutorial</div>
              <div className="brand-sub">Management System</div>
            </div>
          </Link>
        </div>

        <nav className="nav-links">
          <Link to="/tutorials">Tutorials</Link>
          <Link to="/student">Student</Link>
          <Link to="/tutor">Tutor</Link>
          <Link to="/admin">Admin</Link>
          {!token ? (
            <>
              <Link to="/login" className="btn-outline">Login</Link>
              <Link to="/register" className="btn">Register</Link>
            </>
          ) : (
            <>
              <span className="nav-user">Hi, {user?.name}</span>
              <button className="btn" onClick={logout}>Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
