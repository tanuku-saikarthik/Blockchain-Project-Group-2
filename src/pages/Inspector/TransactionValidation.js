// TransactionValidation.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/Inspector/TransactionValidation.css";
import {
  getPendingTransactions,
  validateTransaction,
  rejectValidation,
  sendEscrowToSellerAPI,
  confirmLandVerification,
} from "../../API";

const TransactionValidation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);
  const [status, setStatus] = useState(null); // State to store success or error messages


  // Fetch transactions when the component mounts
  useEffect(() => {
    async function fetchTransactions() {
      setLoading(true);
      try {
        const response = await getPendingTransactions();
        console.log("Fetched transactions:", response); 
  
        if (!response || !response.transactions) {
          setTransactions([]); // Ensure it's always an array
        } else {
          setTransactions(response.transactions);
        }
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Failed to fetch transactions.");
        setTransactions([]); // Ensure UI doesn't crash
      } finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  }, []);
  

  // Filter transactions based on search query (by buyer, seller, or location)
  /*const filteredTransactions = transactions.filter((transaction) => {
    const query = searchQuery.toLowerCase();
    return (
      transaction.buyer?.toLowerCase().includes(query) ||
      transaction.seller?.toLowerCase().includes(query) ||
      transaction.landLocation?.toLowerCase().includes(query)
    );
  });*/

  // Action handlers for inspector validation
  const handleValidate = async (id) => {
    try {
      const result = await validateTransaction(id);
      // Update UI: remove validated transaction
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      console.log(`Validated transaction ${id}`, result);
    } catch (error) {
      console.error(`Failed to validate transaction ${id}`, error);
    }
  };

  const handleTransfer = async (landId, tId) => {
    setStatus(null);
    setError(null);
    console.log("Sending escrow to seller for landId:", landId, "transactionId:", tId);
    try {
      const result = await confirmLandVerification( tId);
      console.log("Escrow sent to seller:", result);
      setStatus(result.message); // Success message from backend
    } catch (error) {
      setError(error.response?.data?.error || 'Something went wrong');
    }
  };

  const handleRejectValidation = async (id) => {
    try {
      const result = await rejectValidation(id);
      // Update UI: remove rejected transaction
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      console.log(`Rejected validation for transaction ${id}`, result);
    } catch (error) {
      console.error(`Failed to reject transaction validation ${id}`, error);
    }
  };

  const handleMoreInfo = (id) => {
    console.log(`Requested more info for transaction ${id}`);
    // Implement further navigation or modal popup for detailed transaction info here
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          ×
        </button>
        <h2>Inspector Dashboard</h2>
        <ul>
          
          <li className="active">
            <Link to="/inspector/transaction-validation">
              Validate Transactions
            </Link>
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
        <h2 className="page-header">Validate Accepted Offers</h2>

        {/* Loading and Error Messages */}
        {loading && <p>Loading transactions...</p>}
        {error && <p className="error">Done</p>}

        {/* Transactions Cards Container */}
        <div className="transactions-container">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-card">
              <div className="transaction-details">
                <p>
                  <strong>ID:</strong> {transaction.id}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {transaction.transaction_date || transaction.date}
                </p>
                <p>
                  <strong>Buyer:</strong> {transaction.buyer_id}
                </p>
            
             
            
                {/* Additional details, such as escrow info */}
              
              {/*  <p>
                  <strong>Escrow Status:</strong>{" "}
                  {transaction.escrowStatus || "Pending"}
                </p>*/}
                <p>
                  <strong>Land ID:</strong> {transaction.land_id}
                </p>
                
              
                {transaction.validation_status && (
                  <p>
                    <strong>Validation Status:</strong>{" "}
                    {transaction.validation_status}
                  </p>
                )}
                {transaction.validated_by && (
                  <p>
                    <strong>Validated By:</strong> {transaction.validated_by}
                  </p>
                )}
                {transaction.validation_date && (
                  <p>
                   
                  </p>
                )}
              </div>
              <div className="action-buttons">
                <button onClick={() => handleTransfer(transaction.land_id, transaction.id)}>
                  Validate
                </button>
                <button onClick={() => handleRejectValidation(transaction.id)}>
                  Reject
                </button>
               
                {transaction.receipt && (
                  <a
                    href={transaction.receipt}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Receipt
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionValidation;
