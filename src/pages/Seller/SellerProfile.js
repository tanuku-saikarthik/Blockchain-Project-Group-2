import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../../API"; // Adjust path if needed
import "../Styles/Seller/SellerProfile.css";

const Profile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch user profile on component mount
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userData = await fetchUserProfile();
        setUser(userData);
      } catch (err) {
        setError("Failed to load profile data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getUserProfile();
  }, []);

  const logout = () => {
    console.log("User logged out");
    navigate("/login");
  };

  // Show a loading state or error if needed
  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>No user data available.</p>;

  return (
    <div className="container">
      {/* Sidebar */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          ×
        </button>
        <h2>Seller Dashboard</h2>
        <ul>
          <li><Link to="/seller/add-land">Add a Land</Link></li>
          <li><Link to="/seller/view-land">View Your Lands</Link></li>
          <li><Link to="/seller/pending-verifications">Pending Verifications</Link></li>
          <li><Link to="/seller/offers">Buyer Offers</Link></li>
          <li><Link to="/seller/transaction-history">Transaction History</Link></li>
          <li className="active"><Link to="/seller/profile">Profile</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>
          ☰
        </button>
        <div className="profile-card">
          <div className="profile-header">
            <h2>{user.fullName}</h2>
            <p>{user.email}</p>
          </div>
          <div className="profile-details">
            <div><strong>User Type:</strong> {user.role_id}</div>
            <div><strong>Age:</strong> {user.age}</div>
            <div><strong>Phone Number:</strong> {user.phone_number}</div>
            <div><strong>PAN Number:</strong> {user.pan_number}</div>
            <div><strong>Aadhaar Number:</strong> {user.aadhaar_number}</div>
            <div><strong>Wallet Address:</strong> {user.wallet_address}</div>
          </div>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
