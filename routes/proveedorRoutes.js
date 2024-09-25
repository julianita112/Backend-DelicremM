const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/',  proveedorController.crearProveedor);
router.get('/activos',  proveedorController.obtenerProveedoresActivos);
router.get('/',  proveedorController.obtenerProveedores);
router.get('/:id', proveedorController.obtenerProveedorPorId);
router.put('/:id',  proveedorController.actualizarProveedor);
router.delete('/:id', proveedorController.eliminarProveedor);
router.patch('/:id/estado', proveedorController.cambiarEstadoProveedor);

module.exports = router;
