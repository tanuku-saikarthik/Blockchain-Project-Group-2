import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Update this if your backend is deployed

// Helper function to get the authorization config
const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Authorization token is missing.");
    return { headers: { Authorization: `Bearer ${token}` } };
};


export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error.response?.data || error.message);
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/login`, credentials);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error.response?.data || error.message);
        throw error;
    }
};

export const fetchUserProfile = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/profile`, getAuthConfig());
        console.log(response.data); // For debugging
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error.response?.data || error.message);
        throw error;
    }
};





export const getUser = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/user/${userId}`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error.response?.data || error.message);
        throw error;
    }
};

export const addLand = async (formData) => {
    try {
        console.log("Form Data:", formData); // For debugging
        const response = await axios.post(`${API_BASE_URL}/api/add-land`, formData, {
            headers: { 'Content-Type': 'application/json', ...getAuthConfig().headers }
        });
        return response;
    } catch (error) {
        console.error("Error while adding land:", error);
        throw error;
    }
};

export const fetchLands = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/lands`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error fetching lands:", error.response?.data || error.message);
        throw error;
    }
};

export const fetchAllLands = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/all-lands`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error fetching lands:", error.response?.data || error.message);
        throw error;
    }
};


export const updateProperty = async (propertyId, updatedData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/api/update-property/${propertyId}`, updatedData, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error updating property:", error.response?.data || error.message);
        throw error;
    }
};

export const cancelPropertyListing = async (propertyId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/api/delete-property/${propertyId}`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error deleting property:", error.response?.data || error.message);
        throw error;
    }
};

export const fetchBuyerOffersbyId = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/land-offers-id`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error fetching buyer offers:", error.response?.data || error.message);
        throw error;
    }
};
export const fetchBuyerOffers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/land-offers`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error fetching buyer offers:", error.response?.data || error.message);
        throw error;
    }
};

// Seller Actions
export const sellerAcceptOffer = async (offerId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/land-offers/${offerId}/accept`,{offerId}, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error accepting buyer offer:", error.response?.data || error.message);
        throw error;
    }
};

export const sellerRejectOffer = async (offerId, propertyId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/land-offers/${offerId}/reject`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error rejecting buyer offer:", error.response?.data || error.message);
        throw error;
    }
};

// Buyer Actions
export const makeOffer = async (landId, offerPrice, notes, walletAddress) => {
    try {
        const escrowAmount = offerPrice;
        console.log(walletAddress) // Assuming escrow is 10% of the offer price
        const response = await axios.post(
            `${API_BASE_URL}/api/offers`,
            { landId, offerPrice,escrowAmount, notes , walletAddress },
            getAuthConfig()
        );
        return response.data; // Expected to include offer details like offerId and offerPrice
    } catch (error) {
        console.error("Error making offer:", error.response?.data || error.message);
        throw error;
    }
};

// Update an existing offer (if the buyer wishes to modify their pending offer)
export const updateOffer = async (offerId, offerPrice, notes, escrowAmount, walletAddress) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/api/offers/${offerId}`,
            { offerPrice, notes, escrowAmount, walletAddress },
            getAuthConfig()
        );
        return response.data;
    } catch (error) {
        console.error("Error updating offer:", error.response?.data || error.message);
        throw error;
    }
};

// Cancel an offer (removes the buyer's pending offer)
export const cancelOffer = async (offerId) => {
    try {
        const response = await axios.delete(
            `${API_BASE_URL}/api/offers/${offerId}`,
            getAuthConfig()
        );
        return response.data;
    } catch (error) {
        console.error("Error canceling offer:", error.response?.data || error.message);
        throw error;
    }
};


export const fetchUnverifiedLands = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/lands/unverified`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error fetching unverified lands:", error.response?.data || error.message);
        throw error;
    }
};

export const confirmLandVerification = async (landId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/transactions/validate`, {landId}, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error confirming land verification:", error.response?.data || error.message);
        throw error;
    }
};

export const rejectLandVerification = async (landId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/api/lands/${landId}`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error rejecting land verification:", error.response?.data || error.message);
        throw error;
    }
};




export const fetchTransactionHistory = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/transaction-history`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error fetching transaction history:", error.response?.data || error.message);
        throw error;
    }
};

export const getPendingTransactions = async (offerId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/transactions/pending`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error('Error fetching pending transactions:', error);
        return [];
    }
};

export const validateTransaction = async (transactionId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/transactions/${transactionId}/validate`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error('Error validating transaction:', error);
        throw error;
    }
};

export const rejectValidation = async (transactionId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/transactions/${transactionId}/reject-validation`, {}, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error('Error rejecting transaction validation:', error);
        throw error;
    }
};

export const approveTransaction = async (transactionId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/transactions/${transactionId}/approve`, {}, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error approving transaction:", error.response?.data || error.message);
        throw error;
    }
};

export const rejectTransaction = async (transactionId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/transactions/${transactionId}/reject`, {}, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error rejecting transaction:", error.response?.data || error.message);
        throw error;
    }
};

export const fetchBuyerStats = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/buyer-stats`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error fetching buyer stats:", error.response?.data || error.message);
        throw error;
    }
};

// Fetch seller dashboard statistics (active listings, offers received, transactions in progress, completed sales, escrow overview)
export const fetchSellerStats = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/seller-stats`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error fetching seller stats:", error.response?.data || error.message);
        throw error;
    }
};

// Fetch inspector dashboard statistics (pending verifications, validated transactions, rejected validations)
export const fetchInspectorStats = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/inspector-stats`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error fetching inspector stats:", error.response?.data || error.message);
        throw error;
    }
};





export const sendEscrowToSellerAPI = async ( tId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/send-escrow`, { tId }, getAuthConfig());
      return response.data;
    } catch (error) {
      console.error('Error sending escrow to seller:', error);
      throw error;
    }
  };