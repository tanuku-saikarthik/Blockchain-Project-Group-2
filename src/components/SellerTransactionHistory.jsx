import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SellerTransactionHistory.css";

const TransactionHistory = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
  // Use card layout if viewport is less than 480px
  const isMobile = width < 480;

  const transactions = [
    { id: 1, buyer: "John Doe", seller: "Alice", location: "New York, USA", date: "2025-03-12", amount: "$5000", status: "Completed" },
    { id: 2, buyer: "Jane Smith", seller: "Bob", location: "Los Angeles, USA", date: "2025-03-10", amount: "$8000", status: "Pending" },
    { id: 3, buyer: "Mike Johnson", seller: "Alice", location: "Chicago, USA", date: "2025-03-05", amount: "$6000", status: "Failed" },
  ];

  return (
    <div className="container transaction-history">
      {/* Sidebar */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>×</button>
        <h2>Seller Dashboard</h2>
        <ul>
          <li><Link to="/add-land">Add a Land</Link></li>
          <li><Link to="/view-land">View Your Lands</Link></li>
          <li><Link to="/pending-verifications">Pending Verifications</Link></li>
          <li><Link to="/buyer-offers">Buyer Offers</Link></li>
          <li className="active"><Link to="/transaction-history">Transaction History</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>☰</button>
        <h2 className="transaction-header">Transaction History</h2>

        {isMobile ? (
          // Card layout for small screens
          <div className="cards-container">
            {transactions.map((tx) => (
              <div key={tx.id} className="card">
                <p><strong>Buyer:</strong> {tx.buyer}</p>
                <p><strong>Seller:</strong> {tx.seller}</p>
                <p><strong>Location:</strong> {tx.location}</p>
                <p><strong>Date:</strong> {tx.date}</p>
                <p><strong>Amount:</strong> {tx.amount}</p>
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
                  <th>Buyer</th>
                  <th>Seller</th>
                  <th>Land Location</th>
                  <th>Transaction Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className={tx.status.toLowerCase()}>
                    <td>{tx.buyer}</td>
                    <td>{tx.seller}</td>
                    <td>{tx.location}</td>
                    <td>{tx.date}</td>
                    <td>{tx.amount}</td>
                    <td>{tx.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
