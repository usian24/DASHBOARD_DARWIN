const db = require('../config/db');

// Obtener todos los tipos de agente (Leer)
const obtenerTiposAgente = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tipo_agente');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo tipo de agente (Crear)
const crearTipoAgente = async (req, res) => {
    const { NOMBRE_TA } = req.body;
    try {
        const [result] = await db.query('INSERT INTO tipo_agente (NOMBRE_TA) VALUES (?)', [NOMBRE_TA]);
        res.status(201).json({ id: result.insertId, NOMBRE_TA });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un tipo de agente (Actualizar)
const actualizarTipoAgente = async (req, res) => {
    const { id } = req.params;
    const { NOMBRE_TA } = req.body;
    try {
        await db.query('UPDATE tipo_agente SET NOMBRE_TA = ? WHERE ID_TA = ?', [NOMBRE_TA, id]);
        res.json({ message: 'Tipo de agente actualizado con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un tipo de agente (Borrar)
const eliminarTipoAgente = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM tipo_agente WHERE ID_TA = ?', [id]);
        res.json({ message: 'Tipo de agente eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    obtenerTiposAgente,
    crearTipoAgente,
    actualizarTipoAgente,
    eliminarTipoAgente
};