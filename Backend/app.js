const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
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

const app = express();
const PORT = 3000;


app.use(bodyParser.json());

// Enable CORS for all origins
app.use(cors())
//in memory data storage
let posts = [];
let currentId = 1;

// Create a new blog post
app.post('/api/posts',(req,res)=>{
    const {title,content,author} = req.body;
    
    if(validate(title,content,author))
        return res.status(400).json({error:`Invalid data ${req.body}`})

    const newPost = {
        id: currentId++,
        title,
        content,
        author,
        created_at: new Date().toLocaleDateString()
    }

    const insertQuery = `
        INSERT INTO posts (title, content, author, created_at)
        VALUES ($1, $2, $3, $4)
        RETURNING *`;

    pool.query(insertQuery, [newPost.title, newPost.content, newPost.author, newPost.created_at])
        .then(result => res.status(201).json({ message: 'Post created', data: result.rows[0] }))
        .catch(err => res.status(500).json({ error: 'Database error', details: err.message }));
})

// Read a single blog post by id
app.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const selectQuery = 'SELECT * FROM posts WHERE id = $1';

    pool.query(selectQuery, [id])
        .then(result => {
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Post not found' });
            }
            res.json(result.rows[0]);
        })
        .catch(err => res.status(500).json({ error: 'Database error', details: err.message }));
  });


// Return all the posts 
app.get('/api/posts/', (req, res) => {
    const selectAllQuery = 'SELECT * FROM posts ORDER BY created_at DESC';

    pool.query(selectAllQuery)
        .then(result => res.status(200).json(result.rows))
        .catch(err => res.status(500).json({ error: 'Database error', details: err.message }));
  });


// Update a blog post by id
app.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, content, author } = req.body;

    if(validate(title,content,author))
        return res.status(400).json({error:`Invalid data ${req.body}`})
    
    const updateQuery = `
        UPDATE posts
        SET title = $1, content = $2, author = $3, created_at = CURRENT_TIMESTAMP
        WHERE id = $4
        RETURNING *`;

    pool.query(updateQuery, [title, content, author, id])
        .then(result => {
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Post not found' });
            }
            res.json(result.rows[0]);
        })
        .catch(err => res.status(500).json({ error: 'Database error', details: err.message }));
  }); 
//delete posts
app.delete('/api/posts/:id',(req,res)=>{
    const { id } = req.params;

    const deleteQuery = 'DELETE FROM posts WHERE id = $1 RETURNING *';

    pool.query(deleteQuery, [id])
        .then(result => {
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Post not found' });
            }
            res.status(204).send(); // No content
        })
        .catch(err => res.status(500).json({ error: 'Database error', details: err.message }));
})


const validate = (title,author,content,created_at)=>{
    if (!title || !author || !content || !created_at ) {
        return false;
    }
    return true;
}

const updatePost = (post, newData)=>{
    const { title, content, author } = newData;
    if (title) post.title = title;
    if (content) post.content = content;
    if (author) post.author = author;
    return post;
}

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})