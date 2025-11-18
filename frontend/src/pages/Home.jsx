import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">

      {/* HERO SECTION */}
      <section className="hero-dark card">
        <div className="hero-left">
          <h1 className="hero-title">
            Learn Smarter. <span className="gradient-text">Access Tutorials Instantly.</span>
          </h1>
          <p className="hero-sub">
            A centralized academic platform where students access tutorials,
            tutors upload learning materials, and administrators maintain complete control.
          </p>

          <div className="hero-cta">
            <Link to="/tutorials" className="btn">Browse Tutorials</Link>
            <Link to="/register" className="btn-outline">Get Started</Link>
          </div>

          <div className="stats-row">
            <div className="stat-box">
              <h2>5,000+</h2>
              <p>Tutorials Uploaded</p>
            </div>
            <div className="stat-box">
              <h2>1,200+</h2>
              <p>Approved Students</p>
            </div>
            <div className="stat-box">
              <h2>180+</h2>
              <p>Verified Tutors</p>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-card">
            <div className="hero-shadow"></div>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/4072/4072781.png"
              alt="Tutorial Illustration"
              className="hero-img"
            />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="cards-row">
        <div className="card feature-card">
          <h3>🔐 Verified Accounts</h3>
          <p>Only approved tutors and students gain access to secure learning spaces.</p>
        </div>

        <div className="card feature-card">
          <h3>🎓 Quality Tutorials</h3>
          <p>All learning materials undergo admin review before being published.</p>
        </div>

        <div className="card feature-card">
          <h3>⚡ Instant Access</h3>
          <p>Students get fast access to subjects, notes, and exam preparation files.</p>
        </div>
      </section>

      {/* SECTION: WHY CHOOSE US */}
      <section className="card why-card">
        <h2>Why Choose Our Tutorial Management System?</h2>
        <ul className="why-list">
          <li>✔ Secure student & tutor verification system</li>
          <li>✔ Centralized and modern learning environment</li>
          <li>✔ Fast, responsive and professional design</li>
          <li>✔ Rating & review system for quality improvement</li>
          <li>✔ Admin approval for uploads ensures content reliability</li>
        </ul>
      </section>

    </div>
  );
}
