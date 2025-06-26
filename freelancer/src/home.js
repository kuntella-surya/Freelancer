import React from "react";
import "./Home.css";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaTwitter, FaLightbulb, FaShieldAlt, FaHandshake } from "react-icons/fa";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1>Your Freelance Career Starts Here</h1>
          <p>Real-world projects. Trusted clients. Life-changing opportunities.</p>
          <button className="btn-primary">Join Free Now</button>
        </div>
      </section>

      {/* How it Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <FaLightbulb className="step-icon" />
            <h3>1. Post a Project</h3>
            <p>Share your idea and get matched with top freelancers instantly.</p>
          </div>
          <div className="step">
            <FaHandshake className="step-icon" />
            <h3>2. Get Bids & Chat</h3>
            <p>Receive customized proposals and chat before you hire.</p>
          </div>
          <div className="step">
            <FaShieldAlt className="step-icon" />
            <h3>3. Hire & Pay Securely</h3>
            <p>Payments via escrow protect both clients and freelancers.</p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="featured-projects">
        <h2>Featured Projects</h2>
        <div className="project-grid">
          <div className="project-card">
            <h4>🚀 React Website Design</h4>
            <p>Budget: $500 - $1,000 • 7 days • Remote</p>
          </div>
          <div className="project-card">
            <h4>Shopify Store Setup</h4>
            <p>Budget: $300 - $700 • 5 days • E-commerce</p>
          </div>
          <div className="project-card">
            <h4>Blog Content Writing</h4>
            <p>Budget: $100 - $300 • 3 days • Writing</p>
          </div>
        </div>
        <button className="btn-secondary">Explore More Projects</button>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-list">
          <div className="testimonial-item">
            <p>“I hired a designer who transformed my brand. Smooth process and great support!”</p>
            <span>— Priya, Startup Founder</span>
          </div>
          <div className="testimonial-item">
            <p>“As a freelancer, I landed my first big client here. Escrow gave me peace of mind.”</p>
            <span>— Rajesh, Web Developer</span>
          </div>
        </div>
      </section>

      {/* Join Community */}
      <section className="community">
        <h2>Join Our Community</h2>
        <p>Connect, learn, and grow with like-minded professionals in our active forums and webinars.</p>
        <button className="btn-primary">Join the Forum</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-widgets">
          <div>
            <h3>About Freelancer Hub</h3>
            <p>Your trusted platform connecting businesses and freelancers. Secure, fast, reliable.</p>
          </div>
          <div>
            <h3>Contact</h3>
            <p>Email: support@freelancerhub.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Address: Hyderabad, Telangana, India</p>
          </div>
          <div>
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Freelancer Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
