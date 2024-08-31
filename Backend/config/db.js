const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER, // replace with your PostgreSQL username
    host: process.env.DB_HOST,
    database: process.env.DB_NAME, // replace with your database name
    password: process.env.DB_PASSWORD, // replace with your PostgreSQL password
    port: process.env.DB_PORT, // default port for PostgreSQL
});

pool.on('connect', () => {
    console.log('Connected to the database');
});

// Create the table if it doesn't exist
const createTableQuery = `
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    author VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

pool.query(createTableQuery)
    .then(() => console.log('Table created successfully'))
    .catch(err => console.error('Error creating table:', err));

module.exports = pool;