const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verificarToken, requerirRol } = require('../middlewares/authMiddleware');

// --- Rutas Públicas ---
router.post('/registro', authController.register);
router.post('/login', authController.login);

// --- Rutas Protegidas ---
router.get('/perfil', verificarToken, (req, res) => {
    res.json({ mensaje: 'Bienvenido a tu perfil', tuId: req.usuario.id, tuRol: req.usuario.rol });
});

// --- Rutas Protegidas y Autorizadas ---
router.post('/articulos', verificarToken, requerirRol(['EDITOR', 'ADMIN']), (req, res) => {
    res.json({ mensaje: 'Artículo creado exitosamente' });
});

router.delete('/usuarios/:id', verificarToken, requerirRol(['ADMIN']), (req, res) => {
    res.json({ mensaje: `Usuario eliminado por un administrador` });
});

module.exports = router;
