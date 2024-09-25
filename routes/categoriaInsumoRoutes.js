const express = require('express');
const router = express.Router();
const categoriaInsumoController = require('../controllers/categoriaInsumoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas CRUD para Categoría de Insumos
router.get('/',  categoriaInsumoController.obtenerCategoriasInsumos);
router.get('/activos',  categoriaInsumoController.obtenerCategoriasInsumosActivas);
router.get('/:id',categoriaInsumoController.obtenerCategoriaInsumoPorId);
router.post('/',  categoriaInsumoController.crearCategoriaInsumo);
router.put('/:id',  categoriaInsumoController.actualizarCategoriaInsumo);
router.delete('/:id',  categoriaInsumoController.eliminarCategoriaInsumo);
router.patch('/:id/estado', categoriaInsumoController.actualizarEstadoCategoriaInsumo);

module.exports = router;
