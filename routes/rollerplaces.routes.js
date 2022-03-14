import express from 'express';
import {
  getAllRollerPlaces,
  getMyRollerPlaces,
  getRollerPlaceDetails,
  updateRollerPlace,
  deleteRollerPlace,
} from '../controllers/rollerplace.controller.js';
const router = express.Router();

router.get('/', getAllRollerPlaces);
router.get('/myrollerplaces', getMyRollerPlaces);
router.get('/:id', getRollerPlaceDetails);
router.patch('/:id', updateRollerPlace);
router.delete('/:id', deleteRollerPlace);

export default router;
