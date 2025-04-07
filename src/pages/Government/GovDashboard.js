import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { fetchGovStats } from "../../API1";
import "../Styles/Government/GovDashboard.css";

const GovDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    pendingApprovals: 0,
    approvedTransactions: 0,
    rejectedTransactions: 0,
    totalFundsTransferred: 0,
  });

  useEffect(() => {
    async function getStats() {
      try {
        const data = await fetchGovStats();
        setStats(data);
      } catch (error) {
        console.error("Error fetching government stats", error);
      }
    }
    getStats();
  }, []);

  return (
    <div className='GovDash-page'>
      <div className="container">
        <div className={`sidebar ${menuOpen ? "open" : ""}`}>
          <button className="close-btn" onClick={() => setMenuOpen(false)}>
            ×
          </button>
          <h2>Authority Dashboard</h2>
          <ul>
            <li><Link to="/government/approve-transactions">Approve Transactions</Link></li>
            <li><Link to="/government/manage-disputes">Manage Disputes</Link></li>
            <li><Link to="/government/land-details">Land Details</Link></li>
            <li><Link to="/government/profile">Profile</Link></li>
          </ul>
        </div>

        <div className="main-content">
          <button className="menu-btn" onClick={() => setMenuOpen(true)}>
            ☰
          </button>
          <div className="welcome">
            <h2>Welcome to Authority Dashboard</h2>
            <p>
              Manage transactions, disputes, and land details efficiently.
            </p>
          </div>
          <div className="stats">
            <div className="stats-card">
              <h3>Pending Approvals</h3>
              <p>{stats.pendingApprovals}</p>
            </div>
            <div className="stats-card">
              <h3>Approved Transactions</h3>
              <p>{stats.approvedTransactions}</p>
            </div>
            <div className="stats-card">
              <h3>Rejected Transactions</h3>
              <p>{stats.rejectedTransactions}</p>
            </div>
            <div className="stats-card">
              <h3>Total Funds Transferred (₹)</h3>
              <p>{stats.totalFundsTransferred}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovDashboard;
