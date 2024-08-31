const PostModel = require('../services/postService');

const PostController = {
    createPost: async (req, res) => {
        try {
            const newPost = await PostModel.create(req.body);
            res.status(201).json({ message: 'Post created', data: newPost });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    getPostById: async (req, res) => {
        try {
            const post = await PostModel.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ error: "404 Post not found" });
            }
            res.json(post);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    getAllPosts: async (req, res) => {
        try {
            const posts = await PostModel.findAll();
            res.status(200).json(posts);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    updatePost: async (req, res) => {
        try {
            const post = await PostModel.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }

            const updatedPost = await PostModel.update(req.params.id, req.body);
            res.json(updatedPost);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    deletePost: async (req, res) => {
        try {
            const post = await PostModel.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }

            await PostModel.delete(req.params.id);
            res.status(204).send("Post deleted");
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

module.exports = PostController;