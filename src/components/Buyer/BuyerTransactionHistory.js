import { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Buyer/BuyerTransactionHistory.css";

const BuyerTransactionHistory = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Dummy data for transactions
  const transactions = [
    {
      id: "TX1001",
      date: "2025-03-01",
      location: "Bangalore",
      seller: "Seller A",
      price: "5000000",
      status: "Completed",
      receipt: "/receipt1.pdf",
    },
    {
      id: "TX1002",
      date: "2025-03-05",
      location: "Mysore",
      seller: "Seller B",
      price: "7500000",
      status: "Pending",
      receipt: "/receipt2.pdf",
    },
  ];

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          ×
        </button>
        <h2>Buyer Dashboard</h2>
        <ul>
          <li>
            <Link to="/view-lands">View Available Lands</Link>
          </li>
          <li>
            <Link to="/your-purchases">Your Purchases</Link>
          </li>
          <li className="active">
            <Link to="/transaction-history">Transaction History</Link>
          </li>
          <li>
            <Link to="/buyer-profile">Profile</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>
          ☰
        </button>
        <h2 className="transaction-header">Transaction History</h2>

        {/* Transaction Table Container for larger screens */}
        <div className="transaction-container">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Land Location</th>
                <th>Seller Name</th>
                <th>Price (₹)</th>
                <th>Status</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  onClick={() => handleTransactionClick(transaction)}
                >
                  <td>{transaction.id}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.location}</td>
                  <td>{transaction.seller}</td>
                  <td>{transaction.price}</td>
                  <td className={transaction.status.toLowerCase()}>
                    {transaction.status}
                  </td>
                  <td>
                    <a
                      href={transaction.receipt}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Receipt
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card Layout for Mobile Devices */}
        <div className="cards-container">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="card">
              <p>
                <strong>Transaction ID:</strong> {transaction.id}
              </p>
              <p>
                <strong>Date:</strong> {transaction.date}
              </p>
              <p>
                <strong>Land Location:</strong> {transaction.location}
              </p>
              <p>
                <strong>Seller Name:</strong> {transaction.seller}
              </p>
              <p>
                <strong>Price (₹):</strong> {transaction.price}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={transaction.status.toLowerCase()}>
                  {transaction.status}
                </span>
              </p>
              <p>
                <strong>Receipt:</strong>{" "}
                <a
                  href={transaction.receipt}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Receipt
                </a>
              </p>
            </div>
          ))}
        </div>

        {/* Modal for Transaction Details */}
        {selectedTransaction && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h3>Transaction Details</h3>
              <p>
                <strong>Transaction ID:</strong> {selectedTransaction.id}
              </p>
              <p>
                <strong>Date:</strong> {selectedTransaction.date}
              </p>
              <p>
                <strong>Land Location:</strong> {selectedTransaction.location}
              </p>
              <p>
                <strong>Seller Name:</strong> {selectedTransaction.seller}
              </p>
              <p>
                <strong>Price:</strong> ₹{selectedTransaction.price}
              </p>
              <p>
                <strong>Status:</strong> {selectedTransaction.status}
              </p>
              <p>
                <strong>Receipt:</strong>{" "}
                <a
                  href={selectedTransaction.receipt}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Receipt
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerTransactionHistory;
