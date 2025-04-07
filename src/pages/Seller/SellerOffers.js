import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchBuyerOffersbyId, sellerAcceptOffer, sellerRejectOffer } from "../../API.js";
import "../Styles/Seller/SellerOffers.css";

const Offers = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [buyerOffers, setBuyerOffers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Custom hook to get current window width
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
  const isMobile = width < 480;

  // Fetch buyer offers from the backend when the component mounts
  useEffect(() => {
    const getOffers = async () => {
      setLoading(true);
      try {
        const data = await fetchBuyerOffersbyId();
        if (!data || data.length === 0) {
          console.log("No offers found.");
          return;
        }
        setBuyerOffers(data);
      } catch (error) {
        console.error("Error fetching buyer offers:", error);
      } finally {
        setLoading(false);
      }
    };
    getOffers();
  }, []);

  const handleAcceptOffer = async (offerId, propertyId) => {
    try {
      console.log("Accepting offer:", offerId, propertyId);
      await sellerAcceptOffer(offerId);
      alert(`Offer ${offerId} accepted`);
      // Remove accepted offer from local state
      setBuyerOffers(prev => prev.filter(offer => offer.id !== offerId));
    } catch (error) {
      console.error("Error accepting offer:", error);
      alert("Failed to accept offer");
    }
  };

  const handleRejectOffer = async (offerId, propertyId) => {
    try {
      await sellerRejectOffer(offerId, propertyId);
      alert(`Offer ${offerId} rejected`);
      // Remove rejected offer from local state
      setBuyerOffers(prev => prev.filter(offer => offer.id !== offerId));
    } catch (error) {
      console.error("Error rejecting offer:", error);
      alert("Failed to reject offer");
    }
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
          <li><Link to="/seller/add-land">Add a Land</Link></li>
          <li><Link to="/seller/view-land">View Your Lands</Link></li>
          <li className="active"><Link to="/seller/offers">Buyer Offers</Link></li>
          <li><Link to="/seller/transaction-history">Transaction History</Link></li>
          <li><Link to="/seller/profile">Profile</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>
          ☰
        </button>
        <h2 className="offers-header">Buyer Offers</h2>

        {loading ? (
          <p>Loading offers...</p>
        ) : (
          <>
            {buyerOffers && buyerOffers.length > 0 ? (
              isMobile ? (
                // Card layout for mobile
                <div className="offers-cards">
                  {buyerOffers.map((offer) => (
                    <div key={offer.id} className="offer-card">
                      <p>
                        <strong>Buyer ID:</strong> {offer.buyer_id}
                      </p>
                     
                      <p>
                        <strong>Offer Price:</strong> ₹{offer.offer_price}
                      </p>
                      <p>
                        <strong>Offer Date:</strong> {offer.offer_date}
                      </p>
                      <p>
                        <strong>Notes:</strong> {offer.notes}
                      </p>
                      <div>
                        <button
                          className="accept-btn"
                          onClick={() => handleAcceptOffer(offer.offer_id, offer.propertyId)}
                        >
                          Accept
                        </button>
                        <button
                          className="reject-btn"
                          onClick={() => handleRejectOffer(offer.id, offer.propertyId)}
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
                      <th>Offer ID</th>
                      
                      <th>Offer Price (₹)</th>
                      <th>Offer Date</th>
                      <th>Notes</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {buyerOffers.map((offer) => (
                      <tr key={offer.id}>
                        <td>{offer.offer_id}</td>
                  
                        <td>{offer.offer_price}</td>
                        <td>{offer.offer_date}</td>
                        <td>{offer.notes}</td>
                        <td>
                          <button
                            className="accept-btn"
                            onClick={() => handleAcceptOffer(offer.offer_id, offer.land_id)}
                          >
                            Accept
                          </button>
                          <button
                            className="reject-btn"
                            onClick={() => handleRejectOffer(offer.id, offer.propertyId)}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            ) : (
              <p>No offers found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Offers;
