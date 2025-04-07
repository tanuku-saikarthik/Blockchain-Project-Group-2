








import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import { getValidatedTransactions, approveTransaction, rejectTransaction } from "../../API1";
import "../Styles/Government/ApproveTransactions.css";

const ApproveTransactions = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getValidatedTransactions();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleApprove = async (transactionId) => {
    try {
      await approveTransaction(transactionId);
      // Update the transaction status locally to reflect the change
      setTransactions(transactions.map(tx => 
        tx.id === transactionId ? { ...tx, status: "Approved" } : tx
      ));
    } catch (error) {
      console.error("Error approving transaction", error);
    }
  };

  const handleReject = async (transactionId) => {
    try {
      await rejectTransaction(transactionId);
      // Update the transaction status locally to reflect the change
      setTransactions(transactions.map(tx => 
        tx.id === transactionId ? { ...tx, status: "Rejected" } : tx
      ));
    } catch (error) {
      console.error("Error rejecting transaction", error);
    }
  };

  const filteredTransactions = transactions.filter((tx) => {
    return (
      (tx.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
       tx.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
       tx.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "All" || tx.status === filterStatus)
    );
  });

  return (
    <div className="container">
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>×</button>
        <h2>Authority Dashboard</h2>
        <ul>
          <li className="active"><Link to="/government/approve-transactions">Approve Transactions</Link></li>
          <li><Link to="/government/manage-disputes">Manage Disputes</Link></li>
          <li><Link to="/government/land-details">Land Details</Link></li>
          <li><Link to="/government/profile">Profile</Link></li>
        </ul>
      </div>

      <div className="main-content">
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>☰</button>
        <h2>Approve Transactions</h2>

        <div className="filter-section">
          <input
            type="text"
            placeholder="Search by Buyer, Seller, or Location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Table view for larger screens */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Buyer</th>
              <th>Seller</th>
              <th>Location</th>
              <th>Price</th>
              <th>Escrow Deposit</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.id}</td>
                  <td>{tx.buyer}</td>
                  <td>{tx.seller}</td>
                  <td>{tx.location}</td>
                  <td>{tx.price}</td>
                  <td>{tx.escrowAmount ? `₹${tx.escrowAmount}` : "N/A"}</td>
                  <td>{tx.date}</td>
                  <td>{tx.status}</td>
                  <td>
                    <button onClick={() => handleApprove(tx.id)}>Approve</button>
                    <button onClick={() => handleReject(tx.id)}>Reject</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No pending transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Card view for small screens */}
        <div className="transaction-cards">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((tx) => (
              <div key={tx.id} className="transaction-card">
                <h3>Transaction {tx.id}</h3>
                <p><strong>Buyer:</strong> {tx.buyer}</p>
                <p><strong>Seller:</strong> {tx.seller}</p>
                <p><strong>Location:</strong> {tx.location}</p>
                <p><strong>Price:</strong> {tx.price}</p>
                <p><strong>Escrow Deposit:</strong> {tx.escrowAmount ? `₹${tx.escrowAmount}` : "N/A"}</p>
                <p><strong>Date:</strong> {tx.date}</p>
                <p><strong>Status:</strong> {tx.status}</p>
                <div className="card-actions">
                  <button onClick={() => handleApprove(tx.id)}>Approve</button>
                  <button onClick={() => handleReject(tx.id)}>Reject</button>
                </div>
              </div>
            ))
          ) : (
            <div className="transaction-card">
              <p>No pending transactions found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApproveTransactions;
