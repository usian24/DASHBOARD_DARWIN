const db = require('../config/db');

// Obtener todos los tipos de transporte
const obtenerTiposTransporte = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tipo_transporte');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo tipo de transporte
const crearTipoTransporte = async (req, res) => {
    const { NOMBRE_TRANSPORTE } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO tipo_transporte (NOMBRE_TRANSPORTE) VALUES (?)',
            [NOMBRE_TRANSPORTE]
        );
        res.status(201).json({ id: result.insertId, NOMBRE_TRANSPORTE });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un tipo de transporte
const actualizarTipoTransporte = async (req, res) => {
    const { id } = req.params;
    const { NOMBRE_TRANSPORTE } = req.body;
    try {
        await db.query(
            'UPDATE tipo_transporte SET NOMBRE_TRANSPORTE = ? WHERE id_tt = ?',
            [NOMBRE_TRANSPORTE, id]
        );
        res.json({ message: 'Tipo de transporte actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un tipo de transporte
const eliminarTipoTransporte = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM tipo_transporte WHERE id_tt = ?', [id]);
        res.json({ message: 'Tipo de transporte eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    obtenerTiposTransporte,
    crearTipoTransporte,
    actualizarTipoTransporte,
    eliminarTipoTransporte
};