import { useState, useEffect } from "react";

export default function TutorDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [tutorials, setTutorials] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tutorTutorials")) || [];
    setTutorials(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("tutorTutorials", JSON.stringify(tutorials));
  }, [tutorials]);

  const addTutorial = () => {
    if (!title || !desc) return alert("Please fill all fields");
    setTutorials([...tutorials, { title, desc }]);
    setTitle("");
    setDesc("");
  };

  return (
    <div className="dashboard">
      <div className="profile">
        <img src={user.avatar} alt="avatar" />
        <div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      </div>

      <h2>Tutor Dashboard</h2>
      <div className="card" style={{ marginBottom: "1rem" }}>
        <h3>Upload Tutorial</h3>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={addTutorial}>Add</button>
      </div>

      <div className="card-grid">
        {tutorials.map((t, i) => (
          <div key={i} className="card">
            <h4>{t.title}</h4>
            <p>{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
