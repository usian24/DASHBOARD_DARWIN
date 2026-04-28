const express = require('express');
const router = express.Router();
const accionEspecificaController = require('../controllers/accionEspecificaController');

// Definición de rutas para Acción Específica
router.get('/', accionEspecificaController.obtenerAccionesEspecíficas);
router.post('/', accionEspecificaController.crearAccionEspecifica);
router.put('/:id', accionEspecificaController.actualizarAccionEspecifica);
router.delete('/:id', accionEspecificaController.eliminarAccionEspecifica);

module.exports = router;