import tutorials from "../data/tutorials";

export default function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="dashboard">
      <h2>Welcome, {user.name}</h2>
      <h3>Available Tutorials</h3>
      <div className="card-grid">
        {tutorials.map((tut, idx) => (
          <div key={idx} className="card">
            <h4>{tut.title}</h4>
            <p>{tut.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
