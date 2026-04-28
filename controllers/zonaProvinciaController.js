const db = require('../config/db');

// Obtener todas las provincias
const obtenerProvincias = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM zona_provincia');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear una nueva provincia
const crearProvincia = async (req, res) => {
    const { NOMBRE_PROVINCIA } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO zona_provincia (NOMBRE_PROVINCIA) VALUES (?)',
            [NOMBRE_PROVINCIA]
        );
        res.status(201).json({ id: result.insertId, NOMBRE_PROVINCIA });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una provincia
const actualizarProvincia = async (req, res) => {
    const { id } = req.params;
    const { NOMBRE_PROVINCIA } = req.body;
    try {
        await db.query(
            'UPDATE zona_provincia SET NOMBRE_PROVINCIA = ? WHERE id_zp = ?',
            [NOMBRE_PROVINCIA, id]
        );
        res.json({ message: 'Provincia actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar una provincia
const eliminarProvincia = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM zona_provincia WHERE id_zp = ?', [id]);
        res.json({ message: 'Provincia eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    obtenerProvincias,
    crearProvincia,
    actualizarProvincia,
    eliminarProvincia
};