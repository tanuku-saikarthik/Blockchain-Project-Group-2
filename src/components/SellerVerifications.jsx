import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SellerVerifications.css";

const Verifications = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Custom hook to get the current window width
  const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return width;
  };

  const width = useWindowWidth();
  // For example, render card layout if width is less than 480px
  const isMobile = width < 480;

  // Dummy data for pending verification requests
  const pendingRequests = [
    {
      id: 1,
      buyerName: "Alice Johnson",
      buyerEmail: "alice@example.com",
      land: {
        location: "Bangalore",
        size: "200.00",
        price: "5000000",
      },
    },
    {
      id: 2,
      buyerName: "Bob Smith",
      buyerEmail: "bob@example.com",
      land: {
        location: "Mysore",
        size: "300.00",
        price: "7500000",
      },
    },
  ];

  const confirmVerification = (requestId) => {
    // Replace this with your actual verification confirmation logic
    console.log(`Verification confirmed for request id ${requestId}`);
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
          <li>
            <Link to="/add-land">Add a Land</Link>
          </li>
          <li>
            <Link to="/view-land">View Your Lands</Link>
          </li>
          <li className="active">
            <Link to="/pending-verifications">Pending Verifications</Link>
          </li>
          <li>
            <Link to="/buyer-offers">Buyer Offers</Link>
          </li>
          <li>
            <Link to="/transaction-history">Transaction History</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>
          ☰
        </button>
        <h2 className="verification-header">Pending Verifications</h2>

        {isMobile ? (
          // Card layout for small screens
          <div className="cards-container">
            {pendingRequests.map((request) => (
              <div key={request.id} className="card">
                <p>
                  <strong>Buyer Name:</strong> {request.buyerName}
                </p>
                <p>
                  <strong>Buyer Email:</strong> {request.buyerEmail}
                </p>
                <p>
                  <strong>Land Location:</strong> {request.land.location}
                </p>
                <p>
                  <strong>Land Size:</strong> {request.land.size} sq. meters
                </p>
                <p>
                  <strong>Land Price:</strong> ₹{request.land.price}
                </p>
                <button
                  className="confirm-btn"
                  onClick={() => confirmVerification(request.id)}
                >
                  Confirm
                </button>
              </div>
            ))}
          </div>
        ) : (
          // Table layout for larger screens
          <table className="pending-table">
            <thead>
              <tr>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Land Location</th>
                <th>Land Size (sq. meters)</th>
                <th>Land Price (₹)</th>
                <th>Confirm</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.buyerName}</td>
                  <td>{request.buyerEmail}</td>
                  <td>{request.land.location}</td>
                  <td>{request.land.size}</td>
                  <td>{request.land.price}</td>
                  <td>
                    <button
                      className="confirm-btn"
                      onClick={() => confirmVerification(request.id)}
                    >
                      Confirm
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Verifications;
