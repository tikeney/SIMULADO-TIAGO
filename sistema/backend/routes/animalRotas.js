import express from 'express';
import AnimalController from '../controllers/AnimalController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/tutor/:tutor_id', authMiddleware, AnimalController.listarPorTutor);
router.post('/', authMiddleware, AnimalController.criar);

export default router;
