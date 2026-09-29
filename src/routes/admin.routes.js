import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller.js';

const router = Router();

// Rutas de Usuarios
router.post('/usuarios', AdminController.crearUsuario);
router.get('/usuarios', AdminController.listarUsuarios);

// Rutas de Productos
router.post('/productos', AdminController.crearProducto);
router.get('/productos', AdminController.listarProductos);

export default router;
