const express = require('express');
const router = express.Router();
const detallePedidoController = require('../controllers/detallePedidoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/',  detallePedidoController.crearDetallePedido);
router.get('/', detallePedidoController.obtenerDetallesPedido);
router.get('/:id',  detallePedidoController.obtenerDetallePedidoPorId);
router.put('/:id', detallePedidoController.actualizarDetallePedido);
router.delete('/:id', detallePedidoController.eliminarDetallePedido);

module.exports = router;
