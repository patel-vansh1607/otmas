import React from "react";

export default function TutorialCard({t, onRate}){
  return (
    <div className="card dark-card">
      <h4>{t.title}</h4>
      <p className="muted">{t.subject} • {t.tutorName}</p>
      <p className="desc">{t.description}</p>
      <div className="card-row">
        {t.file ? <a className="link" href={`http://localhost:5000${t.file}`} target="_blank" rel="noreferrer">Open File</a> : <span className="muted">No file</span>}
        <div>
          <button className="btn" onClick={()=>onRate(t.id)}>Rate</button>
        </div>
      </div>
    </div>
  );
}
