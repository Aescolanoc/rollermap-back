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
import { isAuthor, loginRequired } from '../middlewares/interceptors.js';
const router = express.Router();

router.get('/', loginRequired, getAllRollerPlaces);
router.post('/', loginRequired, insertRollerPlace);
router.get('/myrollerplaces', loginRequired, getMyRollerPlaces);
router.get('/:id', loginRequired, getRollerPlaceDetails);
router.patch('/:id', loginRequired, addToFavorites);
router.put('/:id', loginRequired, isAuthor, updateRollerPlace);
router.delete('/:id', loginRequired, deleteRollerPlace);

export default router;
