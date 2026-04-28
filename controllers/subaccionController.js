const db = require('../config/db');

// Obtener todas las subacciones
const obtenerSubacciones = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM subaccion');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear una nueva subacción
const crearSubaccion = async (req, res) => {
    const { NOMBRE_ABREVIADO, SUB_ACCION_ESP, CONCAT, CODIGO_S_A_E, ID_AE } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO subaccion (NOMBRE_ABREVIADO, SUB_ACCION_ESP, CONCAT, CODIGO_S_A_E, ID_AE) VALUES (?, ?, ?, ?, ?)',
            [NOMBRE_ABREVIADO, SUB_ACCION_ESP, CONCAT, CODIGO_S_A_E, ID_AE]
        );
        res.status(201).json({ id: result.insertId, NOMBRE_ABREVIADO, SUB_ACCION_ESP, CONCAT, CODIGO_S_A_E, ID_AE });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una subacción
const actualizarSubaccion = async (req, res) => {
    const { id } = req.params;
    const { NOMBRE_ABREVIADO, SUB_ACCION_ESP, CONCAT, CODIGO_S_A_E, ID_AE } = req.body;
    try {
        await db.query(
            'UPDATE subaccion SET NOMBRE_ABREVIADO = ?, SUB_ACCION_ESP = ?, CONCAT = ?, CODIGO_S_A_E = ?, ID_AE = ? WHERE ID_SA = ?',
            [NOMBRE_ABREVIADO, SUB_ACCION_ESP, CONCAT, CODIGO_S_A_E, ID_AE, id]
        );
        res.json({ message: 'Subacción actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar una subacción
const eliminarSubaccion = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM subaccion WHERE ID_SA = ?', [id]);
        res.json({ message: 'Subacción eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    obtenerSubacciones,
    crearSubaccion,
    actualizarSubaccion,
    eliminarSubaccion
};