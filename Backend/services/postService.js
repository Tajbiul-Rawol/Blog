import pool from '../config/db.js';

const PostModel = {
    create: async (postData) => {
        const { title, content, author, created_at } = postData;
        const result = await pool.query(
           `
            INSERT INTO posts (title, content, author, created_at)
            VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
            RETURNING *`,
            [title, content, author]
        );
        return result.rows[0];
    },
    
    findById: async (id) => {
        const result = await pool.query(`SELECT *, TO_CHAR(created_at, 'YYYY/MM/DD HH12:MI AM') AS created_at FROM posts WHERE id = $1`, [id]);
        return result.rows[0];
    },

    findAll: async () => {
        const result = await pool.query(`
            SELECT 
                id, 
                title, 
                content, 
                author, 
                TO_CHAR(created_at, 'YYYY/MM/DD HH12:MI AM') AS created_at
            FROM posts
            ORDER BY created_at DESC
        `);
        return result.rows;
    },

    update: async (id, updatedData) => {
        const { title, content, author } = updatedData;
        const result = await pool.query(
           `
            UPDATE posts
            SET title = $1, content = $2, author = $3, created_at = CURRENT_TIMESTAMP
            WHERE id = $4
            RETURNING *`,
            [title, content, author, id]
        );
        return result.rows[0];
    },

    delete: async (id) => {
        const result =  await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
}


export default PostModel;