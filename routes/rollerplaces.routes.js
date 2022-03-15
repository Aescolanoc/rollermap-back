import express from 'express';
import {
  getAllRollerPlaces,
  getMyRollerPlaces,
  getRollerPlaceDetails,
  updateRollerPlace,
  deleteRollerPlace,
  insertRollerPlace,
  addToFavorites,
} from '../controllers/rollerplace.controller.js';
const router = express.Router();

router.get('/', getAllRollerPlaces);
router.post('/', insertRollerPlace);
router.get('/myrollerplaces', getMyRollerPlaces);
router.get('/:id', getRollerPlaceDetails);
router.patch('/:id', addToFavorites);
router.put('/:id', updateRollerPlace);
router.delete('/:id', deleteRollerPlace);

export default router;
