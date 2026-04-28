const express = require('express');
const router = express.Router();
const accionController = require('../controllers/accionController');

// Definimos las URLs para cada operación (CRUD)
router.get('/', accionController.obtenerAcciones);
router.post('/', accionController.crearAccion);
router.put('/:id', accionController.actualizarAccion);
router.delete('/:id', accionController.eliminarAccion);

module.exports = router;