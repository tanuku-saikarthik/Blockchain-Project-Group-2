
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/Inspector/LandDetails.css";
import { fetchLands } from "../../API1"; // Import the API function

const LandDetails = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lands, setLands] = useState(null); // State to store lands fetched from backend

  // Fetch lands when the component mounts
  useEffect(() => {
    const loadLands = async () => {
      try {
        const data = await fetchLands();
        console.log("Fetched lands:", data); // Log the fetched data
        setLands(data);
      } catch (error) {
        console.error("Error loading lands:", error);
      }
    };

    loadLands();
  }, []);

  // Display a loading indicator while data is being fetched
  if (!lands) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      {/* Sidebar */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          ×
        </button>
        <h2>Inspector Dashboard</h2>
        <ul>
          
          <li><Link to="/inspector/transaction-validation">Validate Transactions</Link></li>
          <li className="active"><Link to="/inspector/land-details">Land Details</Link></li>
          <li><Link to="/inspector/profile">Profile</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>
          ☰
        </button>
        <h2>Land Details</h2>
        
        <div className="lands-grid">
          {lands.map((land) => (
            <div key={land.id} className="land-card">
              <img src={"https://picsum.photos/200/300"} alt="Land" className="land-image" />
              <div className="land-info">
                <p>
                  <strong>Location:</strong> {land.location}
                </p>
                <p>
                  <strong>Size:</strong> {land.size}
                </p>
                <p>
                  <strong>Price:</strong> ₹{land.price}
                </p>
                
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandDetails;
