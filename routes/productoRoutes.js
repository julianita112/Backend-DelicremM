const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/',  productoController.crearProducto);
router.post('/producir',  productoController.producirProducto); // Nueva ruta para producción
router.get('/activos', productoController.obtenerProductosActivos);
router.get('/',  productoController.obtenerProductos);
router.get('/:id',  productoController.obtenerProductoPorId);
router.put('/:id',  productoController.actualizarProducto);
router.delete('/:id',  productoController.eliminarProducto);
router.patch('/:id/estado',  productoController.actualizarEstadoProducto);

module.exports = router;
