// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "../Styles/Government/ManageDisputes.css";

// const ManageDisputes = () => {
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [disputes, setDisputes] = useState([]);
//     const [selectedDispute, setSelectedDispute] = useState(null);

//     useEffect(() => {
//         // Fetch disputes from your API or use placeholder data
//         setDisputes([
//             { id: 1, transaction_id: 101, raised_by: "Alice", description: "Issue with land ownership.", status: "Pending" },
//             { id: 2, transaction_id: 102, raised_by: "Bob", description: "Payment not received.", status: "Escalated" },
//         ]);
//     }, []);

//     const handleAction = (disputeId, action) => {
//         console.log(`Dispute ${disputeId} - Action: ${action}`);
//         // Add your logic to update dispute status here
//     };

//     const viewDetails = (dispute) => {
//         setSelectedDispute(dispute);
//     };

//     return (
//         <div className="container">
//             {/* Sidebar */}
//             <div className={`sidebar ${menuOpen ? "open" : ""}`}>
//                 <button className="close-btn" onClick={() => setMenuOpen(false)}>×</button>
//                 <h2>Authority Dashboard</h2>
//                 <ul>
//                     <li><Link to="/government/approve-transactions">Approve Transactions</Link></li>
//                     <li className="active"><Link to="/government/manage-disputes">Manage Disputes</Link></li>
//                     <li><Link to="/government/land-details">Land Details</Link></li>
//                     <li><Link to="/government/profile">Profile</Link></li>
//                 </ul>
//             </div>

//             {/* Main Content */}
//             <div className="main-content">
//                 <button className="menu-btn" onClick={() => setMenuOpen(true)}>☰</button>
//                 <h2>Manage Disputes</h2>

//                 {/* Desktop View: Table and Details Panel */}
//                 <div className="desktop-view">
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>Transaction ID</th>
//                                 <th>Raised By</th>
//                                 <th>Description</th>
//                                 <th>Status</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {disputes.map((dispute) => (
//                                 <tr key={dispute.id} onClick={() => viewDetails(dispute)}>
//                                     <td>{dispute.id}</td>
//                                     <td>{dispute.transaction_id}</td>
//                                     <td>{dispute.raised_by}</td>
//                                     <td>{dispute.description}</td>
//                                     <td>{dispute.status}</td>
//                                     <td>
//                                         <button onClick={(e) => { e.stopPropagation(); handleAction(dispute.id, "Resolve"); }}>Resolve</button>
//                                         <button onClick={(e) => { e.stopPropagation(); handleAction(dispute.id, "Escalate"); }}>Escalate</button>
//                                         <button onClick={(e) => { e.stopPropagation(); handleAction(dispute.id, "Reject"); }}>Reject</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>

//                     {selectedDispute && (
//                         <div className="dispute-details">
//                             <h3>Dispute Details</h3>
//                             <p><strong>ID:</strong> {selectedDispute.id}</p>
//                             <p><strong>Transaction ID:</strong> {selectedDispute.transaction_id}</p>
//                             <p><strong>Raised By:</strong> {selectedDispute.raised_by}</p>
//                             <p><strong>Description:</strong> {selectedDispute.description}</p>
//                             <p><strong>Status:</strong> {selectedDispute.status}</p>
//                         </div>
//                     )}
//                 </div>

//                 {/* Mobile View: Cards for all disputes */}
//                 <div className="mobile-view">
//                     <div className="dispute-cards">
//                         {disputes.map((dispute) => (
//                             <div className="dispute-card" key={dispute.id}>
//                                 <p><strong>ID:</strong> {dispute.id}</p>
//                                 <p><strong>Transaction ID:</strong> {dispute.transaction_id}</p>
//                                 <p><strong>Raised By:</strong> {dispute.raised_by}</p>
//                                 <p><strong>Description:</strong> {dispute.description}</p>
//                                 <p><strong>Status:</strong> {dispute.status}</p>
//                                 <div className="card-actions">
//                                     <button onClick={() => handleAction(dispute.id, "Resolve")}>Resolve</button>
//                                     <button onClick={() => handleAction(dispute.id, "Escalate")}>Escalate</button>
//                                     <button onClick={() => handleAction(dispute.id, "Reject")}>Reject</button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default ManageDisputes;
