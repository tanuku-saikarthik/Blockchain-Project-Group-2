
// GovProfile.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Government/GovProfile.css";
import { fetchUserProfile } from "../../API1";

const GovProfile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // Holds fetched user profile data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch the user profile when the component mounts
  useEffect(() => {
    async function getProfile() {
      try {
        const profileData = await fetchUserProfile();
        setUser(profileData);
      } catch (err) {
        setError("Failed to load profile.");
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    }
    getProfile();
  }, []);

  const logout = () => {
    console.log("User logged out");
    // Optionally remove token from localStorage if using token-based auth
    localStorage.removeItem("token");
    navigate("/login");
  };

  // While loading show a message or spinner
  if (loading) {
    return <p>Loading profile...</p>;
  }

  // If error occurred, show error message
  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="container">
      {/* Sidebar */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          ×
        </button>
        <h2>Authority Dashboard</h2>
        <ul>
          <li><Link to="/government/approve-transactions">Approve Transactions</Link></li>
          <li><Link to="/government/manage-disputes">Manage Disputes</Link></li>
          <li><Link to="/government/land-details">Land Details</Link></li>
          <li className="active"><Link to="/government/profile">Profile</Link></li>
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
              <strong>User Type:</strong> {user.userType}
            </div>
            <div>
              <strong>Age:</strong> {user.age}
            </div>
            <div>
              <strong>Phone Number:</strong> {user.phoneNumber}
            </div>
            <div>
              <strong>PAN Number:</strong> {user.panNumber}
            </div>
            <div>
              <strong>Aadhaar Number:</strong> {user.aadhaarNumber}
            </div>
            <div>
              <strong>Wallet Address:</strong> {user.walletAddress}
            </div>
          </div>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default GovProfile;
