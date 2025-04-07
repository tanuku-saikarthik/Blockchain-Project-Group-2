import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addLand } from "../../API"; // Adjust the import path as needed
import "../Styles/Seller/SellerAddLand.css";

const AddLand = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    size: "",
    price: "",
    is_for_sale: false,
  });
  const [message, setMessage] = useState(''); // Added message state for displaying success/error message

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addLand(formData); // Assuming addLand is a function that handles the API request
      setMessage(`Success: ${response.message}`);
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="container">
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>×</button>
        <h2>Seller Dashboard</h2>
        <ul>
          <li className="active"><Link to="/seller/add-land">Add a Land</Link></li>
          <li><Link to="/seller/view-land">View Your Lands</Link></li>
          <li><Link to="/seller/offers">Buyer Offers</Link></li>
          <li><Link to="/seller/transaction-history">Transaction History</Link></li>
          <li><Link to="/seller/profile">Profile</Link></li>
        </ul>
      </div>

      <div className="main-content">
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>☰</button>
        <div className="form-container">
          <h2>Add a Land</h2>
          {message && <p>{message}</p>} {/* Displaying the message */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="size"
              placeholder="Size (in sq. meters)"
              value={formData.size}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price (Optional)"
              value={formData.price}
              onChange={handleChange}
            />
            <label className="checkbox">
              <input
                type="checkbox"
                name="is_for_sale"
                checked={formData.is_for_sale}
                onChange={handleChange}
              />
              Mark as For Sale
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLand;
