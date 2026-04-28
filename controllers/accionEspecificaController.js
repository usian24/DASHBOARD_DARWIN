const db = require('../config/db');

// Obtener todas las acciones específicas
const obtenerAccionesEspecíficas = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM accion_especifica');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear una nueva acción específica
const crearAccionEspecifica = async (req, res) => {
    const { NOMBRE_ABREVIADO, ACCION_ESPECIFICA, CODIGO_A_E } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO accion_especifica (NOMBRE_ABREVIADO, ACCION_ESPECIFICA, CODIGO_A_E) VALUES (?, ?, ?)',
            [NOMBRE_ABREVIADO, ACCION_ESPECIFICA, CODIGO_A_E]
        );
        res.status(201).json({ id: result.insertId, NOMBRE_ABREVIADO, ACCION_ESPECIFICA, CODIGO_A_E });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar acción específica
const actualizarAccionEspecifica = async (req, res) => {
    const { id } = req.params;
    const { NOMBRE_ABREVIADO, ACCION_ESPECIFICA, CODIGO_A_E } = req.body;
    try {
        await db.query(
            'UPDATE accion_especifica SET NOMBRE_ABREVIADO = ?, ACCION_ESPECIFICA = ?, CODIGO_A_E = ? WHERE ID_AE = ?',
            [NOMBRE_ABREVIADO, ACCION_ESPECIFICA, CODIGO_A_E, id]
        );
        res.json({ message: 'Acción específica actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar acción específica
const eliminarAccionEspecifica = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM accion_especifica WHERE ID_AE = ?', [id]);
        res.json({ message: 'Acción específica eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    obtenerAccionesEspecíficas,
    crearAccionEspecifica,
    actualizarAccionEspecifica,
    eliminarAccionEspecifica
};