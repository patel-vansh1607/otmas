import React from "react";

export default function TutorDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user.status !== "approved") {
    return (
      <div className="container">
        <div className="card">
          <h3>Account Pending</h3>
          <p>Your tutor account is awaiting admin approval.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h3>Tutor Dashboard</h3>
        <p>You can now upload tutorials.</p>
      </div>
    </div>
  );
}
