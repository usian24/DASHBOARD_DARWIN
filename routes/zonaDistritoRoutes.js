const express = require('express');
const router = express.Router();
const zonaDistritoController = require('../controllers/zonaDistritoController');

// Definición de rutas para Zona Distrito
router.get('/', zonaDistritoController.obtenerDistritos);
router.post('/', zonaDistritoController.crearDistrito);
router.put('/:id', zonaDistritoController.actualizarDistrito);
router.delete('/:id', zonaDistritoController.eliminarDistrito);

module.exports = router;