import express from 'express';
import AuthController from '../controllers/AuthController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', AuthController.login);
router.get('/perfil', authMiddleware, AuthController.obterPerfil);

export default router;
