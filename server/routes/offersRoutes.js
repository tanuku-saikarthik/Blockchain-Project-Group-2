  // routes/offersRoutes.js
  import express from 'express';
  import {
    createOffer,

    cancelOffer,
    getBuyerOffers,
    acceptOffer,
    rejectOffer,
    fetchBuyerOffersbyId,
  } from '../controllers/offersController.js';
  import { authenticate } from '../controllers/landController.js';

  const router = express.Router();

  router.post('/offers', authenticate,  createOffer);
  //router.put('/offers/:offerId', authenticate, checkPermission('Request Ownership'), updateOffer);
  router.delete('/offers/:offerId', authenticate,  cancelOffer);
  router.get('/land-offers-id', authenticate, fetchBuyerOffersbyId);
  router.get('/land-offers', authenticate, getBuyerOffers);
  router.post('/land-offers/:offerId/accept', acceptOffer);
  router.post('/land-offers/:offerId/reject', rejectOffer);

  export default router;
