// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000'; // Update this if your backend is deployed

// // Helper function to get the authorization config
// const getAuthConfig = () => {
//     // Assume token is stored in localStorage after login
//     const token = localStorage.getItem('token');
//     return {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };
// };

// // Function to add a new land (requires authentication)
// export const addLand = async (formData) => {
//     try {
//         const config = {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//                 ...getAuthConfig().headers,
//             },
//         };
//         const response = await axios.post(
//             `${API_BASE_URL}/api/add-land`,
//             formData,
//             config
//         );
//         return response;
//     } catch (error) {
//         console.error("Error while adding land:", error);
//         throw error;
//     }
// };

// // Register a new user (no token needed)
// export const registerUser = async (userData) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/api/register`, userData);
//         return response.data;
//     } catch (error) {
//         console.error('Error registering user:', error.response?.data || error.message);
//         throw error;
//     }
// };

// // Fetch user details by ID (requires authentication)
// export const getUser = async (userId) => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/api/user/${userId}`, getAuthConfig());
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching user:', error.response?.data || error.message);
//         throw error;
//     }
// };

// // Login a user (no token needed)
// export const loginUser = async (credentials) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/api/login`, credentials);
//         return response.data;
//     } catch (error) {
//         console.error('Error logging in:', error.response?.data || error.message);
//         throw error;
//     }
// };

// // Fetch all lands (requires authentication)
// export const fetchLands = async () => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/api/lands`, getAuthConfig());
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching lands:", error.response?.data || error.message);
//         throw error;
//     }
// };

// // Update an existing property (requires authentication)
// export const updateProperty = async (propertyId, updatedData) => {
//     try {
//         const response = await axios.put(`${API_BASE_URL}/api/update-property/${propertyId}`, updatedData, getAuthConfig());
//         return response.data;
//     } catch (error) {
//         console.error("Error updating property:", error.response?.data || error.message);
//         throw error;
//     }
// };

// // Cancel (delete) a property listing (requires authentication)
// export const cancelPropertyListing = async (propertyId) => {
//     try {
//         const response = await axios.delete(`${API_BASE_URL}/api/delete-property/${propertyId}`, getAuthConfig());
//         return response.data;
//     } catch (error) {
//         console.error("Error deleting property:", error.response?.data || error.message);
//         throw error;
//     }
// };

// // Fetch all buyer offers (requires authentication)
// export const fetchBuyerOffers = async () => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/api/buyer-offers`, getAuthConfig());
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching buyer offers:", error.response?.data || error.message);
//         throw error;
//     }
// };

// // Seller accepts an offer (requires offerId and propertyId, needs authentication)
// export const sellerAcceptOffer = async (offerId, propertyId) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/api/buyer-offers/${offerId}/accept`, { propertyId }, getAuthConfig());
//         return response.data;
//     } catch (error) {
//         console.error("Error accepting buyer offer:", error.response?.data || error.message);
//         throw error;
//     }
// };

// // Seller rejects an offer (requires offerId and propertyId, needs authentication)
// export const sellerRejectOffer = async (offerId, propertyId) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/api/buyer-offers/${offerId}/reject`, { propertyId }, getAuthConfig());
//         return response.data;
//     } catch (error) {
//         console.error("Error rejecting buyer offer:", error.response?.data || error.message);
//         throw error;
//     }
// };

// // Fetch the user profile based on the logged-in user (requires authentication)
// export const fetchUserProfile = async () => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/api/profile`, getAuthConfig());
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching user profile:", error.response?.data || error.message);
//         throw error;
//     }
// };

// // Fetch the transaction history for the logged-in user
// export const fetchTransactionHistory = async () => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/api/transaction-history`, getAuthConfig());
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching transaction history:", error.response?.data || error.message);
//         throw error;
//     }
// };

// // Fetch all lands that have not yet been verified (pending verification)
// export const fetchUnverifiedLands = async () => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/api/lands/unverified`, getAuthConfig());
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching unverified lands:", error.response?.data || error.message);
//         throw error;
//     }
// };

// // Confirm a land verification by updating its status to verified
// export const confirmLandVerification = async (landId) => {
//     try {
//         // Assumes your backend has an endpoint to update verification status
//         const response = await axios.put(`${API_BASE_URL}/api/lands/verify/${landId}`, {}, getAuthConfig());
//         return response.data;
//     } catch (error) {
//         console.error("Error confirming land verification:", error.response?.data || error.message);
//         throw error;
//     }
// };

// // Reject a land verification by deleting the land from the database
// export const rejectLandVerification = async (landId) => {
//     try {
//         // Assumes your backend has an endpoint to delete a land record
//         const response = await axios.delete(`${API_BASE_URL}/api/lands/${landId}`, getAuthConfig());
//         return response.data;
//     } catch (error) {
//         console.error("Error rejecting land verification:", error.response?.data || error.message);
//         throw error;
//     }
// };

// export const getPendingTransactions = async () => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/api/transactions/pending`, getAuthConfig());
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching pending transactions:', error);
//         return [];
//     }
// };

// export const validateTransaction = async (transactionId) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/api/transactions/${transactionId}/validate`, {}, getAuthConfig());
//         return response.data;
//     } catch (error) {
//         console.error('Error validating transaction:', error);
//         throw error;
//     }
// };

// export const rejectValidation = async (transactionId) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/api/transactions/${transactionId}/reject-validation`, {}, getAuthConfig());
//         return response.data;
//     } catch (error) {
//         console.error('Error rejecting transaction validation:', error);
//         throw error;
//     }
// };

// // Fetch validated transactions (including inspector data)
// export const getValidatedTransactions = async () => {
//     try {
//         const response = await axios.get(
//             `${API_BASE_URL}/api/transactions/validated`,
//             getAuthConfig()
//         );
//         return response.data;
//     } catch (error) {
//         console.error(
//             "Error fetching validated transactions:",
//             error.response?.data || error.message
//         );
//         throw error;
//     }
// };

// // Approve a transaction
// export const approveTransaction = async (transactionId) => {
//     try {
//         const response = await axios.post(
//             `${API_BASE_URL}/api/transactions/${transactionId}/approve`,
//             {},
//             getAuthConfig()
//         );
//         return response.data;
//     } catch (error) {
//         console.error(
//             "Error approving transaction:",
//             error.response?.data || error.message
//         );
//         throw error;
//     }
// };

// // Reject a transaction
// export const rejectTransaction = async (transactionId) => {
//     try {
//         const response = await axios.post(
//             `${API_BASE_URL}/api/transactions/${transactionId}/reject`,
//             {},
//             getAuthConfig()
//         );
//         return response.data;
//     } catch (error) {
//         console.error(
//             "Error rejecting transaction:",
//             error.response?.data || error.message
//         );
//         throw error;
//     }
// };

// // Make an offer on a land property (creates a new offer)
// export const makeOffer = async (landId, offerPrice) => {
//     try {
//         const response = await axios.post(
//             `${API_BASE_URL}/api/offers`,
//             { landId, offerPrice },
//             getAuthConfig()
//         );
//         return response.data; // Expected to include offer details, like offerId and offerPrice
//     } catch (error) {
//         console.error("Error making offer:", error.response?.data || error.message);
//         throw error;
//     }
// };

// // Update an existing offer (if the buyer wishes to modify their pending offer)
// export const updateOffer = async (offerId, offerPrice) => {
//     try {
//         const response = await axios.put(
//             `${API_BASE_URL}/api/offers/${offerId}`,
//             { offerPrice },
//             getAuthConfig()
//         );
//         return response.data;
//     } catch (error) {
//         console.error("Error updating offer:", error.response?.data || error.message);
//         throw error;
//     }
// };

// // Cancel an offer (removes the buyer's pending offer)
// export const cancelOffer = async (offerId) => {
//     try {
//         const response = await axios.delete(
//             `${API_BASE_URL}/api/offers/${offerId}`,
//             getAuthConfig()
//         );
//         return response.data;
//     } catch (error) {
//         console.error("Error canceling offer:", error.response?.data || error.message);
//         throw error;
//     }
// };

// // Fetch purchases for the logged-in buyer
// export const fetchPurchases = async () => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/api/purchases`, getAuthConfig());
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching purchases:", error.response?.data || error.message);
//         throw error;
//     }
// };

// // Deposit escrow funds for a purchase
// export const depositEscrowFunds = async (purchaseId, depositAmount) => {
//     try {
//         const response = await axios.post(
//             `${API_BASE_URL}/api/escrow-deposit`,
//             { purchaseId, depositAmount },
//             getAuthConfig()
//         );
//         return response.data;
//     } catch (error) {
//         console.error("Error depositing escrow funds:", error.response?.data || error.message);
//         throw error;
//     }
// };















/*import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Update this if your backend is deployed

// Helper function to get the authorization config
const getAuthConfig = () => {
    // Assume token is stored in localStorage after login
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// Function to add a new land (requires authentication)
export const addLand = async (formData) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...getAuthConfig().headers,
            },
        };
        const response = await axios.post(
            `${API_BASE_URL}/api/add-land`,
            formData,
            config
        );
        return response;
    } catch (error) {
        console.error("Error while adding land:", error);
        throw error;
    }
};

// Register a new user (no token needed)
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error.response?.data || error.message);
        throw error;
    }
};

// Fetch user details by ID (requires authentication)
export const getUser = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/user/${userId}`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error.response?.data || error.message);
        throw error;
    }
};

// Login a user (no token needed)
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/login`, credentials);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error.response?.data || error.message);
        throw error;
    }
};

// Fetch all lands (requires authentication)
export const fetchLands = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/lands`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error fetching lands:", error.response?.data || error.message);
        throw error;
    }
};

// Update an existing property (requires authentication)
export const updateProperty = async (propertyId, updatedData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/api/update-property/${propertyId}`, updatedData, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error updating property:", error.response?.data || error.message);
        throw error;
    }
};

// Cancel (delete) a property listing (requires authentication)
export const cancelPropertyListing = async (propertyId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/api/delete-property/${propertyId}`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error deleting property:", error.response?.data || error.message);
        throw error;
    }
};

// Fetch all buyer offers (requires authentication)
export const fetchBuyerOffers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/buyer-offers`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error fetching buyer offers:", error.response?.data || error.message);
        throw error;
    }
};

// Seller accepts an offer (requires offerId and propertyId, needs authentication)
export const sellerAcceptOffer = async (offerId, propertyId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/buyer-offers/${offerId}/accept`, { propertyId }, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error accepting buyer offer:", error.response?.data || error.message);
        throw error;
    }
};

// Seller rejects an offer (requires offerId and propertyId, needs authentication)
export const sellerRejectOffer = async (offerId, propertyId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/buyer-offers/${offerId}/reject`, { propertyId }, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error rejecting buyer offer:", error.response?.data || error.message);
        throw error;
    }
};

// Fetch the user profile based on the logged-in user (requires authentication)
export const fetchUserProfile = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/profile`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error.response?.data || error.message);
        throw error;
    }
};

// Fetch the transaction history for the logged-in user
export const fetchTransactionHistory = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/transaction-history`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error fetching transaction history:", error.response?.data || error.message);
        throw error;
    }
};

// Fetch all lands that have not yet been verified (pending verification)
export const fetchUnverifiedLands = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/lands/unverified`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error fetching unverified lands:", error.response?.data || error.message);
        throw error;
    }
};

// Confirm a land verification by updating its status to verified
export const confirmLandVerification = async (landId) => {
    try {
        // Assumes your backend has an endpoint to update verification status
        const response = await axios.put(`${API_BASE_URL}/api/lands/verify/${landId}`, {}, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error confirming land verification:", error.response?.data || error.message);
        throw error;
    }
};

// Reject a land verification by deleting the land from the database
export const rejectLandVerification = async (landId) => {
    try {
        // Assumes your backend has an endpoint to delete a land record
        const response = await axios.delete(`${API_BASE_URL}/api/lands/${landId}`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error rejecting land verification:", error.response?.data || error.message);
        throw error;
    }
};

export const getPendingTransactions = async () => {
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
        const response = await axios.post(`${API_BASE_URL}/api/transactions/${transactionId}/validate`, {}, getAuthConfig());
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

// Fetch validated transactions (including inspector data)
export const getValidatedTransactions = async () => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/api/transactions/validated`,
            getAuthConfig()
        );
        return response.data;
    } catch (error) {
        console.error(
            "Error fetching validated transactions:",
            error.response?.data || error.message
        );
        throw error;
    }
};

// Approve a transaction
export const approveTransaction = async (transactionId) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/transactions/${transactionId}/approve`,
            {},
            getAuthConfig()
        );
        return response.data;
    } catch (error) {
        console.error(
            "Error approving transaction:",
            error.response?.data || error.message
        );
        throw error;
    }
};

// Reject a transaction
export const rejectTransaction = async (transactionId) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/transactions/${transactionId}/reject`,
            {},
            getAuthConfig()
        );
        return response.data;
    } catch (error) {
        console.error(
            "Error rejecting transaction:",
            error.response?.data || error.message
        );
        throw error;
    }
};

// Make an offer on a land property (creates a new offer)
// Updated to include escrow deposit, buyer notes, and wallet address
export const makeOffer = async (landId, offerPrice, notes, escrowAmount, walletAddress) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/offers`,
            { landId, offerPrice, notes, escrowAmount, walletAddress },
            getAuthConfig()
        );
        return response.data; // Expected to include offer details, like offerId and offerPrice
    } catch (error) {
        console.error("Error making offer:", error.response?.data || error.message);
        throw error;
    }
};

// Update an existing offer (if the buyer wishes to modify their pending offer)
// Updated to include escrow deposit, buyer notes, and wallet address
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

// Fetch purchases for the logged-in buyer
export const fetchPurchases = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/purchases`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error fetching purchases:", error.response?.data || error.message);
        throw error;
    }
};

// Deposit escrow funds for a purchase (if needed separately)
// You can deprecate this if escrow is integrated into the offer process
export const depositEscrowFunds = async (purchaseId, depositAmount) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/escrow-deposit`,
            { purchaseId, depositAmount },
            getAuthConfig()
        );
        return response.data;
    } catch (error) {
        console.error("Error depositing escrow funds:", error.response?.data || error.message);
        throw error;
    }
};

// Fetch buyer dashboard statistics (active offers, escrow funds, completed purchases, pending transactions)
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
*/



import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Update this if your backend is deployed

// Helper function to get the authorization config
const getAuthConfig = () => {
    // Assume token is stored in localStorage after login
    const token = localStorage.getItem('token');
    console.log("Token:", token); // Debugging line to check the token value
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// Function to add a new land (requires authentication)
export const addLand = async (formData) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...getAuthConfig()?.headers, // Ensure headers exist
            },
        };
        
        if (!config.headers.Authorization) {
            throw new Error("Authorization token is missing.");
        }

        const response = await axios.post(
            `${API_BASE_URL}/api/add-land`,
            formData,
            config
        );
        return response;
    } catch (error) {
        console.error("Error while adding land:", error);
        throw error;
    }
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

// Register a new user (no token needed)
/*export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error.response?.data || error.message);
        throw error;
    }
};
*/
// Fetch user details by ID (requires authentication)
export const getUser = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/user/${userId}`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error.response?.data || error.message);
        throw error;
    }
};

// Login a user (no token needed)
/*export const loginUser = async (credentials) => {
    try {
        console.log(credentials);
        const response = await axios.post(`${API_BASE_URL}/api/login`, credentials);
        return response.data;
    } catch (error) {


    
        console.error('Error logging in:', error.response?.data || error.message);
        throw error;
    }
};
*/
// Fetch all lands (requires authentication)
export const fetchLands = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/lands`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error fetching lands:", error.response?.data || error.message);
        throw error;
    }
};

// Update an existing property (requires authentication)
export const updateProperty = async (propertyId, updatedData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/api/update-property/${propertyId}`, updatedData, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error updating property:", error.response?.data || error.message);
        throw error;
    }
};

// Cancel (delete) a property listing (requires authentication)
export const cancelPropertyListing = async (propertyId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/api/delete-property/${propertyId}`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error deleting property:", error.response?.data || error.message);
        throw error;
    }
};

// Fetch all buyer offers (requires authentication)
export const fetchBuyerOffers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/buyer-offers`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error fetching buyer offers:", error.response?.data || error.message);
        throw error;
    }
};

// Seller accepts an offer (requires offerId and propertyId, needs authentication)
export const sellerAcceptOffer = async (offerId, propertyId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/buyer-offers/${offerId}/accept`, { propertyId }, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error accepting buyer offer:", error.response?.data || error.message);
        throw error;
    }
};

// Seller rejects an offer (requires offerId and propertyId, needs authentication)
export const sellerRejectOffer = async (offerId, propertyId) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/buyer-offers/${offerId}/reject`, { propertyId }, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error rejecting buyer offer:", error.response?.data || error.message);
        throw error;
    }
};

// Fetch the user profile based on the logged-in user (requires authentication)
export const fetchUserProfile = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/profile`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error.response?.data || error.message);
        throw error;
    }
};

// Fetch the transaction history for the logged-in user
export const fetchTransactionHistory = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/transaction-history`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error fetching transaction history:", error.response?.data || error.message);
        throw error;
    }
};

// Fetch all lands that have not yet been verified (pending verification)
export const fetchUnverifiedLands = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/lands/unverified`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error fetching unverified lands:", error.response?.data || error.message);
        throw error;
    }
};

// Confirm a land verification by updating its status to verified
export const confirmLandVerification = async (landId) => {
    try {
        // Assumes your backend has an endpoint to update verification status
        const response = await axios.put(`${API_BASE_URL}/api/lands/verify/${landId}`, {}, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error confirming land verification:", error.response?.data || error.message);
        throw error;
    }
};

// Reject a land verification by deleting the land from the database
export const rejectLandVerification = async (landId) => {
    try {
        // Assumes your backend has an endpoint to delete a land record
        const response = await axios.delete(`${API_BASE_URL}/api/lands/${landId}`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error rejecting land verification:", error.response?.data || error.message);
        throw error;
    }
};

export const getPendingTransactions = async () => {
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
        const response = await axios.post(`${API_BASE_URL}/api/transactions/${transactionId}/validate`, {}, getAuthConfig());
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

// Fetch validated transactions (including inspector data)
export const getValidatedTransactions = async () => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/api/transactions/validated`,
            getAuthConfig()
        );
        return response.data;
    } catch (error) {
        console.error(
            "Error fetching validated transactions:",
            error.response?.data || error.message
        );
        throw error;
    }
};

// Approve a transaction
export const approveTransaction = async (transactionId) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/transactions/${transactionId}/approve`,
            {},
            getAuthConfig()
        );
        return response.data;
    } catch (error) {
        console.error(
            "Error approving transaction:",
            error.response?.data || error.message
        );
        throw error;
    }
};

// Reject a transaction
export const rejectTransaction = async (transactionId) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/transactions/${transactionId}/reject`,
            {},
            getAuthConfig()
        );
        return response.data;
    } catch (error) {
        console.error(
            "Error rejecting transaction:",
            error.response?.data || error.message
        );
        throw error;
    }
};

// Make an offer on a land property (creates a new offer)
// Updated to include escrow deposit, buyer notes, and wallet address
export const makeOffer = async (landId, offerPrice, notes, escrowAmount, walletAddress) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/offers`,
            { landId, offerPrice, notes, escrowAmount, walletAddress },
            getAuthConfig()
        );
        return response.data; // Expected to include offer details, like offerId and offerPrice
    } catch (error) {
        console.error("Error making offer:", error.response?.data || error.message);
        throw error;
    }
};

// Update an existing offer (if the buyer wishes to modify their pending offer)
// Updated to include escrow deposit, buyer notes, and wallet address
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

// Fetch purchases for the logged-in buyer
export const fetchPurchases = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/purchases`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error fetching purchases:", error.response?.data || error.message);
        throw error;
    }
};

// Deposit escrow funds for a purchase (if needed separately)
// You can deprecate this if escrow is integrated into the offer process
export const depositEscrowFunds = async (purchaseId, depositAmount) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/escrow-deposit`,
            { purchaseId, depositAmount },
            getAuthConfig()
        );
        return response.data;
    } catch (error) {
        console.error("Error depositing escrow funds:", error.response?.data || error.message);
        throw error;
    }
};

// Fetch buyer dashboard statistics (active offers, escrow funds, completed purchases, pending transactions)
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

export const fetchGovStats = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/gov-stats`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error("Error fetching government stats:", error.response?.data || error.message);
        throw error;
    }
};

