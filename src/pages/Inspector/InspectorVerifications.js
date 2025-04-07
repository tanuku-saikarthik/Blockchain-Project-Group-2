
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/Inspector/InspectorVerifications.css";
import { fetchUnverifiedLands, confirmLandVerification, rejectLandVerification } from "../../API1";

const InspectorVerifications = () => {
  const [menuOpen, setMenuOpen] = useState(false);     
  const [searchQuery, setSearchQuery] = useState("");
  const [verifications, setVerifications] = useState(null); // State to store unverified lands

  // Fetch unverified lands from the backend when the component mounts
  useEffect(() => {
    const loadUnverifiedLands = async () => {
      try {
        const data = await fetchUnverifiedLands();
        setVerifications(data);
      } catch (error) {
        console.error("Error loading unverified lands:", error);
      }
    };
    loadUnverifiedLands();
  }, []);

  // Filter verifications based on search query (by location or seller)
  /*const filteredVerifications = (verifications || []).filter((verification) => {
    const query = searchQuery.toLowerCase();
    return (
      verification.location.toLowerCase().includes(query) ||
      verification.seller.toLowerCase().includes(query)
    );
  });*/

  // Approve verification: mark land as verified and remove it from the list
  const handleApprove = async (id) => {
    try {
      await confirmLandVerification(id);
      // Remove the verified land from the current state so the UI updates
      setVerifications((prev) => prev.filter((land) => land.id !== id));
      console.log(`Approved verification ${id}`);
    } catch (error) {
      console.error(`Error approving verification ${id}:`, error);
    }
  };

  // Reject verification: remove the land from the database and from the list
  const handleReject = async (id) => {
    try {
      await rejectLandVerification(id);
      // Remove the rejected land from the state
      setVerifications((prev) => prev.filter((land) => land.id !== id));
      console.log(`Rejected verification ${id}`);
    } catch (error) {
      console.error(`Error rejecting verification ${id}:`, error);
    }
  };

  // Dummy action handler for requesting more information
  const handleRequestMoreInfo = (id) => {
    console.log(`Requested more info for verification ${id}`);
  };

  // Display a loading state while fetching data
  if (!verifications) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      {/* Sidebar */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          ×
        </button>
        <h2>Inspector Dashboard</h2>
        <ul>
          <li className="active"><Link to="/inspector/verifications">Pending Verifications</Link></li>
          <li><Link to="/inspector/transaction-validation">Validate Transactions</Link></li>
          <li><Link to="/inspector/land-details">Land Details</Link></li>
          <li><Link to="/inspector/profile">Profile</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>
          ☰
        </button>
        <h2>Pending Verifications</h2>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by location or seller..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Verification Cards Container */}
        <div className="verifications-container">
          {verifications.map((verification) => (
            <div key={verification.id} className="verification-card">
              <img src={verification.image} alt="Land Thumbnail" />
              <div className="verification-details">
                <p>
                  <strong>Location:</strong> {verification.location}
                </p>
                <p>
                  <strong>Size:</strong> {verification.size}
                </p>
                <p>
                  <strong>Price:</strong> ₹{verification.price}
                </p>
                <p>
                  <strong>Seller:</strong> {verification.seller}
                </p>
                <p>
                  <strong>Submitted on:</strong> {verification.submissionDate}
                </p>
                <p>
                  <strong>Status:</strong> {verification.status}
                </p>
              </div>
              <div className="action-buttons">
                <button onClick={() => handleApprove(verification.id)}>
                  Approve
                </button>
                <button onClick={() => handleReject(verification.id)}>
                  Reject
                </button>
                <button onClick={() => handleRequestMoreInfo(verification.id)}>
                  More Info
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InspectorVerifications;
