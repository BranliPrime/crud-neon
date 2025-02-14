const pool = require('./db');

const createTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS tareas (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        descripcion TEXT NOT NULL
      )
    `;
    await pool.query(query);
    console.log('Tabla `tareas` verificada o creada.');
  } catch (error) {
    console.error('Error al crear/verificar la tabla:', error);
  }
};

createTable();
