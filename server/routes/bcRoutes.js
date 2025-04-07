// routes/landRegistryRoutes.js
import express from 'express';
import controller from '../controllers/landRegsitryController.js';

const router = express.Router();
// PROPERTY MANAGEMENT ENDPOINTS
router.post('/properties', controller.listProperty);
router.put('/properties', controller.updateProperty);
router.delete('/properties', controller.cancelPropertyListing);
router.get('/properties/active', controller.getActiveProperties);

// OFFER MANAGEMENT ENDPOINTS
router.post('/offers', controller.submitOffer);
router.delete('/offers', controller.cancelOffer);
router.post('/offers/accept', controller.sellerAcceptOffer);
router.post('/offers/:offerId/fund', controller.depositEscrowFunds);
router.post('/offers/reject', controller.sellerRejectOffer);
router.post('/offers/inspectorApprove', controller.inspectorApproveOffer);
router.post('/offers/govtApprove', controller.govtApproveOffer);
router.post('/offers/govtReject', controller.govtRejectOffer);
router.get('/offers/property/:propertyId', controller.getOffersForProperty);
router.get('/offers/best/:propertyId', controller.getBestOffer);

// USER TRANSACTION TRACKING ENDPOINTS
router.get('/transactions/:userAddress', controller.getUserTransactions);
router.get('/transactions/:userAddress/:start/:count', controller.getUserTransactionsPaginated);

export default router;
