import React, { useState, useEffect } from 'react';

// Mock database in localStorage
const LOCAL_STORAGE_KEY = 'codebuddy-data';

// Initial data in localStorage if none exists
function initStorage() {
  if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
      users: [
        { email: 'admin@codebuddy.com', password: 'admin', role: 'admin' },
        { email: 'tutor@codebuddy.com', password: 'tutor', role: 'tutor' },
        { email: 'student@codebuddy.com', password: 'student', role: 'student' }
      ],
      tutorials: [
        { id: 1, title: 'Intro to Python', description: 'Learn Python basics', tutorEmail: 'tutor@codebuddy.com' },
        { id: 2, title: 'JavaScript Essentials', description: 'Learn JavaScript fundamentals', tutorEmail: 'tutor@codebuddy.com' }
      ]
    }));
  }
}

// Helper to get data from localStorage
function getData() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
}

// Helper to save data to localStorage
function saveData(data) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

// Landing Page Component
function LandingPage({ onNext }) {
  return (
    <div style={styles.container}>
      <div style={{ maxWidth: 500, marginRight: 40 }}>
        <h1>Welcome to CodeBuddy!</h1>
        <p>
          Learn computer programming in a friendly, interactive environment.
          Sign in to gain access to course materials and programming exercises.
          All content is free.
        </p>
        <button style={styles.button} onClick={() => onNext('privacy')}>Sign in</button>
      </div>
      <img
        src="/uploads/code-editor.png" 
        alt="Code Editor"
        style={{ width: 400, borderRadius: 8 }}
      />
    </div>
  );
}

// Privacy Notice Component
function PrivacyNotice({ onAgree }) {
  return (
    <div style={{ padding: 30, maxWidth: 600, margin: 'auto' }}>
      <h2>Privacy Notice</h2>
      <p>
        By continuing, you agree to CodeBuddy's collection and use of your data as described in our Privacy Policy.
      </p>
      <button style={styles.button} onClick={onAgree}>I Agree</button>
    </div>
  );
}

// Login/Register Component
function Auth({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    let data = getData();

    if (isRegister) {
      // Register flow
      if (data.users.find(u => u.email === email)) {
        setError('Email already registered.');
        return;
      }
      const newUser = { email, password, role };
      data.users.push(newUser);
      saveData(data);
      onLogin(newUser);
    } else {
      // Login flow
      const user = data.users.find(u => u.email === email && u.password === password);
      if (!user) {
        setError('Invalid email or password.');
        return;
      }
      onLogin(user);
    }
  };

  return (
    <div style={styles.authBox}>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <input
        style={styles.input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value.toLowerCase())}
      />
      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {isRegister && (
        <select style={styles.input} value={role} onChange={e => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="tutor">Tutor</option>
        </select>
      )}
      <button style={styles.button} onClick={handleSubmit}>{isRegister ? 'Register' : 'Login'}</button>
      <p style={{ marginTop: 10, cursor: 'pointer', color: 'blue' }} onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? 'Have an account? Login' : "Don't have an account? Register"}
      </p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

// Student Portal showing list of tutorials
function StudentPortal({ user, onLogout }) {
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    const data = getData();
    setTutorials(data.tutorials);
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: 700, margin: 'auto' }}>
      <h1>Hello, {user.email} (Student)</h1>
      <button style={styles.button} onClick={onLogout}>Logout</button>
      <h2 style={{ marginTop: 30 }}>Available Free Tutorials</h2>
      {tutorials.length === 0 ? (
        <p>No tutorials available.</p>
      ) : (
        tutorials.map(tut => (
          <div key={tut.id} style={styles.tutorialCard}>
            <h3>{tut.title}</h3>
            <p>{tut.description}</p>
            <p><i>Taught by: {tut.tutorEmail}</i></p>
          </div>
        ))
      )}
    </div>
  );
}

// Tutor Portal with upload form and tutorial list
function TutorPortal({ user, onLogout }) {
  const [tutorials, setTutorials] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const data = getData();
    setTutorials(data.tutorials.filter(t => t.tutorEmail === user.email));
  }, [message]);

  const handleUpload = () => {
    if (!title) {
      setMessage('Title is required.');
      return;
    }
    const data = getData();
    const newTutorial = {
      id: Date.now(),
      title,
      description,
      tutorEmail: user.email
    };
    data.tutorials.push(newTutorial);
    saveData(data);
    setTitle('');
    setDescription('');
    setMessage('Tutorial uploaded!');
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h1>Hello, {user.email} (Tutor)</h1>
      <button style={styles.button} onClick={onLogout}>Logout</button>

      <h2 style={{ marginTop: 30 }}>Upload New Tutorial</h2>
      <input
        style={styles.input}
        placeholder="Tutorial Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        style={{ ...styles.input, height: 80 }}
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button style={styles.button} onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}

      <h2 style={{ marginTop: 40 }}>Your Tutorials</h2>
      {tutorials.length === 0 ? <p>No tutorials uploaded yet.</p> :
        tutorials.map(tut => (
          <div key={tut.id} style={styles.tutorialCard}>
            <h3>{tut.title}</h3>
            <p>{tut.description}</p>
          </div>
        ))
      }
    </div>
  );
}

// Admin Portal (simple user list)
function AdminPortal({ user, onLogout }) {
  const [users, setUsers] = useState([]);
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    const data = getData();
    setUsers(data.users);
    setTutorials(data.tutorials);
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: 700, margin: 'auto' }}>
      <h1>Hello, {user.email} (Admin)</h1>
      <button style={styles.button} onClick={onLogout}>Logout</button>

      <h2 style={{ marginTop: 30 }}>Registered Users</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Email</th>
            <th style={styles.tableHeader}>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.email}>
              <td style={styles.tableCell}>{u.email}</td>
              <td style={styles.tableCell}>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: 30 }}>All Tutorials</h2>
      {tutorials.length === 0 ? <p>No tutorials uploaded.</p> :
        tutorials.map(tut => (
          <div key={tut.id} style={styles.tutorialCard}>
            <h3>{tut.title}</h3>
            <p>{tut.description}</p>
            <p><i>Taught by: {tut.tutorEmail}</i></p>
          </div>
        ))
      }
    </div>
  );
}

export default function App() {
  const [stage, setStage] = useState('landing'); // landing, privacy, auth, portal
  const [user, setUser] = useState(null);

  useEffect(() => {
    initStorage();
  }, []);

  const handleLogin = (u) => {
    setUser(u);
    setStage('portal');
  };

  const handleLogout = () => {
    setUser(null);
    setStage('landing');
  };

  return (
    <>
      {stage === 'landing' && <LandingPage onNext={setStage} />}
      {stage === 'privacy' && <PrivacyNotice onAgree={() => setStage('auth')} />}
      {stage === 'auth' && <Auth onLogin={handleLogin} />}
      {stage === 'portal' && user && (
        user.role === 'student' ? <StudentPortal user={user} onLogout={handleLogout} /> :
        user.role === 'tutor' ? <TutorPortal user={user} onLogout={handleLogout} /> :
        user.role === 'admin' ? <AdminPortal user={user} onLogout={handleLogout} /> :
        <p>Unknown role</p>
      )}
    </>
  );
}

const styles = {
  container: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, fontFamily: 'Arial, sans-serif' },
  button: { backgroundColor: '#004aad', color: 'white', padding: '10px 20px', border: 'none', borderRadius: 5, cursor: 'pointer' },
  authBox: { maxWidth: 400, margin: 'auto', padding: 20, border: '1px solid #ccc', borderRadius: 8, fontFamily: 'Arial, sans-serif' },
  input: { width: '100%', padding: 10, marginTop: 10, marginBottom: 10, fontSize: 16 },
  tutorialCard: { border: '1px solid #ccc', borderRadius: 8, padding: 15, marginTop: 15, backgroundColor: '#f9f9f9' },
  tableHeader: { borderBottom: '2px solid #ccc', padding: 8, textAlign: 'left' },
  tableCell: { borderBottom: '1px solid #eee', padding: 8 }
};
