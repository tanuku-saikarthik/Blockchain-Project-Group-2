






import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserProfile, getUser } from "../../API"; // Adjust the path as needed
import "../Styles/Buyer/BuyerProfile.css";

const BuyerProfile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    localStorage.removeItem("token"); // Optionally clear authentication token
    navigate("/login");
  };

  if (error) {
    return (
      <div className="container">
        <p className="error">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container">
        <p>Loading profile...</p>
      </div>
    );
  }

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
          <li><Link to="/buyer/purchases">Your Purchases</Link></li>
         
          <li className="active"><Link to="/buyer/profile">Profile</Link></li>
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
            <div>
              <strong>User Type:</strong> {user.role_id}
            </div>
            <div>
              <strong>Age:</strong> {user.age}
            </div>
            <div>
              <strong>Phone Number:</strong> {user.phone_number}
            </div>
            <div>
              <strong>PAN Number:</strong> {user.pan_number}
            </div>
            <div>
              <strong>Aadhaar Number:</strong> {user.aadhaar_number}
            </div>
        {  /*  <div>
              <strong>Wallet Address:</strong> {user.wallet_address}
            </div>*/}
          </div>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;
