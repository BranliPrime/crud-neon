const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, 
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect()
    .then(() => console.log("Base de datos conectada en Neon"))
    .catch(err => console.error("Error conectando a la BD:", err));

module.exports = pool;
