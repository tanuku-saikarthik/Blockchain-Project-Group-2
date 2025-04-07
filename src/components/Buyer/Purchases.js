import { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Buyer/Purchases.css";

const Purchases = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  // Dummy data for purchased lands
  const purchases = [
    {
      id: 1,
      location: "Bangalore",
      size: "200.00",
      price: "5000000",
      purchaseDate: "2025-01-15",
      documents: ["/logo192.png"],
    },
    {
      id: 2,
      location: "Mysore",
      size: "300.00",
      price: "7500000",
      purchaseDate: "2025-02-10",
      documents: ["/logo512.png"],
    },
  ];

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
          <li>
            <Link to="/view-lands">View Available Lands</Link>
          </li>
          <li className="active">
            <Link to="/your-purchases">Your Purchases</Link>
          </li>
          <li>
            <Link to="/buyer-transaction-history">Transaction History</Link>
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
        <h2 className="header">Your Purchases</h2>

        <div className="grid-container">
          {purchases.map((purchase) => (
            <div
              key={purchase.id}
              className="grid-item"
              onClick={() => handlePurchaseClick(purchase)}
            >
              <img src={purchase.documents[0]} alt="Purchased Land" />
              <div className="details">
                <p>Location: {purchase.location}</p>
                <p>Size: {purchase.size} sq. meters</p>
                <p>Price: ₹{purchase.price}</p>
                <p>Purchased on: {purchase.purchaseDate}</p>
              </div>
            </div>
          ))}
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Purchases;
