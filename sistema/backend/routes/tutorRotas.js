import express from 'express';
import TutorController from '../controllers/TutorController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, TutorController.listarTodos);
router.post('/', authMiddleware, TutorController.criar);

export default router;
