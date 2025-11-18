import React, { useEffect, useState } from "react";
import API from "../api";
import Loader from "../components/Loader";

export default function Admin() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadPending() {
    try {
      const res = await API.get("/admin/pending");
      setPending(res.data);
    } catch (err) {
      alert("Admin access required");
    }
    setLoading(false);
  }

  async function approve(id) {
    try {
      await API.put(`/admin/approve/${id}`);
      alert("User approved");
      loadPending();
    } catch (err) {
      alert("Approval failed");
    }
  }

  useEffect(() => {
    loadPending();
  }, []);

  return (
    <div className="container">
      <h2>Admin Panel</h2>
      <p className="muted">Pending tutor & student approvals</p>

      {loading ? (
        <Loader />
      ) : pending.length === 0 ? (
        <div className="card">No pending accounts.</div>
      ) : (
        pending.map((u) => (
          <div key={u.id} className="card">
            <h3>{u.name}</h3>
            <p>Email: {u.email}</p>
            <p>Role: {u.role}</p>
            {u.role === "student" && <p>Student ID: {u.studentId}</p>}

            <button className="btn" onClick={() => approve(u.id)}>
              Approve
            </button>
          </div>
        ))
      )}
    </div>
  );
}
