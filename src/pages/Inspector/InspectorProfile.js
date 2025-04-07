
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Inspector/InspectorProfile.css";
import { fetchUserProfile } from "../../API1"; 

const InspectorProfile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // State to store the user profile data
  const navigate = useNavigate();

  // Call fetchUserProfile when the component mounts
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userProfile = await fetchUserProfile(); // Fetch the user profile
        setUser(userProfile); // Set the user data in state
      } catch (error) {
        console.error("Error loading user profile:", error);
      }
    };
    
    loadUserProfile();
  }, []); // Empty dependency array means this runs only once when the component mounts

  const logout = () => {
    console.log("User logged out");
    navigate("/login");
  };

  // If user data is not yet loaded, you can show a loading message or skeleton UI
  if (!user) {
    return <div>Loading...</div>; // Show loading state while fetching the profile
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
          
          <li><Link to="/inspector/transaction-validation">Validate Transactions</Link></li>
          
          <li className="active"><Link to="/inspector/profile">Profile</Link></li>
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
            
          </div>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default InspectorProfile;
