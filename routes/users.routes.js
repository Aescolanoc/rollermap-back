import express from 'express';
const router = express.Router();
import {
  insertUser,
  updateUser,
  getUser,
} from '../controllers/user.controller.js';
import {
  loginRequired,
  loggedUserRequired,
} from '../middlewares/interceptors.js';

router.post('/', insertUser);
router.get('/:id', loginRequired, loggedUserRequired, getUser);
router.patch('/:id', loginRequired, loggedUserRequired, updateUser);

export default router;
