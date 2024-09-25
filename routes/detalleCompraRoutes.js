const express = require('express');
const router = express.Router();
const detalleCompraController = require('../controllers/detalleCompraController');

router.get('/', detalleCompraController.getDetalleCompras);
router.get('/:id', detalleCompraController.getDetalleCompraById);
router.post('/', detalleCompraController.createDetalleCompra);
router.put('/:id', detalleCompraController.updateDetalleCompra);
router.delete('/:id', detalleCompraController.deleteDetalleCompra);

module.exports = router;
