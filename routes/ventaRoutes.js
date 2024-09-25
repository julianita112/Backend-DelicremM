const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', ventaController.crearVenta);
router.get('/activos',  ventaController.obtenerVentasActivas);
router.get('/', ventaController.obtenerVentas);
router.get('/:id',  ventaController.obtenerVentaPorId);
router.put('/:id', ventaController.actualizarVenta);
router.put('/:id/estado', ventaController.actualizarEstadoVenta);
router.delete('/:id',  ventaController.eliminarVenta);
router.patch('/:id/estado',  ventaController.cambiarEstadoActivoVenta);

module.exports = router;
