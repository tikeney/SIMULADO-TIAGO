import express from 'express';
import ConsultaController from '../controllers/ConsultaController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, ConsultaController.listar);
router.post('/', authMiddleware, ConsultaController.agendar);
router.delete('/:id', authMiddleware, ConsultaController.cancelar);

export default router;
