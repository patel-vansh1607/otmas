import React, {useEffect, useState} from "react";
import API from "../api";
import TutorialCard from "../components/TutorialCard";
import Loader from "../components/Loader";

export default function Tutorials(){
  const [tutorials, setTutorials] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(()=>{ fetchAll(); },[]);
  async function fetchAll(){
    try{
      const res = await API.get("/tutorials");
      setTutorials(res.data || []);
    }catch(err){
      console.error(err);
      alert("Unable to fetch tutorials");
    }finally{ setLoading(false); }
  }

  function handleRate(id){
    const rating = prompt("Rate 1-5");
    if(!rating) return;
    API.post(`/tutorials/${id}/rate`, { rating, comment: "" }).then(()=> alert("Thanks")).catch(e=> alert("Login required or error"));
  }

  const filtered = tutorials.filter(t => t.title.toLowerCase().includes(q.toLowerCase()) || t.subject.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="container">
      <div className="card">
        <div className="form-row">
          <input placeholder="Search by title or subject" value={q} onChange={e=>setQ(e.target.value)} />
          <button className="btn" onClick={()=>{}}>Search</button>
        </div>
      </div>

      {loading ? <Loader /> : (
        filtered.length === 0 ? <div className="card">No tutorials found.</div> :
        <div className="grid">{filtered.map(t => <TutorialCard key={t.id} t={t} onRate={handleRate} />)}</div>
      )}
    </div>
  );
}
