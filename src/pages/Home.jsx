import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(null);

  return (
    <>
      {/* HERO */}
      <section className="home">
        <h1>Welcome to EduSmart LMS</h1>
        <p>Empowering students and tutors to connect, learn, and grow smarter.</p>
        <div className="cta-buttons">
          <a href="/login">Get Started</a>
        </div>
      </section>

      {/* FACTS */}
      <section className="facts">
        <h2>Why Choose EduSmart?</h2>
        <div className="facts-grid">
          <div className="fact-card">
            <h3>15K+</h3>
            <p>Active Students</p>
          </div>
          <div className="fact-card">
            <h3>2K+</h3>
            <p>Expert Tutors</p>
          </div>
          <div className="fact-card">
            <h3>30+</h3>
            <p>Courses Offered</p>
          </div>
          <div className="fact-card">
            <h3>98%</h3>
            <p>Satisfaction Rate</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <h2>What Our Learners Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="user" />
            <p>“EduSmart transformed my study routine — easy tutorials and great mentors!”</p>
            <strong>- Sarah J.</strong>
          </div>
          <div className="testimonial-card">
            <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="user" />
            <p>“As a tutor, I can share lessons effortlessly. The dashboard is super intuitive!”</p>
            <strong>- Daniel P.</strong>
          </div>
          <div className="testimonial-card">
            <img src="https://randomuser.me/api/portraits/women/50.jpg" alt="user" />
            <p>“The best LMS platform for interactive learning and growth.”</p>
            <strong>- Anita R.</strong>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact">
        <h2>Contact Us</h2>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea rows="4" placeholder="Your Message" required></textarea>
          <button>Send Message</button>
        </form>
      </section>

      {/* FAQ */}
      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        {[
          { q: "Is EduSmart free to use?", a: "Yes! Students can access tutorials for free. Tutors can upload content easily." },
          { q: "Can I access EduSmart on mobile?", a: "Absolutely! EduSmart is fully responsive and mobile-friendly." },
          { q: "How do I become a tutor?", a: "Simply sign up as a tutor and start uploading your tutorials instantly." }
        ].map((item, i) => (
          <div
            key={i}
            className="faq-item"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <div className="faq-question">{item.q}</div>
            {open === i && <div className="faq-answer">{item.a}</div>}
          </div>
        ))}
      </section>
    </>
  );
}
