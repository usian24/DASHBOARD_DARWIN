const express = require('express');
const router = express.Router();
const actividadController = require('../controllers/actividadController');

// Definición de rutas para Actividad
router.get('/', actividadController.obtenerActividades);
router.post('/', actividadController.crearActividad);
router.put('/:id', actividadController.actualizarActividad);
router.delete('/:id', actividadController.eliminarActividad);

module.exports = router;