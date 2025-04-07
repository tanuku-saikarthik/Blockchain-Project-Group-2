import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SellerViewLand.css";

const ViewLand = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLand, setSelectedLand] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    size: "",
    price: "",
    is_for_sale: false,
  });

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

  const handleLandClick = (land) => {
    setSelectedLand(land);
    setFormData({
      location: land.location,
      size: land.size,
      price: land.price,
      is_for_sale: land.is_for_sale,
    });
  };

  const closeModal = () => {
    setSelectedLand(null);
    setEditMode(false);
  };

  const handleEdit = () => setEditMode(true);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleUpdateProperty = (e) => {
    e.preventDefault();
    console.log("Updated Details:", formData);
    closeModal();
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>×</button>
        <h2><Link to="/dashboard">Dashboard</Link></h2>
        <ul>
          <li><Link to="/add-land">Add a Land</Link></li>
          <li className="active"><Link to="/view-lands">View Your Lands</Link></li>
          <li><Link to="/pending-verifications">Pending Verifications</Link></li>
          <li><Link to="/buyer-offers">Buyer Offers</Link></li>
          <li><Link to="/transaction-history">Transaction History</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>☰</button>
        <h2 className="header">View Your Lands</h2>
        
        <div className="grid-container">
          {lands.map(land => (
            <div 
              key={land.id}
              className="grid-item"
              onClick={() => handleLandClick(land)}
            >
              <img src={land.documents[0]} alt="Land" />
              <span className={`property-status ${land.is_for_sale ? 'status-available' : 'status-sold'}`}>
                {land.is_for_sale ? "For Sale" : "Not Available"}
              </span>
              <div className="card-content">
                <h3 className="property-location">{land.location}</h3>
                <div className="property-details">
                  <div className="detail-item">
                    <span className="detail-label">Size</span>
                    <span className="detail-value">{land.size} sqm</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Price</span>
                    <span className="detail-value">
                      ₹{Number(land.price).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Land Details Modal */}
        {selectedLand && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              {editMode ? (
                <form onSubmit={handleUpdateProperty} className="modal-form">
                  <div className="form-group">
                    <label>Location:</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Size (sqm):</label>
                    <input
                      type="number"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Price (₹):</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group checkbox">
                    <label>
                      <input
                        type="checkbox"
                        name="is_for_sale"
                        checked={formData.is_for_sale}
                        onChange={handleChange}
                      />
                      Mark as Available
                    </label>
                  </div>
                  <div className="modal-actions">
                    <button type="submit" className="btn-edit">Update</button>
                    <button type="button" className="btn-delete" onClick={closeModal}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                <div>
                  <img src={selectedLand.documents[0]} alt="Land" />
                  <div className="modal-details">
                    <div className="modal-detail">
                      <strong>Location</strong>
                      <span>{selectedLand.location}</span>
                    </div>
                    <div className="modal-detail">
                      <strong>Size</strong>
                      <span>{selectedLand.size} sqm</span>
                    </div>
                    <div className="modal-detail">
                      <strong>Price</strong>
                      <span>₹{Number(selectedLand.price).toLocaleString()}</span>
                    </div>
                    <div className="modal-detail">
                      <strong>Status</strong>
                      <span className={`status ${selectedLand.is_for_sale ? 'status-available' : 'status-sold'}`}>
                        {selectedLand.is_for_sale ? "Available" : "Not Available"}
                      </span>
                    </div>
                  </div>
                  <div className="modal-actions">
                    <button className="btn-edit" onClick={handleEdit}>Edit</button>
                    <button className="btn-delete" onClick={closeModal}>Close</button>
                  </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewLand;