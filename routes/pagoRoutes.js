const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', pagoController.registrarPago);
router.get('/', pagoController.obtenerPagos);
router.get('/:id',  pagoController.obtenerPagoPorId);
router.put('/:id',  pagoController.actualizarPago);
router.delete('/:id',  pagoController.eliminarPago);

module.exports = router;
