const express = require('express');
const router = express.Router();
const tipoTransporteController = require('../controllers/tipoTransporteController');

// Definición de rutas para Tipo de Transporte
router.get('/', tipoTransporteController.obtenerTiposTransporte);
router.post('/', tipoTransporteController.crearTipoTransporte);
router.put('/:id', tipoTransporteController.actualizarTipoTransporte);
router.delete('/:id', tipoTransporteController.eliminarTipoTransporte);

module.exports = router;