import pkg from 'pg'; // Import the entire module as 'pkg'
const { Pool } = pkg;

import dotenv from 'dotenv';

dotenv.config();


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

// Create the table if it doesn't exist
const createLogTableQuery = `
CREATE TABLE IF NOT EXISTS Logs (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    action VARCHAR(255),
    details TEXT,
    username VARCHAR(255)
)`;

pool.query(createTableQuery)
    .then(() => console.log('Table created successfully'))
    .catch(err => console.error('Error creating table:', err));

pool.query(createLogTableQuery)
    .then(() => console.log('Table created successfully'))
    .catch(err => console.error('Error creating table:', err));

export default pool;