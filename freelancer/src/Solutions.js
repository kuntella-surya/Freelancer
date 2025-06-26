import React from 'react';
import './Solutions.css';
import { FaChalkboardTeacher, FaTools, FaLaptopCode, FaHandshake, FaChartLine, FaRobot } from 'react-icons/fa';

export default function Solutions() {
  return (
    <div className="solutions-container">
      <header className="solutions-header">
        <h1>Solutions & Tools for Freelancers 💼</h1>
        <p>Explore powerful resources, tools, and services designed to help you grow, learn, and succeed as a freelancer in the competitive digital world.</p>
      </header>

      <section className="solution-section">
        <div className="solution-icon"><FaChalkboardTeacher /></div>
        <h2>🎓 Learning & Upskilling</h2>
        <p>We offer curated courses, bootcamps, and expert webinars in Web Development, UI/UX, Digital Marketing, Data Science, and more. Whether you're a beginner or a pro, there's always room to level up.</p>
        <ul>
          <li>Access to premium learning content from top platforms like Coursera, Udemy, and freeCodeCamp.</li>
          <li>Weekly live Q&A with industry mentors.</li>
          <li>Certification roadmap to boost your freelance credibility.</li>
        </ul>
      </section>

      <section className="solution-section">
        <div className="solution-icon"><FaLaptopCode /></div>
        <h2>🔧 Freelancing Tools</h2>
        <p>Everything you need to deliver projects efficiently and manage your freelance business like a pro.</p>
        <ul>
          <li>Built-in time tracker and productivity dashboard.</li>
          <li>Invoice & contract templates, NDA generators, and client management tools.</li>
          <li>Portfolio builder to showcase your work attractively.</li>
        </ul>
      </section>

      <section className="solution-section">
        <div className="solution-icon"><FaHandshake /></div>
        <h2>🤝 Community & Mentorship</h2>
        <p>Join a growing network of freelancers. Share experiences, seek guidance, or team up for projects.</p>
        <ul>
          <li>Discussion forums and Slack groups for real-time collaboration.</li>
          <li>One-on-one mentorship sessions every month.</li>
          <li>Hackathons, meetups, and spotlight features for top freelancers.</li>
        </ul>
      </section>

      <section className="solution-section">
        <div className="solution-icon"><FaChartLine /></div>
        <h2>📊 Career Growth & Insights</h2>
        <p>Stay updated with market trends, pricing benchmarks, and job demand forecasts tailored to your domain.</p>
        <ul>
          <li>Real-time job alerts based on your skillset and region.</li>
          <li>Monthly freelancing trend reports.</li>
          <li>Client behavior analysis and bidding strategy tips.</li>
        </ul>
      </section>

      <section className="solution-section">
        <div className="solution-icon"><FaRobot /></div>
        <h2>🤖 AI Productivity Assistants</h2>
        <p>Supercharge your workflow with smart tools designed to assist you every step of the way.</p>
        <ul>
          <li>AI proposal generator based on project requirements.</li>
          <li>Grammar & clarity assistant for client communications.</li>
          <li>Code debugger and prompt-enhanced creative idea generator.</li>
        </ul>
      </section>

      <div className="solutions-footer text-center">
        <h3>Ready to transform your freelance journey?</h3>
        <button className="btn-primary">Explore More Solutions</button>
      </div>
    </div>
  );
}
