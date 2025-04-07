import { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Buyer/BuyerDashboard.css";

const BuyerDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="container">
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>×</button>
        <h2>Buyer Dashboard</h2>
        <ul>
          <li><Link to="/view-lands">View Available Lands</Link></li>
          <li><Link to="/your-purchases">Your Purchases</Link></li>
          <li><Link to="/buyer-transaction-history">Transaction History</Link></li>
          <li><Link to="/buyer-profile">Profile</Link></li>
        </ul>
      </div>

      <div className="main-content">
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>☰</button>
        <div className="welcome">
        <h2>Welcome to Buyer Dashboard</h2>
        <p>Discover available lands, manage your purchase requests, and track your transaction history easily.</p>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
