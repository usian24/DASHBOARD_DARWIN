const db = require('../config/db');

// Obtener todos los distritos
const obtenerDistritos = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM zona_distrito');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo distrito
const crearDistrito = async (req, res) => {
    const { NOMBRE_DISTRITO, id_zp } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO zona_distrito (NOMBRE_DISTRITO, id_zp) VALUES (?, ?)',
            [NOMBRE_DISTRITO, id_zp]
        );
        res.status(201).json({ id: result.insertId, NOMBRE_DISTRITO, id_zp });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un distrito
const actualizarDistrito = async (req, res) => {
    const { id } = req.params;
    const { NOMBRE_DISTRITO, id_zp } = req.body;
    try {
        await db.query(
            'UPDATE zona_distrito SET NOMBRE_DISTRITO = ?, id_zp = ? WHERE id_zd = ?',
            [NOMBRE_DISTRITO, id_zp, id]
        );
        res.json({ message: 'Distrito actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un distrito
const eliminarDistrito = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM zona_distrito WHERE id_zd = ?', [id]);
        res.json({ message: 'Distrito eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    obtenerDistritos,
    crearDistrito,
    actualizarDistrito,
    eliminarDistrito
};