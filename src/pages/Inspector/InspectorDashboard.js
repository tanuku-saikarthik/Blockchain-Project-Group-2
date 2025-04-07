import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchInspectorStats } from "../../API1";
import "../Styles/Inspector/InspectorDashboard.css";

const InspectorDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    pendingVerifications: 0,
    validatedTransactions: 0,
    rejectedValidations: 0,
  });

  useEffect(() => {
    async function getStats() {
      try {
        const data = await fetchInspectorStats();
        setStats(data);
      } catch (error) {
        console.error("Error fetching inspector stats", error);
      }
    }
    getStats();
  }, []);

  return (
    <div className="container">
      {/* Sidebar */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          ×
        </button>
        <h2>Inspector Dashboard</h2>
        <ul>
          
          <li>
            <Link to="/inspector/transaction-validation">Validate Transactions</Link>
          </li>
         
          <li>
            <Link to="/inspector/profile">Profile</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>
          ☰
        </button>
        <h2>Welcome to the Inspector Dashboard</h2>
        <p>
          Manage pending verifications, validate transactions, and view land details.
        </p>
        <div className="stats">
          <div className="stats-card">
            <h3>Pending Verifications</h3>
            <p>{stats.pendingVerifications}</p>
          </div>
          <div className="stats-card">
            <h3>Validated Transactions</h3>
            <p>{stats.validatedTransactions}</p>
          </div>
          <div className="stats-card">
            <h3>Rejected Validations</h3>
            <p>{stats.rejectedValidations}</p>
          </div>
        </div>
        {/* Additional dashboard widgets or statistics can be added here */}
      </div>
    </div>
  );
};

export default InspectorDashboard;
