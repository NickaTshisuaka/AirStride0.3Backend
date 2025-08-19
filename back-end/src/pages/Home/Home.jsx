import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Sidebar from "../../components/Sidebar";  // ✅ corrected path
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Sidebar />  {/* ✅ Reusable Sidebar */}

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-left">
          <h1>AirStride</h1>
          <p>Breathe. Stride. Achieve</p>
        </div>
        <button
          className="cta-button"
          onClick={() => navigate("/products")}
        >
          Get Started =&gt;
        </button>
      </div>
    </div>
  );
};

export default Home;
