import React from "react";

export default function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user.status !== "approved") {
    return (
      <div className="container">
        <div className="card">
          <h3>Account Pending</h3>
          <p>Your student account is awaiting admin approval.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h3>Student Dashboard</h3>
        <p>Your approved student account is now active.</p>
      </div>
    </div>
  );
}
