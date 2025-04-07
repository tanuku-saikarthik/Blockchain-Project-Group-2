import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchBuyerStats } from "../../API";
import "../Styles/Buyer/BuyerDashboard.css";

const BuyerDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    activeOffers: 0,
    totalEscrowFunds: 0,
    completedPurchases: 0,
    pendingTransactions: 0,
  });

 useEffect(() => {
     async function getStats() {
       try {
         const data = await fetchBuyerStats();
         setStats(data.buyerStats);
         console.log("Seller Stats:", stats); 
       } catch (error) {
         console.error("Error fetching seller stats", error);
       }
     }
     getStats();
   }, []);

  return (
    <div className="container">
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          ×
        </button>
        <h2>Buyer Dashboard</h2>
        <ul>
          <li>
            <Link to="/buyer/view-land">View Available Lands</Link>
          </li>
          <li>
            <Link to="/buyer/purchases">Your Purchases</Link>
          </li>
         
          <li>
            <Link to="/buyer/profile">Profile</Link>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>
          ☰
        </button>
        <div className="welcome">
          <h2>Welcome to Buyer Dashboard</h2>
          <p>
            Discover available lands, manage your purchase requests, and track
            your transaction history easily.
          </p>
        </div>
        <div className="stats">
          <div className="stats-card">
            <h3>Active Offers</h3>
            <p>{stats.offers}</p>
          </div>
      
          <div className="stats-card">
            <h3>Completed Purchases</h3>
            <p>{stats.purchases}</p>
          </div>
          <div className="stats-card">
            <h3>Pending Transactions</h3>
            <p>{stats.pendingTransactions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
