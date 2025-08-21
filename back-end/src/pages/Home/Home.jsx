// import { useNavigate } from "react-router-dom";
import "./Home.css";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";  
const Home = () => {
  // const navigate = useNavigate();

  return (
    <div className="home-container">
      <Sidebar />  

      <div className="hero-section">
        <div className="hero-left">
          <h1>AirStride</h1>
          <p>Breathe. Stride. Achieve</p>
        </div>
        <Link to="/products">
          <button className="cta-button">View Products =&gt;</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
