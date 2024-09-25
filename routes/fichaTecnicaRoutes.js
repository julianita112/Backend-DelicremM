const express = require('express');
const router = express.Router();
const fichaTecnicaController = require('../controllers/fichaTecnicaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/',  fichaTecnicaController.crearFichaTecnica);
router.get('/activos', fichaTecnicaController.obtenerFichasTecnicasActivas);
router.get('/', fichaTecnicaController.obtenerFichasTecnicas);
router.get('/:id',  fichaTecnicaController.obtenerFichaTecnicaPorId);
router.put('/:id',  fichaTecnicaController.actualizarFichaTecnica);
router.delete('/:id',  fichaTecnicaController.eliminarFichaTecnica);
router.patch('/:id/estado', fichaTecnicaController.actualizarEstadoFichaTecnica);

module.exports = router;
