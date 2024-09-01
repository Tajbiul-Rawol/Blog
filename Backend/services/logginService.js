import pool from '../config/db.js';

let currentId = 1;
const LogModel ={
    log: async (action, details, username) => {
        console.log('creating log for post creation');
        const query = `INSERT INTO Logs (action, details, username,timestamp) VALUES ($1, $2, $3,CURRENT_TIMESTAMP) RETURNING *`;
        try {
            const result = await pool.query(query, [action, details, username]);
            return result.rows[0];
        } catch (err) {
            console.error('Error logging to database:', err);
            throw err;
        }
    }
}

export default LogModel;