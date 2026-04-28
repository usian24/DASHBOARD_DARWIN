const db = require('../config/db');

// Obtener todas las acciones (Leer)
const obtenerAcciones = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM accion');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear una nueva acción (Crear)
const crearAccion = async (req, res) => {
    const { NOMBRE_ABREVIADO, NOMBRE_ACCION, CODIGO_A_E, CODIGO_P_ACCION } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO accion (NOMBRE_ABREVIADO, NOMBRE_ACCION, CODIGO_A_E, CODIGO_P_ACCION) VALUES (?, ?, ?, ?)', 
            [NOMBRE_ABREVIADO, NOMBRE_ACCION, CODIGO_A_E, CODIGO_P_ACCION]
        );
        res.status(201).json({ id: result.insertId, NOMBRE_ABREVIADO, NOMBRE_ACCION, CODIGO_A_E, CODIGO_P_ACCION });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una acción existente (Actualizar)
const actualizarAccion = async (req, res) => {
    const { id } = req.params;
    const { NOMBRE_ABREVIADO, NOMBRE_ACCION, CODIGO_A_E, CODIGO_P_ACCION } = req.body;
    try {
        await db.query(
            'UPDATE accion SET NOMBRE_ABREVIADO = ?, NOMBRE_ACCION = ?, CODIGO_A_E = ?, CODIGO_P_ACCION = ? WHERE ID_ACCION = ?', 
            [NOMBRE_ABREVIADO, NOMBRE_ACCION, CODIGO_A_E, CODIGO_P_ACCION, id]
        );
        res.json({ message: 'Acción actualizada con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar una acción (Borrar)
const eliminarAccion = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM accion WHERE ID_ACCION = ?', [id]);
        res.json({ message: 'Acción eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    obtenerAcciones,
    crearAccion,
    actualizarAccion,
    eliminarAccion
};