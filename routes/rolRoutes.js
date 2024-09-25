const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware.verifyToken, rolController.crearRol);
router.get('/activos', authMiddleware.verifyToken, rolController.obtenerRolesActivos);
router.get('/', authMiddleware.verifyToken, rolController.obtenerRoles);
router.get('/:id', authMiddleware.verifyToken, rolController.obtenerRolPorId);
router.put('/:id', authMiddleware.verifyToken, rolController.actualizarRol);
router.delete('/:id', authMiddleware.verifyToken, rolController.eliminarRol);
router.patch('/:id/estado', authMiddleware.verifyToken, rolController.cambiarEstadoRol);

module.exports = router;
