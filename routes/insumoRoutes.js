const express = require('express');
const router = express.Router();
const insumoController = require('../controllers/insumoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/',  insumoController.crearInsumo);
router.get('/activos',  insumoController.obtenerInsumosActivos);
router.get('/',  insumoController.obtenerInsumos);
router.get('/:id', insumoController.obtenerInsumoPorId);
router.put('/:id',  insumoController.actualizarInsumo);
router.delete('/:id',  insumoController.eliminarInsumo);
router.patch('/:id/estado',  insumoController.cambiarEstadoInsumo);

module.exports = router;
