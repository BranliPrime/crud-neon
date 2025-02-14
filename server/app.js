require('dotenv').config();
require('./src/config/initDb');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { neon } = require('@neondatabase/serverless');


const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


const sql = neon(process.env.DATABASE_URL);

app.get('/db-version', async (req, res) => {
  try {
    const result = await sql`SELECT version()`;
    const { version } = result[0];
    res.json({ version });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la versión de la base de datos' });
  }
});


const tareaRoutes = require('./src/routes/tareas.routes');
app.use('/api/tareas', tareaRoutes);

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Tareas');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
