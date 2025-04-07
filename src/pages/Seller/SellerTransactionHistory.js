// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { fetchTransactionHistory } from "../../API1"; // Adjust the path if necessary
// import "../Styles/Seller/SellerTransactionHistory.css";

// const TransactionHistory = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Custom hook to get current window width
//   const useWindowWidth = () => {
//     const [width, setWidth] = useState(window.innerWidth);
//     useEffect(() => {
//       const handleResize = () => setWidth(window.innerWidth);
//       window.addEventListener("resize", handleResize);
//       return () => window.removeEventListener("resize", handleResize);
//     }, []);
//     return width;
//   };

//   const width = useWindowWidth();
//   // Use card layout if viewport is less than 480px
//   const isMobile = width < 480;

//   // Fetch transaction history from backend on mount
//   useEffect(() => {
//     const getTransactions = async () => {
//       setLoading(true);
//       try {
//         const data = await fetchTransactionHistory();
//         setTransactions(data);
//       } catch (err) {
//         setError("Failed to load transaction history.");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getTransactions();
//   }, []);

//   return (
//     <div className="container transaction-history">
//       {/* Sidebar */}
//       <div className={`sidebar ${menuOpen ? "open" : ""}`}>
//         <button className="close-btn" onClick={() => setMenuOpen(false)}>
//           ×
//         </button>
//         <h2>Seller Dashboard</h2>
//         <ul>
//           <li><Link to="/seller/add-land">Add a Land</Link></li>
//           <li><Link to="/seller/view-land">View Your Lands</Link></li>
//           <li><Link to="/seller/offers">Buyer Offers</Link></li>
//           <li className="active"><Link to="/seller/transaction-history">Transaction History</Link></li>
//           <li><Link to="/seller/profile">Profile</Link></li>
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         <button className="menu-btn" onClick={() => setMenuOpen(true)}>
//           ☰
//         </button>
//         <h2 className="transaction-header">Transaction History</h2>

//         {loading ? (
//           <p>Loading transactions...</p>
//         ) : error ? (
//           <p>{error}</p>
//         ) : (
//           isMobile ? (
//             // Card layout for small screens
//             <div className="cards-container">
//               {transactions.map((tx) => (
//                 <div key={tx.id} className="card">
//                   <p><strong>Buyer:</strong> {tx.buyer}</p>
//                   <p><strong>Location:</strong> {tx.location}</p>
//                   <p><strong>Date:</strong> {tx.date}</p>
//                   <p><strong>Amount:</strong> {tx.amount}</p>
//                   <p><strong>Status:</strong> {tx.status}</p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             // Table layout for larger screens
//             <div className="transaction-container">
//               <table className="transaction-table">
//                 <thead>
//                   <tr>
//                     <th>Buyer</th>
//                     <th>Land Location</th>
//                     <th>Transaction Date</th>
//                     <th>Amount</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {transactions.map((tx) => (
//                     <tr key={tx.id} className={tx.status.toLowerCase()}>
//                       <td>{tx.buyer}</td>
//                       <td>{tx.location}</td>
//                       <td>{tx.date}</td>
//                       <td>{tx.amount}</td>
//                       <td>{tx.status}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default TransactionHistory;














import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchTransactionHistory } from "../../API1"; // Adjust the path if necessary
import "../Styles/Seller/SellerTransactionHistory.css";

const TransactionHistory = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  // Use card layout if viewport is less than 480px
  const isMobile = width < 480;

  // Fetch transaction history from backend on mount
  useEffect(() => {
    const getTransactions = async () => {
      setLoading(true);
      try {
        const data = await fetchTransactionHistory();
        setTransactions(data);
      } catch (err) {
        setError("Failed to load transaction history.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getTransactions();
  }, []);

  return (
    <div className="container transaction-history">
      {/* Sidebar */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          ×
        </button>
        <h2>Seller Dashboard</h2>
        <ul>
          <li><Link to="/seller/add-land">Add a Land</Link></li>
          <li><Link to="/seller/view-land">View Your Lands</Link></li>
          <li><Link to="/seller/offers">Buyer Offers</Link></li>
          <li className="active"><Link to="/seller/transaction-history">Transaction History</Link></li>
          <li><Link to="/seller/profile">Profile</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>
          ☰
        </button>
        <h2 className="transaction-header">Transaction History</h2>

        {loading ? (
          <p>Loading transactions...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          isMobile ? (
            // Card layout for small screens
            <div className="cards-container">
              {transactions.map((tx) => (
                <div key={tx.id} className="card">
                  <p><strong>Buyer:</strong> {tx.buyer}</p>
                  <p><strong>Location:</strong> {tx.location}</p>
                  <p><strong>Date:</strong> {tx.date}</p>
                  <p><strong>Amount:</strong> {tx.amount}</p>
                  {/* New escrow deposit info */}
                  <p><strong>Escrow Deposit (₹):</strong> {tx.escrowAmount || "N/A"}</p>
                  <p><strong>Escrow Status:</strong> {tx.escrowStatus || "Pending"}</p>
                  <p><strong>Status:</strong> {tx.status}</p>
                </div>
              ))}
            </div>
          ) : (
            // Table layout for larger screens
            <div className="transaction-container">
              <table className="transaction-table">
                <thead>
                  <tr>
                    <th>Buyer</th>
                    <th>Land Location</th>
                    <th>Transaction Date</th>
                    <th>Amount</th>
                    <th>Escrow Deposit (₹)</th>
                    <th>Escrow Status</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className={tx.status.toLowerCase()}>
                      <td>{tx.buyer}</td>
                      <td>{tx.location}</td>
                      <td>{tx.date}</td>
                      <td>{tx.amount}</td>
                      <td>{tx.escrowAmount || "N/A"}</td>
                      <td>{tx.escrowStatus || "Pending"}</td>
                      <td>{tx.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
