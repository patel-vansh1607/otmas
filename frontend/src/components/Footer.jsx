import React from "react";

export default function Footer(){
  return (
    <footer className="site-footer-dark">
      <div className="container footer-inner">
        <div className="col">
          <h4>Online Tutorial</h4>
          <p>Centralized platform for university tutorials and learning materials.</p>
        </div>
        <div className="col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/tutorials">Tutorials</a></li>
            <li><a href="/student">Student Dashboard</a></li>
            <li><a href="/tutor">Tutor Dashboard</a></li>
          </ul>
        </div>
        <div className="col">
          <h4>Contact</h4>
          <p>info@university.edu</p>
          <p>+254 700 000 000</p>
        </div>
      </div>
      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} Online Tutorial Management System</small>
      </div>
    </footer>
  );
}
