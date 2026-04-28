const express = require('express');
const router = express.Router();
const tipoAgenteController = require('../controllers/tipoAgenteController');

router.get('/', tipoAgenteController.obtenerTiposAgente);
router.post('/', tipoAgenteController.crearTipoAgente);
router.put('/:id', tipoAgenteController.actualizarTipoAgente);
router.delete('/:id', tipoAgenteController.eliminarTipoAgente);

module.exports = router;