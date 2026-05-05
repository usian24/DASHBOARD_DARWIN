const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const db = require('./config/db');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Importar rutas de la API (asegúrate de que estas carpetas estén junto a index.js)
const tipoAgenteRoutes = require('./routes/tipoAgenteRoutes');
app.use('/api/tipo-agente', tipoAgenteRoutes);
// 2
const accionRoutes = require('./routes/accionRoutes');
app.use('/api/accion', accionRoutes);
// 3
const accionEspecificaRoutes = require('./routes/accionEspecificaRoutes');
app.use('/api/accion-especifica', accionEspecificaRoutes);
// 4
const actividadRoutes = require('./routes/actividadRoutes');
app.use('/api/actividad', actividadRoutes);
// 5
const subaccionRoutes = require('./routes/subaccionRoutes');
app.use('/api/subaccion', subaccionRoutes);
// 6
const tipoTransporteRoutes = require('./routes/tipoTransporteRoutes');
app.use('/api/tipo-transporte', tipoTransporteRoutes);
// 7
const zonaProvinciaRoutes = require('./routes/zonaProvinciaRoutes');
app.use('/api/zona-provincia', zonaProvinciaRoutes);
// 8
const zonaDistritoRoutes = require('./routes/zonaDistritoRoutes');
app.use('/api/zona-distrito', zonaDistritoRoutes);
// 9
const detalleRegistroRoutes = require('./routes/detalleRegistroRoutes');
app.use('/api/detalle-registro', detalleRegistroRoutes);
// 10
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
 
// Servir la carpeta frontend que ahora está al mismo nivel que index.js
app.use(express.static(path.join(__dirname, 'frontend')));



// Cualquier otra ruta carga el diseño principal
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 Sistema Darwin corriendo elegantemente en http://localhost:${PORT}`);
});