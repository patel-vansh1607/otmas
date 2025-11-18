import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  }

  return (
    <div className="container auth-card">
      <div className="card">
        <h2>Login</h2>

        <form onSubmit={submit}>
          <div className="form-row">
            <input
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </div>

          <div className="form-row">
            <input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </div>

          <p className="muted small-text">
            ⚠ If your account is pending approval, login will be blocked.
          </p>

          <div className="form-row">
            <button className="btn">
              {loading ? "Checking..." : "Login"}
            </button>
            <button
              type="button"
              className="btn-outline"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
