import express from 'express';
import {
  getAllRollerPlaces,
  getMyRollerPlaces,
  getRollerPlaceDetails,
} from '../controllers/rollerplace.controller.js';
const router = express.Router();

router.get('/', getAllRollerPlaces);
router.get('/myrollerplaces', getMyRollerPlaces);
router.get('/:id', getRollerPlaceDetails);
// router.patch('/:id', updateRollerPlaceDetails)
// router.delete('/:id', deleteRollerPlaceDetails)

export default router;
