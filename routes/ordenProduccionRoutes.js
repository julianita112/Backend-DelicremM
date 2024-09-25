const express = require('express');
const router = express.Router();
const ordenProduccionController = require('../controllers/ordenProduccionController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas con parámetro id deben ir antes que rutas más generales
router.get('/:id/ventas_asociadas', authMiddleware.verifyToken, ordenProduccionController.obtenerVentasPorOrden);
router.get('/todas_ventas_asociadas', authMiddleware.verifyToken, ordenProduccionController.obtenerTodasLasOrdenesVenta);

// Otras rutas...
router.post('/',  ordenProduccionController.crearOrdenProduccion);
router.post('/:id/producir',  ordenProduccionController.producirOrdenProduccion);
router.get('/',  ordenProduccionController.obtenerOrdenesProduccion);
router.get('/producidas',  ordenProduccionController.obtenerOrdenesProducidas);
router.get('/inactivas', ordenProduccionController.obtenerOrdenesInactivas);
router.get('/:id',  ordenProduccionController.obtenerOrdenProduccionPorId);
router.put('/:id', ordenProduccionController.actualizarOrdenProduccion);
router.put('/:id/mover',  ordenProduccionController.moverOrdenProduccion);
router.patch('/:id/activo',  ordenProduccionController.actualizarEstadoActivoOrdenProduccion);
router.put('/:id/estado',  ordenProduccionController.actualizarEstadoProcesoOrdenProduccion);

module.exports = router;
