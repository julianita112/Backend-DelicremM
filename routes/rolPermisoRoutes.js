// routes/rolPermisoRoutes.js
const express = require('express');
const router = express.Router();
const rolPermisoController = require('../controllers/rolPermisoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/',  rolPermisoController.asignarPermiso);
router.put('/:id_rol/:id_permiso',  rolPermisoController.actualizarPermisoDeRol);
router.get('/:id', rolPermisoController.obtenerPermisosPorRol);
router.delete('/:id_rol/:id_permiso',  rolPermisoController.eliminarPermisoDeRol);


module.exports = router;
