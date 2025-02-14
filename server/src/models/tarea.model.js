const pool = require('../config/db');

const Tarea = {
  getAll: async () => (await pool.query('SELECT * FROM tareas')).rows,

  getById: async (id) => {
    const result = await pool.query('SELECT * FROM tareas WHERE id = $1', [id]);
    return result.rows[0];
  },

  create: async (titulo, descripcion) => {
    const result = await pool.query(
      'INSERT INTO tareas (titulo, descripcion) VALUES ($1, $2) RETURNING *',
      [titulo, descripcion]
    );
    return result.rows[0];
  },

  update: async (id, titulo, descripcion) => {
    const result = await pool.query(
      'UPDATE tareas SET titulo = $1, descripcion = $2 WHERE id = $3 RETURNING *',
      [titulo, descripcion, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    const result = await pool.query('DELETE FROM tareas WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

module.exports = Tarea;
