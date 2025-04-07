
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchTransactionHistory } from "../../API1"; // Adjust the API call if needed
import "../Styles/Buyer/BuyerTransactionHistory.css";

const BuyerTransactionHistory = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Custom hook to get current window width
  const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return width;
  };

  const width = useWindowWidth();
  const isMobile = width < 480;

  // Fetch transaction history from backend on mount
  useEffect(() => {
    const getTransactions = async () => {
      setLoading(true);
      try {
        const data = await fetchTransactionHistory();
        setTransactions(data);
      } catch (err) {
        setError("Failed to load transaction history.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getTransactions();
  }, []);

  return (
    <div className="container transaction-history">
      {/* Sidebar */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          ×
        </button>
        <h2>Buyer Dashboard</h2>
        <ul>
          <li><Link to="/buyer/view-land">View Available Lands</Link></li>
          <li><Link to="/buyer/purchases">Your Purchases</Link></li>
          <li className="active"><Link to="/buyer/transaction-history">Transaction History</Link></li>
          <li><Link to="/buyer/profile">Profile</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>
          ☰
        </button>
        <h2 className="transaction-header">Transaction History</h2>

        {loading ? (
          <p>Loading transactions...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          isMobile ? (
            // Card layout for mobile devices
            <div className="cards-container">
              {transactions.map((tx) => (
                <div key={tx.id} className="card">
                  <p><strong>Transaction ID:</strong> {tx.id}</p>
                  <p><strong>Date:</strong> {tx.date}</p>
                  <p><strong>Land Location:</strong> {tx.location}</p>
                  <p><strong>Seller:</strong> {tx.seller}</p>
                  <p><strong>Amount (₹):</strong> {tx.amount}</p>
                  {/* New escrow deposit info */}
                  <p><strong>Escrow Deposit (₹):</strong> {tx.escrowAmount || "N/A"}</p>
                  <p><strong>Escrow Status:</strong> {tx.escrowStatus || "Pending"}</p>
                  <p><strong>Status:</strong> {tx.status}</p>
                </div>
              ))}
            </div>
          ) : (
            // Table layout for larger screens
            <div className="transaction-container">
              <table className="transaction-table">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Date</th>
                    <th>Land Location</th>
                    <th>Seller</th>
                    <th>Amount (₹)</th>
                    <th>Escrow Deposit (₹)</th>
                    <th>Escrow Status</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id}>
                      <td>{tx.id}</td>
                      <td>{tx.date}</td>
                      <td>{tx.location}</td>
                      <td>{tx.seller}</td>
                      <td>{tx.amount}</td>
                      <td>{tx.escrowAmount || "N/A"}</td>
                      <td>{tx.escrowStatus || "Pending"}</td>
                      <td>{tx.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BuyerTransactionHistory;
