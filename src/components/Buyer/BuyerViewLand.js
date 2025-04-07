import { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Buyer/BuyerViewLand.css";

const BuyerViewLand = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLand, setSelectedLand] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy data for available lands
  const lands = [
    {
      id: 1,
      location: "Bangalore",
      size: "200.00",
      price: "5000000",
      is_for_sale: true,
      documents: ["/logo192.png"],
    },
    {
      id: 2,
      location: "Mysore",
      size: "300.00",
      price: "7500000",
      is_for_sale: false,
      documents: ["/logo512.png"],
    },
  ];

  // Filter lands based on search query (location or price)
  const filteredLands = lands.filter((land) => {
    if (searchQuery.trim() === "") return true;
    const query = searchQuery.toLowerCase();
    const locationMatch = land.location.toLowerCase().includes(query);
    const priceMatch = land.price.includes(query); // price is a string
    return locationMatch || priceMatch;
  });

  const handleLandClick = (land) => {
    setSelectedLand(land);
  };

  const closeModal = () => {
    setSelectedLand(null);
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
          <li className="active">
            <Link to="/view-lands">View Available Lands</Link>
          </li>
          <li>
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
        <h2 className="header">Available Lands</h2>
        
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by location or price..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid-container">
          {filteredLands.map((land) => (
            <div
              key={land.id}
              className="grid-item"
              onClick={() => handleLandClick(land)}
            >
              <img src={land.documents[0]} alt="Land" />
              <div className="details">
                <p>Location: {land.location}</p>
                <p>Size: {land.size} sq. meters</p>
                <p>Price: ₹{land.price}</p>
                <p>Status: {land.is_for_sale ? "For Sale" : "Not for Sale"}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Land Details Modal */}
        {selectedLand && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h3>Land Details</h3>
              <img src={selectedLand.documents[0]} alt="Land" />
              <p>
                <strong>Location:</strong> {selectedLand.location}
              </p>
              <p>
                <strong>Size:</strong> {selectedLand.size} sq. meters
              </p>
              <p>
                <strong>Price:</strong> ₹{selectedLand.price}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedLand.is_for_sale ? "For Sale" : "Not for Sale"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerViewLand;
