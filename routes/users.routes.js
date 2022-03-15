import express from 'express';
const router = express.Router();
import { insertUser, updateUser } from '../controllers/user.controller.js';
import { loginRequired } from '../middlewares/interceptors.js';

router.post('/', insertUser);
router.patch('/:id', loginRequired, updateUser);

export default router;
