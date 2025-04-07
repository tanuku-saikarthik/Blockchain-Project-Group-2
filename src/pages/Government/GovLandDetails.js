import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchLands } from "../../API1"; // Adjust the import path as needed
import "../Styles/Government/GovLandDetails.css";

const GovLandDetails = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLands = async () => {
      try {
        const data = await fetchLands();
        console.log("Fetched lands:", data);
        setLands(data);
      } catch (err) {
        console.error("Error fetching lands:", err);
        setError("Failed to fetch lands. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getLands();
  }, []);

  return (
    <div className="container">
      {/* Sidebar */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          ×
        </button>
        <h2>Authority Dashboard</h2>
        <ul>
          <li><Link to="/government/approve-transactions">Approve Transactions</Link></li>
          <li><Link to="/government/manage-disputes">Manage Disputes</Link></li>
          <li className="active"><Link to="/government/land-details">Land Details</Link></li>
          <li><Link to="/government/profile">Profile</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>
          ☰
        </button>
        <h2>Land Details</h2>

        {loading && <p>Loading lands...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <div className="lands-grid">
            {lands.map((land) => (
              <div key={land.id} className="land-card">
                <img
                  src={land.image || "/logo192.png"} // Fallback image if none provided
                  alt="Land"
                  className="land-image"
                />
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
                  <p>
                    <strong>Seller:</strong> {land.seller}
                  </p>
                  <p>
                    <strong>Description:</strong> {land.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GovLandDetails;
