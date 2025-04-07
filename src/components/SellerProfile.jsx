import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SellerProfile.css";

const Profile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Dummy user data (replace with your actual user data)
  const user = {
    fullName: "John Doe",
    email: "john@example.com",
    age: 30,
    phoneNumber: "1234567890",
    panNumber: "ABCDE1234F",
    aadhaarNumber: "123412341234",
    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
    userType: "Seller", // Specify if the user is a 'Seller' or 'Buyer'
  };

  const logout = () => {
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          ×
        </button>
        <h2>Seller Dashboard</h2>
        <ul>
          <li><Link to="/add-land">Add a Land</Link></li>
          <li><Link to="/view-land">View Your Lands</Link></li>
          <li><Link to="/pending-verifications">Pending Verifications</Link></li>
          <li><Link to="/buyer-offers">Buyer Offers</Link></li>
          <li><Link to="/transaction-history">Transaction History</Link></li>
          <li className="active"><Link to="/profile">Profile</Link></li>
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
            <div><strong>User Type:</strong> {user.userType}</div>
            <div><strong>Age:</strong> {user.age}</div>
            <div><strong>Phone Number:</strong> {user.phoneNumber}</div>
            <div><strong>PAN Number:</strong> {user.panNumber}</div>
            <div><strong>Aadhaar Number:</strong> {user.aadhaarNumber}</div>
            <div><strong>Wallet Address:</strong> {user.walletAddress}</div>
          </div>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
