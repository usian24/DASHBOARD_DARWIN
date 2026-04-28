const db = require('../config/db');

// Obtener todas las actividades
const obtenerActividades = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM actividad');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear una nueva actividad
const crearActividad = async (req, res) => {
    const { NOMBRE_ACTIVIDAD, CODIGO_ACTIVIDAD, ID_TA } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO actividad (NOMBRE_ACTIVIDAD, CODIGO_ACTIVIDAD, ID_TA) VALUES (?, ?, ?)',
            [NOMBRE_ACTIVIDAD, CODIGO_ACTIVIDAD, ID_TA]
        );
        res.status(201).json({ id: result.insertId, NOMBRE_ACTIVIDAD, CODIGO_ACTIVIDAD, ID_TA });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una actividad
const actualizarActividad = async (req, res) => {
    const { id } = req.params;
    const { NOMBRE_ACTIVIDAD, CODIGO_ACTIVIDAD, ID_TA } = req.body;
    try {
        await db.query(
            'UPDATE actividad SET NOMBRE_ACTIVIDAD = ?, CODIGO_ACTIVIDAD = ?, ID_TA = ? WHERE ID_ACTIVIDAD = ?',
            [NOMBRE_ACTIVIDAD, CODIGO_ACTIVIDAD, ID_TA, id]
        );
        res.json({ message: 'Actividad actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar una actividad
const eliminarActividad = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM actividad WHERE ID_ACTIVIDAD = ?', [id]);
        res.json({ message: 'Actividad eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    obtenerActividades,
    crearActividad,
    actualizarActividad,
    eliminarActividad
};