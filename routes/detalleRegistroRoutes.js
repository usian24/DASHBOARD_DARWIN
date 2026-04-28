const express = require('express');
const router = express.Router();
const detalleRegistroController = require('../controllers/detalleRegistroController');

// Definición de rutas para el Registro Maestro
router.get('/', detalleRegistroController.obtenerRegistros);
router.post('/', detalleRegistroController.crearRegistro);
router.put('/:id', detalleRegistroController.actualizarRegistro);
router.delete('/:id', detalleRegistroController.eliminarRegistro);

module.exports = router;