const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/',  compraController.obtenerCompras);
router.post('/',  compraController.crearCompra);
router.get('/:id',  compraController.obtenerCompraPorId);
router.put('/:id',  compraController.actualizarCompra);
router.delete('/:id', compraController.eliminarCompra);
router.patch('/:id/estado', compraController.actualizarEstadoCompra);


module.exports = router;
