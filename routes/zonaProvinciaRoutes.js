const express = require('express');
const router = express.Router();
const zonaProvinciaController = require('../controllers/zonaProvinciaController');

// Definición de rutas para Zona Provincia
router.get('/', zonaProvinciaController.obtenerProvincias);
router.post('/', zonaProvinciaController.crearProvincia);
router.put('/:id', zonaProvinciaController.actualizarProvincia);
router.delete('/:id', zonaProvinciaController.eliminarProvincia);

module.exports = router;