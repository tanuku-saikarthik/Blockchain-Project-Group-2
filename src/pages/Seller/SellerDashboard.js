
import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { fetchSellerStats } from "../../API";
import "../Styles/Seller/SellerDashboard.css";

const SellerDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    activeListings: 0,
    offersReceived: 0,
    transactionsInProgress: 0,
    completedSales: 0,
    escrowOverview: 0,
  });

  useEffect(() => {
    async function getStats() {
      try {
        const data = await fetchSellerStats();
        setStats(data.sellerStats);
        console.log("Seller Stats:", stats.sellerStats); 
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
        <h2>Seller Dashboard</h2>
        <ul>
          <li><Link to="/seller/add-land">Add a Land</Link></li>
          <li><Link to="/seller/view-land">View Your Lands</Link></li>
          <li><Link to="/seller/offers">Buyer Offers</Link></li>
          <li><Link to="/seller/transaction-history">Transaction History</Link></li>
          <li><Link to="/seller/profile">Profile</Link></li>
        </ul>
      </div>

      <div className="main-content">
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>☰</button>
        <div className="header">
          <h1>Welcome to Seller Dashboard</h1>
        </div>
        <p>Manage your lands, offers, and profile easily.</p>
        
        <div className="stats">
          <div className="stats-card">
            <h3>Active Listings</h3>
            <p>{stats.listings}</p>
          </div>
          <div className="stats-card">
            <h3>Offers Received</h3>
            <p>{stats.offersReceived}</p>
          </div>
         
          <div className="stats-card">
            <h3>Completed Sales</h3>
            <p>{stats.completedSales}</p>
          </div>
       
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default SellerDashboard;
