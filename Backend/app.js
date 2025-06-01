const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/asignaturas', require('./routes/asignaturaroutes'));
app.use('/api/estudiantes', require('./routes/estudianteroutes'));
app.use('/api/asistencias', require('./routes/asistenciaroutes'));
app.use('/api/departamento', require('./routes/departamentoroutes'));

// Ruta base
app.get('/', (req, res) => {
    res.send('API del Sistema Académico funcionando');
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
