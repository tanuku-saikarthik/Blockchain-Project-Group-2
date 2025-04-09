import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { updateOffer, cancelOffer } from "../../API1"; // Adjust path as needed
import { fetchAllLands, makeOffer } from "../../API"; // Adjust path as needed
import "../Styles/Buyer/BuyerViewLand.css";
import landImage from "./image.webp";


const BuyerViewLand = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lands, setLands] = useState([]);
  const [selectedLand, setSelectedLand] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [notes, setNotes] = useState("");
  const [escrowAmount, setEscrowAmount] = useState("");
  const [offerLoading, setOfferLoading] = useState(false);
  const [offerError, setOfferError] = useState("");
  const [myOffers, setMyOffers] = useState({});
  const [walletAddress, setWalletAddress] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getLands = async () => {
      try {
        const data = await fetchAllLands();
        setLands(data);
      } catch (error) {
        setMessage(`Error: ${error.response?.data?.error || error.message}`);
      }
    };
    getLands();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWalletAddress(accounts[0]);
      console.log("Connected wallet:", accounts[0]);
      alert("Wallet connected successfully!");
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect wallet.");
    }
  };

  const filteredLands = lands.filter((land) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return land.location.toLowerCase().includes(query) || land.price.toString().includes(query);
  });

  const handleLandClick = (land) => {
    setSelectedLand(land);
    setOfferError("");
    if (myOffers[land.id]) {
      const { offerPrice, notes, escrowAmount } = myOffers[land.id];
      setOfferPrice(offerPrice);
      setNotes(notes || "");
      setEscrowAmount(escrowAmount || "");
    } else {
      setOfferPrice("");
      setNotes("");
      setEscrowAmount("");
    }
  };

  const closeModal = () => {
    setSelectedLand(null);
  };

  const handleOfferAction = async (actionType) => {
    if (!walletAddress) {
      alert("Please connect your wallet before proceeding.");
      return;
    }
    if (!offerPrice || !escrowAmount) {
      setOfferError("Please enter valid offer and escrow deposit amounts.");
      return;
    }

    try {
      setOfferLoading(true);
      let offerData;
      if (actionType === "make") {
        offerData = await makeOffer(selectedLand.id, offerPrice, notes, walletAddress);
        console.log("Offer Data:", offerData); // Debugging line
      } else if (actionType === "update") {
        offerData = await updateOffer(myOffers[selectedLand.id].offerId, offerPrice, notes, escrowAmount, walletAddress);
      }

      if (offerData) {
        setMyOffers((prev) => ({ ...prev, [selectedLand.id]: offerData }));
        alert(`Offer ${actionType === "make" ? "submitted" : "updated"} successfully.`);
        closeModal();
      }
    } catch (error) {
      console.error(`Error ${actionType}ing offer:`, error);
      setOfferError(`Failed to ${actionType} offer. Please try again.`);
    } finally {
      setOfferLoading(false);
    }
  };

  const handleCancelOffer = async () => {
    if (!myOffers[selectedLand.id]) return;
    try {
      setOfferLoading(true);
      await cancelOffer(myOffers[selectedLand.id].offerId);
      setMyOffers((prev) => {
        const updated = { ...prev };
        delete updated[selectedLand.id];
        return updated;
      });
      alert("Offer canceled successfully.");
      closeModal();
    } catch (error) {
      console.error("Error canceling offer:", error);
      setOfferError("Failed to cancel offer. Please try again.");
    } finally {
      setOfferLoading(false);
    }
  };

  return (
    <div className="container">
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>×</button>
        <h2>Buyer Dashboard</h2>
        <ul>
          <li className="active"><Link to="/buyer/view-land">View Available Lands</Link></li>
          <li><Link to="/buyer/purchases">Your Purchases</Link></li>
        
          <li><Link to="/buyer/profile">Profile</Link></li>
        </ul>
      </div>

      <div className="main-content">
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>☰</button>
        <h2 className="header">Available Lands</h2>

        <div className="wallet-connection">
          {walletAddress ? <p>Connected Wallet: {walletAddress}</p> : <button onClick={connectWallet}>Connect Wallet</button>}
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Search by location or price..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>

        <div className="grid-container">
          {filteredLands.map((land) => (
            <div key={land.id} className="grid-item" onClick={() => handleLandClick(land)}>
              <img src={landImage} alt="Land" />

              <div className="details">
                <p>Location: {land.location}</p>
                <p>Size: {land.size} sq. meters</p>
                <p>Price: ₹{land.price}</p>
                <p>Status: {land.is_for_sale ? "For Sale" : "Not for Sale"}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedLand && (
         <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
         <div style={{ backgroundColor: "white", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", padding: "20px", width: "100%", maxWidth: "500px", position: "relative" }}>
           <button 
             style={{ position: "absolute", top: "10px", right: "15px", fontSize: "20px", color: "gray", border: "none", background: "none", cursor: "pointer" }}
             onClick={closeModal}
           >
             &times;
           </button>
           <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#333", marginBottom: "15px" }}>Land Details</h3>
           
           <div style={{ marginBottom: "15px", color: "#555" }}>
             <p><strong>Location:</strong> {selectedLand.location}</p>
             <p><strong>Size:</strong> {selectedLand.size} sq. meters</p>
             <p><strong>Price:</strong> ₹{selectedLand.price}</p>
             <p><strong>Status:</strong> <span style={{ color: selectedLand.is_for_sale ? "green" : "red" }}>{selectedLand.is_for_sale ? "For Sale" : "Not for Sale"}</span></p>
           </div>
   
           {selectedLand.is_for_sale && (
             <form 
               onSubmit={(e) => { 
                 e.preventDefault(); 
                 handleOfferAction(myOffers[selectedLand.id] ? "update" : "make");
               }} 
               style={{ marginTop: "15px" }}
             >
               <div style={{ marginBottom: "10px" }}>
                 <label style={{ fontWeight: "bold" }}>Offer Price</label>
                 <input 
                   type="number" 
                   value={offerPrice} 
                   onChange={(e) => setOfferPrice(e.target.value)} 
                   style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", marginTop: "5px" }}
                 />
               </div>
   
               <div style={{ marginBottom: "10px" }}>
                 <label style={{ fontWeight: "bold" }}>Escrow Deposit</label>
                 <input 
                   type="number" 
                   value={escrowAmount} 
                   onChange={(e) => setEscrowAmount(e.target.value)} 
                   style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", marginTop: "5px" }}
                 />
               </div>
   
               <div style={{ marginBottom: "10px" }}>
                 <label style={{ fontWeight: "bold" }}>Notes</label>
                 <textarea 
                   value={notes} 
                   onChange={(e) => setNotes(e.target.value)} 
                   style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", marginTop: "5px", minHeight: "80px" }}
                 />
               </div>
               
               {offerError && <p style={{ color: "red", fontSize: "14px" }}>{offerError}</p>}
               
               <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                 <button 
                   type="submit" 
                   style={{ padding: "10px 15px", backgroundColor: offerLoading ? "gray" : "blue", color: "white", borderRadius: "5px", border: "none", cursor: offerLoading ? "not-allowed" : "pointer" }}
                   disabled={offerLoading}
                 >
                   {offerLoading ? "Processing..." : myOffers[selectedLand.id] ? "Update Offer" : "Make Offer"}
                 </button>
                 {myOffers[selectedLand.id] && (
                   <button 
                     type="button" 
                     style={{ padding: "10px 15px", backgroundColor: offerLoading ? "gray" : "red", color: "white", borderRadius: "5px", border: "none", cursor: offerLoading ? "not-allowed" : "pointer" }}
                     onClick={handleCancelOffer} 
                     disabled={offerLoading}
                   >
                     Cancel Offer
                   </button>
                 )}
               </div>
             </form>
           )}
         </div>
       </div>
        )}
      </div>
    </div>
  );
};

export default BuyerViewLand;
