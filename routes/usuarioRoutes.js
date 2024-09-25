const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/registro', usuarioController.registrarUsuario);
router.post('/login', usuarioController.loginUsuario);
router.post('/recuperar_contrasena', usuarioController.recuperarContrasena);
router.post('/cambiar_contrasena', usuarioController.resetPassword);

// Rutas protegidas
router.get('/',  usuarioController.obtenerUsuarios);
router.get('/activos',  usuarioController.obtenerUsuariosActivos);
router.get('/:id',  usuarioController.obtenerUsuarioPorId);
router.put('/:id', usuarioController.actualizarUsuario);
router.delete('/:id',  usuarioController.eliminarUsuario);
router.patch('/:id/estado',  usuarioController.cambiarEstadoUsuario);

module.exports = router;

