import users from "../data/users";

export default function AdminDashboard() {
  const tutors = users.filter((u) => u.role === "tutor");
  const students = users.filter((u) => u.role === "student");

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <div className="card-grid">
        <div className="card">
          <h3>Tutors</h3>
          {tutors.map((t, i) => (
            <p key={i}>{t.name} ({t.email})</p>
          ))}
        </div>
        <div className="card">
          <h3>Students</h3>
          {students.map((s, i) => (
            <p key={i}>{s.name} ({s.email})</p>
          ))}
        </div>
      </div>
    </div>
  );
}
