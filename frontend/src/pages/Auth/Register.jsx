import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";

export default function Register() {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
        role,
        studentId: role === "student" ? studentId : null,
      });

      alert(res.data.message);
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }

    setLoading(false);
  }

  return (
    <div className="container auth-card">
      <div className="card">
        <h2>Create Account</h2>

        <form onSubmit={submit}>
          
          <div className="form-row">
            <input
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <input
              placeholder="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
            </select>
          </div>

          {role === "student" && (
            <div className="form-row">
              <input
                placeholder="Student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-row">
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <p className="muted small-text">
            ✔ Your account requires admin approval before you can log in.
          </p>

          <div className="form-row">
            <button className="btn" type="submit">
              {loading ? "Creating..." : "Register"}
            </button>
            <button
              type="button"
              className="btn-outline"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
