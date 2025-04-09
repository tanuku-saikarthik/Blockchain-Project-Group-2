


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./default.jpg" 
// import { ethers } from "ethers"; // Uncomment when integrating with blockchain
// import PropertyContract from "../../contracts/PropertyContract.json"; // Uncomment when adding contract ABI
import { fetchLands, updateProperty, cancelPropertyListing } from "../../API"; // Import API functions
import "../Styles/Seller/SellerViewLand.css";
import landImage from "./image.webp";


const ViewLand = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLand, setSelectedLand] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    location: "",
    size: "",
    price: "",
    is_for_sale: false,
  });

  // Fetch land data from the backend when the component mounts
 useEffect(() => {
     const getLands = async () => {
       try {
         const data = await fetchLands();
         console.log("Lands data:", data); // Debugging line
         setLands(data);
       } catch (error) {
         setMessage(`Error: ${error.response?.data?.error || error.message}`);
       }
     };
     getLands();
   }, []);

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

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdateProperty = async (e) => {
    e.preventDefault();
    console.log("Updated Details:", formData);

    try {
      // Call the API function to update property details
      const updated = await updateProperty(selectedLand.id, formData);
      alert("Property updated successfully!");
      console.log("Updated property:", updated);
      // Optionally update your local state here (e.g., re-fetch lands or update the specific item)
    } catch (error) {
      console.error("Error updating property:", error);
      alert("An error occurred while updating the property.");
    }
    closeModal();
  };

  const handleCancelPropertyListing = async () => {
    console.log("Cancel Property Listing:", selectedLand.id);

    try {
      // Call the API function to delete/cancel the property listing
      const result = await cancelPropertyListing(selectedLand.id);
      alert("Property listing cancelled successfully!");
      console.log("Delete result:", result);
      // Optionally remove the property from your local state here
    } catch (error) {
      console.error("Error cancelling property listing:", error);
      alert("An error occurred while cancelling the property listing.");
    }
    closeModal();
  };

  return (
    <div className="container">
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          ×
        </button>
        <h2>Seller Dashboard</h2>
        <ul>
          <li><Link to="/seller/add-land">Add a Land</Link></li>
          <li className="active"><Link to="/seller/view-land">View Your Lands</Link></li>
          <li><Link to="/seller/offers">Buyer Offers</Link></li>
          <li><Link to="/seller/transaction-history">Transaction History</Link></li>
          <li><Link to="/seller/profile">Profile</Link></li>
        </ul>
      </div>

      <div className="main-content">
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>
          ☰
        </button>
        <h2 className="header">View Your Lands</h2>

        {loading ? (
          <p>Loading lands...</p>
        ) : (
          <div className="grid-container">
            {lands && lands.length > 0 ? (
              lands.map((land) => (
                <div
                  key={land.id}
                  className="grid-item"
                  onClick={() => handleLandClick(land)}
                >
                  <img src={landImage} alt="Land" />
                </div>
              ))
            ) : (
              <p>No lands found.</p>
            )}
          </div>
        )}

        {selectedLand && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              {editMode ? (
                <form onSubmit={handleUpdateProperty}>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                  <label>
                    For Sale:
                    <input
                      type="checkbox"
                      name="is_for_sale"
                      checked={formData.is_for_sale}
                      onChange={handleChange}
                    />
                  </label>
                  <button type="submit">Update Property</button>
                </form>
              ) : (
                <>
                  <img src={selectedLand.documents?.[0] || landImage} alt="Land" />

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
