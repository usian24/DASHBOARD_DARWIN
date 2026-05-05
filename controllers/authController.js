// controllers/authController.js
const db = require('../config/db'); // Asegúrate de que esta ruta apunte a tu conexión de BD
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'darwin_secreto_super_seguro_2026'; // En producción, esto va en un archivo .env

const authController = {
    // --- REGISTRAR NUEVO USUARIO ---
    register: async (req, res) => {
        try {
            const { nombre_completo, username, password } = req.body;

            // Verificar si el usuario ya existe
            const [users] = await db.query('SELECT * FROM usuario WHERE username = ?', [username]);
            if (users.length > 0) {
                return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
            }

            // Encriptar la contraseña (salting & hashing)
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Guardar en la base de datos
            await db.query(
                'INSERT INTO usuario (nombre_completo, username, password, rol) VALUES (?, ?, ?, ?)',
                [nombre_completo, username, hashedPassword, 'Administrador']
            );

            res.status(201).json({ message: 'Usuario registrado exitosamente' });
        } catch (error) {
            console.error('Error en registro:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    // --- INICIAR SESIÓN ---
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Buscar al usuario
            const [users] = await db.query('SELECT * FROM usuario WHERE username = ?', [username]);
            if (users.length === 0) {
                return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
            }

            const user = users[0];

            // Comparar la contraseña ingresada con la encriptada
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
            }

            // Generar el Token de sesión (JWT) válido por 8 horas
            const token = jwt.sign(
                { id: user.id_usuario, username: user.username, rol: user.rol },
                SECRET_KEY,
                { expiresIn: '8h' }
            );

            res.status(200).json({ 
                message: 'Login exitoso', 
                token, 
                user: { nombre: user.nombre_completo, rol: user.rol } 
            });
        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
};

module.exports = authController;