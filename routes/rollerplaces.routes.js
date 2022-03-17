import express from 'express';
import {
  getAllRollerPlaces,
  getMyRollerPlaces,
  getRollerPlaceDetails,
  updateRollerPlace,
  deleteRollerPlace,
  insertRollerPlace,
  toggleFavorites,
} from '../controllers/rollerplace.controller.js';
import { isAuthor, loginRequired } from '../middlewares/interceptors.js';
const router = express.Router();

router.get('/', loginRequired, getAllRollerPlaces);
router.post('/', loginRequired, insertRollerPlace);
router.get('/myrollerplaces', loginRequired, getMyRollerPlaces);
router.get('/:id', loginRequired, getRollerPlaceDetails);
router.patch('/:id', loginRequired, toggleFavorites);
router.put('/:id', loginRequired, isAuthor, updateRollerPlace);
router.delete('/:id', loginRequired, isAuthor, deleteRollerPlace);

export default router;
