const db = require('../config/db');

// Obtener todos los registros detallados
const obtenerRegistros = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM detalle_registro');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear un nuevo registro completo
const crearRegistro = async (req, res) => {
    const { 
        ID_ACCION, ID_AE, ID_SA, ID_TA, id_tt, id_zd, id_zp, ID_ACTIVIDAD, 
        NUM_SUPERVISORES, EMPRESA_SUPERVISORA, CALIDAD_ENTREGABLE, 
        NRO_EXPEDIENTE, CARTA_LINEA, OBSERVACIONES, CONTRATO 
    } = req.body;

    try {
        const [result] = await db.query(
            `INSERT INTO detalle_registro 
            (ID_ACCION, ID_AE, ID_SA, ID_TA, id_tt, id_zd, id_zp, ID_ACTIVIDAD, NUM_SUPERVISORES, EMPRESA_SUPERVISORA, CALIDAD_ENTREGABLE, NRO_EXPEDIENTE, CARTA_LINEA, OBSERVACIONES, CONTRATO) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [ID_ACCION, ID_AE, ID_SA, ID_TA, id_tt, id_zd, id_zp, ID_ACTIVIDAD, NUM_SUPERVISORES, EMPRESA_SUPERVISORA, CALIDAD_ENTREGABLE, NRO_EXPEDIENTE, CARTA_LINEA, OBSERVACIONES, CONTRATO]
        );
        res.status(201).json({ message: 'Registro maestro creado con éxito', id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un registro existente
const actualizarRegistro = async (req, res) => {
    const { id } = req.params;
    const { 
        ID_ACCION, ID_AE, ID_SA, ID_TA, id_tt, id_zd, id_zp, ID_ACTIVIDAD, 
        NUM_SUPERVISORES, EMPRESA_SUPERVISORA, CALIDAD_ENTREGABLE, 
        NRO_EXPEDIENTE, CARTA_LINEA, OBSERVACIONES, CONTRATO 
    } = req.body;

    try {
        await db.query(
            `UPDATE detalle_registro SET 
            ID_ACCION = ?, ID_AE = ?, ID_SA = ?, ID_TA = ?, id_tt = ?, id_zd = ?, id_zp = ?, ID_ACTIVIDAD = ?, 
            NUM_SUPERVISORES = ?, EMPRESA_SUPERVISORA = ?, CALIDAD_ENTREGABLE = ?, NRO_EXPEDIENTE = ?, CARTA_LINEA = ?, OBSERVACIONES = ?, CONTRATO = ? 
            WHERE ID_REGISTRO = ?`,
            [ID_ACCION, ID_AE, ID_SA, ID_TA, id_tt, id_zd, id_zp, ID_ACTIVIDAD, NUM_SUPERVISORES, EMPRESA_SUPERVISORA, CALIDAD_ENTREGABLE, NRO_EXPEDIENTE, CARTA_LINEA, OBSERVACIONES, CONTRATO, id]
        );
        res.json({ message: 'Registro maestro actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un registro
const eliminarRegistro = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM detalle_registro WHERE ID_REGISTRO = ?', [id]);
        res.json({ message: 'Registro maestro eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    obtenerRegistros,
    crearRegistro,
    actualizarRegistro,
    eliminarRegistro
};