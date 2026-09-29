import { Router } from 'express';
import { PedidoController } from '../controllers/pedido.controller.js';

const router = Router();

router.post('/pedidos', PedidoController.crearPedido);

export default router;
