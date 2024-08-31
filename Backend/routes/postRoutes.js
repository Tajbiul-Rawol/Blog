const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');


// Create a new post
router.post('/posts', PostController.createPost);

// Get a single post by id
router.get('/posts/:id', PostController.getPostById);

// Get all posts
router.get('/posts', PostController.getAllPosts);

// Update a post by id
router.put('/posts/:id', PostController.updatePost);

// Delete a post by id
router.delete('/posts/:id', PostController.deletePost);

module.exports = router;