const express = require('express');
const router = express.Router();
const subaccionController = require('../controllers/subaccionController');

// Definición de rutas para Subacción
router.get('/', subaccionController.obtenerSubacciones);
router.post('/', subaccionController.crearSubaccion);
router.put('/:id', subaccionController.actualizarSubaccion);
router.delete('/:id', subaccionController.eliminarSubaccion);

module.exports = router;