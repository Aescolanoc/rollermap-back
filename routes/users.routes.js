import express from 'express';
const router = express.Router();
import { insertUser, updateUser } from '../controllers/user.controller.js';

router.post('/', insertUser);
router.patch('/:id', updateUser);

export default router;
