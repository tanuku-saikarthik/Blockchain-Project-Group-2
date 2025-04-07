import express from 'express';
import { authenticate, fetchLandsbyId } from '../controllers/landController.js';
import { addLand, fetchLands, updateProperty, cancelPropertyListing } from '../controllers/landController.js';

const router = express.Router();

router.post('/add-land', authenticate, addLand);
router.get('/lands', authenticate, fetchLandsbyId);
router.get('/all-lands', authenticate, fetchLands); // Fetch all lands for admin or public view
router.put('/update-property/:propertyId', authenticate, updateProperty);
router.delete('/delete-property/:propertyId', authenticate, cancelPropertyListing);

export default router;
