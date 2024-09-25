const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/',  pedidoController.crearPedido);
router.get('/', pedidoController.obtenerPedidos);
router.get('/activos', pedidoController.obtenerPedidosActivos);
router.get('/:id', pedidoController.obtenerPedidoPorId);
router.put('/:id',  pedidoController.actualizarPedido);
router.put('/:numero_pedido/estado', authMiddleware.verifyToken, pedidoController.actualizarEstadoPedido);
router.patch('/:id/estado',  pedidoController.actualizarEstadoActivoPedido);
router.delete('/:id',  pedidoController.eliminarPedido);


module.exports = router;
