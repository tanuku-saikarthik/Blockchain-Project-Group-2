import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Shared Pages
import Landing from "./pages/Shared/Landing";
import Login from "./pages/Shared/Login";
import Register from "./pages/Shared/Register";
import Help from "./pages/Shared/Help";

// Buyer Pages
import BuyerDashboard from "./pages/Buyer/BuyerDashboard";
import BuyerTransactionHistory from "./pages/Buyer/BuyerTransactionHistory";
import BuyerProfile from "./pages/Buyer/BuyerProfile";
import BuyerViewLand from "./pages/Buyer/BuyerViewLand";
import Purchases from "./pages/Buyer/Purchases";

// Seller Pages
import SellerDashboard from "./pages/Seller/SellerDashboard";
import SellerAddLand from "./pages/Seller/SellerAddLand";
import SellerViewLand from "./pages/Seller/SellerViewLand";
import SellerOffers from "./pages/Seller/SellerOffers";
import SellerTransactionHistory from "./pages/Seller/SellerTransactionHistory";
import SellerProfile from "./pages/Seller/SellerProfile";

// Inspector Pages
import InspectorDashboard from "./pages/Inspector/InspectorDashboard";
import InspectorVerifications from "./pages/Inspector/InspectorVerifications";
import TransactionValidation from "./pages/Inspector/TransactionValidation";
import InspectorProfile from "./pages/Inspector/InspectorProfile";
import LandDetails from "./pages/Inspector/LandDetails";

// Government Pages
import GovDashboard from "./pages/Government/GovDashboard";
import GovLandDetails from "./pages/Government/GovLandDetails";
import ApproveTransactions from "./pages/Government/ApproveTransactions";
import ManageDisputes from "./pages/Government/ManageDisputes";
import GovProfile from "./pages/Government/GovProfile";


function App() {
  return (
    <Router>
      <Routes>
        {/* Shared Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/:role" element={<Register />} />
        <Route path="/help" element={<Help />} />

        {/* Buyer Routes */}
        <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
        <Route path="/buyer/transaction-history" element={<BuyerTransactionHistory />} />
        <Route path="/buyer/profile" element={<BuyerProfile />} />
        <Route path="/buyer/view-land" element={<BuyerViewLand />} />
        <Route path="/buyer/purchases" element={<Purchases />} />

        {/* Seller Routes */}
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/seller/add-land" element={<SellerAddLand />} />
        <Route path="/seller/view-land" element={<SellerViewLand />} />
        <Route path="/seller/offers" element={<SellerOffers />} />
        <Route path="/seller/transaction-history" element={<SellerTransactionHistory />} />
        <Route path="/seller/profile" element={<SellerProfile />} />

        {/* Inspector Routes */}
        <Route path="/inspector/dashboard" element={<InspectorDashboard />} />
        <Route path="/inspector/verifications" element={<InspectorVerifications />} />
        <Route path="/inspector/transaction-validation" element={<TransactionValidation />} />
        <Route path="/inspector/land-details" element={<LandDetails />} />
        <Route path="/inspector/profile" element={<InspectorProfile />} />

        {/* Government Routes */}
        <Route path="/government/dashboard" element={<GovDashboard />} />
        <Route path="/government/land-details" element={<GovLandDetails />} />
        <Route path="/government/approve-transactions" element={<ApproveTransactions />} />
       {/* <Route path="/government/manage-disputes" element={<ManageDisputes />} />*/}
        <Route path="/government/profile" element={<GovProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
