
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPurchases } from "../../API1"; // Adjust the path as needed
import "../Styles/Buyer/Purchases.css";
import { fetchLands } from "../../API";

const Purchases = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  // Fetch purchases from the backend on component mount
  useEffect(() => {
    const getPurchases = async () => {
      try {
        const data = await fetchPurchases();
        setPurchases(data);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      }
    };
    getPurchases();
  }, []);

    const [message, setMessage] = useState("");
    const [lands, setLands] = useState([]);
  
    useEffect(() => {
      const getLands = async () => {
        try {
          const data = await fetchLands();
          setLands(data);
          console.log("Lands data:", data); // Debugging line
        } catch (error) {
          setMessage(`Error: ${error.response?.data?.error || error.message}`);
        }
      };
      getLands();
    }, []);
  

  const handlePurchaseClick = (purchase) => {
    setSelectedPurchase(purchase);
  };

  const closeModal = () => {
    setSelectedPurchase(null);
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
          <li><Link to="/buyer/view-land">View Available Lands</Link></li>
          <li className="active"><Link to="/buyer/purchases">Your Purchases</Link></li>
        
          <li><Link to="/buyer/profile">Profile</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>
          ☰
        </button>
        <h2 className="header">Your Purchases</h2>

        <div className="grid-container">
          {purchases.length > 0 ? (
            purchases.map((purchase) => (
              <div
                key={purchase.id}
                className="grid-item"
                onClick={() => handlePurchaseClick(purchase)}
              >
                <img src={purchase.documents[0]} alt="Purchased Land" />
                <div className="details">
                  <p><strong>Location:</strong> {purchase.location}</p>
                  <p><strong>Size:</strong> {purchase.size} sq. meters</p>
                  <p><strong>Price:</strong> ₹{purchase.price}</p>
                  <p><strong>Purchased on:</strong> {purchase.purchaseDate}</p>
                  {/* Display escrow info in the card view */}
                  <p>
                    <strong>Escrow:</strong> {purchase.escrowAmount ? `₹${purchase.escrowAmount}` : "N/A"}
                  </p>
                  <p>
                    <strong>Status:</strong> {purchase.escrowStatus || "Pending"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No purchases found.</p>
          )}
        </div>

        {/* Purchase Details Modal */}
        {selectedPurchase && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h3>Purchase Details</h3>
              <img src={selectedPurchase.documents[0]} alt="Purchased Land" />
              <p>
                <strong>Location:</strong> {selectedPurchase.location}
              </p>
              <p>
                <strong>Size:</strong> {selectedPurchase.size} sq. meters
              </p>
              <p>
                <strong>Price:</strong> ₹{selectedPurchase.price}
              </p>
              <p>
                <strong>Purchase Date:</strong> {selectedPurchase.purchaseDate}
              </p>
              {/* New escrow deposit details */}
              <p>
                <strong>Escrow Deposit:</strong> {selectedPurchase.escrowAmount ? `₹${selectedPurchase.escrowAmount}` : "N/A"}
              </p>
              <p>
                <strong>Escrow Status:</strong> {selectedPurchase.escrowStatus || "Pending"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Purchases;
