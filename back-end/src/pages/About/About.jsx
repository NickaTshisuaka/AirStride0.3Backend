import React from "react";
import "./About.css";
import Footer from "../../components/Footer/Footer";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About AirStride</h1>
        <p className="about-tagline">Breathe. Stride. Achieve.</p>

        {/* Our Company */}
        <section className="about-section">
          <div className="about-card">
            <h2>Our Company</h2>
            <p>
              AirStride was founded to revolutionize athletic performance. 
              We combine technology with scientific research to create innovative 
              breathing trainers and performance gear.
            </p>
            <div className="mini-blocks">
              <div className="mini-block">
                <img src="/logo.jpg" alt="Company Journey" />
                <p>Our journey began with a simple breathing trainer designed for runners.</p>
              </div>
              <div className="mini-block">
                <img src="/logo.jpg" alt="Innovation" />
                <p>Innovation drives every product we make, tested by athletes worldwide.</p>
              </div>
              <div className="mini-block">
                <img src="/logo.jpg" alt="Global Reach" />
                <p>AirStride now supports athletes across the globe, helping them reach peak performance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our People */}
        <section className="about-section">
          <div className="about-card">
            <h2>Our People</h2>
            <p>
              Meet the passionate team behind AirStride! Founders, engineers, nutritionists, 
              and fitness coaches make up our incredible team.
            </p>
            <div className="people-grid">
              <div className="person-card">
                <img src="/logo.jpg" alt="John Doe" />
                <h3>John Doe - Founder & CEO</h3>
                <p>John drives AirStride's vision globally.</p>
                <p>Interests: Marathon running, fitness tech.</p>
                <p>Achievements: Launched 3 product lines, awarded Sports Innovation Leader.</p>
              </div>
              <div className="person-card">
                <img src="/logo.jpg" alt="Jane Smith" />
                <h3>Jane Smith - CTO</h3>
                <p>Jane leads product engineering and innovation.</p>
                <p>Interests: Biomechanics, wearable tech.</p>
                <p>Achievements: Patented 2 performance tracking devices.</p>
              </div>
              <div className="person-card">
                <img src="/logo.jpg" alt="Mike Johnson" />
                <h3>Mike Johnson - Lead Investor</h3>
                <p>Mike supports growth and strategy alignment.</p>
                <p>Interests: Venture capital, sports startups.</p>
                <p>Achievements: Funded 10+ sports tech companies.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Products */}
        <section className="about-section">
          <div className="about-card">
            <h2>Our Products</h2>
            <p>
              AirStride products are designed to elevate your training experience:
            </p>
            <div className="product-grid-horizontal">
              <div className="product-card">
                <img src="/logo.jpg" alt="Breathing Trainer" />
                <h3>Breathing Trainer Pro</h3>
                <p>Enhances lung capacity and endurance for runners and athletes.</p>
              </div>
              <div className="product-card">
                <img src="/logo.jpg" alt="Jogging Shoes" />
                <h3>AirStride Jogging Shoes</h3>
                <p>Lightweight, cushioned, and performance-optimized.</p>
              </div>
              <div className="product-card">
                <img src="/logo.jpg" alt="Performance Tracker" />
                <h3>Performance Tracker</h3>
                <p>Tracks heart rate, VO2 max, and stamina with real-time insights.</p>
              </div>
              <div className="product-card">
                <img src="/logo.jpg" alt="Resistance Bands" />
                <h3>Resistance Training Bands</h3>
                <p>Durable bands for strength and flexibility training.</p>
              </div>
              <div className="product-card">
                <img src="/logo.jpg" alt="Smart Water Bottle" />
                <h3>Smart Hydration Bottle</h3>
                <p>Monitors water intake and syncs with the app for tracking.</p>
              </div>
              <div className="product-card">
                <img src="/logo.jpg" alt="Performance Apparel" />
                <h3>Performance Apparel</h3>
                <p>Lightweight, breathable clothing for running and training.</p>
              </div>
            </div>
            <a href="#" className="explore-btn">Explore More</a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
