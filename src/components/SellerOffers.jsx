import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SellerOffers.css";

const Offers = () => {
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
  // Render card layout if viewport is less than 480px
  const isMobile = width < 480;

  // Dummy data for buyer offers
  const buyerOffers = [
    {
      id: 1,
      buyerName: "Alice Johnson",
      buyerEmail: "alice@example.com",
      land: { location: "Bangalore", size: "200.00" },
      offerPrice: "4800000",
      offerDate: "2025-03-10",
      notes: "I am very interested, please consider my offer.",
    },
    {
      id: 2,
      buyerName: "Bob Smith",
      buyerEmail: "bob@example.com",
      land: { location: "Mysore", size: "300.00" },
      offerPrice: "7200000",
      offerDate: "2025-03-11",
      notes: "Looking forward to a quick transaction.",
    },
  ];

  const acceptOffer = (offerId) => {
    console.log(`Offer ${offerId} accepted`);
  };

  const rejectOffer = (offerId) => {
    console.log(`Offer ${offerId} rejected`);
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
          <li>
            <Link to="/pending-verifications">Pending Verifications</Link>
          </li>
          <li className="active">
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
        <h2 className="offers-header">Buyer Offers</h2>

        {isMobile ? (
          // Card layout for small screens
          <div className="offers-cards">
            {buyerOffers.map((offer) => (
              <div key={offer.id} className="offer-card">
                <p>
                  <strong>Buyer Name:</strong> {offer.buyerName}
                </p>
                <p>
                  <strong>Buyer Email:</strong> {offer.buyerEmail}
                </p>
                <p>
                  <strong>Land Location:</strong> {offer.land.location}
                </p>
                <p>
                  <strong>Land Size:</strong> {offer.land.size} sq. meters
                </p>
                <p>
                  <strong>Offer Price:</strong> ₹{offer.offerPrice}
                </p>
                <p>
                  <strong>Offer Date:</strong> {offer.offerDate}
                </p>
                <p>
                  <strong>Notes:</strong> {offer.notes}
                </p>
                <div>
                  <button
                    className="accept-btn"
                    onClick={() => acceptOffer(offer.id)}
                  >
                    Accept
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => rejectOffer(offer.id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Table layout for larger screens
          <table className="offers-table">
            <thead>
              <tr>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Land Location</th>
                <th>Land Size (sq. meters)</th>
                <th>Offer Price (₹)</th>
                <th>Offer Date</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {buyerOffers.map((offer) => (
                <tr key={offer.id}>
                  <td>{offer.buyerName}</td>
                  <td>{offer.buyerEmail}</td>
                  <td>{offer.land.location}</td>
                  <td>{offer.land.size}</td>
                  <td>{offer.offerPrice}</td>
                  <td>{offer.offerDate}</td>
                  <td>{offer.notes}</td>
                  <td>
                    <button
                      className="accept-btn"
                      onClick={() => acceptOffer(offer.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => rejectOffer(offer.id)}
                    >
                      Reject
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

export default Offers;

  