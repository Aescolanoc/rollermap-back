import express from 'express';
const router = express.Router();
import { login } from '../controllers/login.controller.js';
import { loginRequired } from '../middlewares/interceptors.js';

router.post('/', loginRequired, login);

export default router;
