import PostModel from '../services/postService.js';
import LogModel from '../services/logginService.js';

const PostController = {
    createPost: async (req, res) => {
        try {
            const newPost = await PostModel.create(req.body);
            const logResult = await LogModel.log('Create Post', `Post created with title: ${req.body.title}`, req.body.author);
            if(!logResult){
                res.status(400).json({ error: err.message });
            }
            res.status(201).json({ message: 'Post created', data: newPost });
        } catch (err) {
            const result = await LogModel.log('Error', err, req.body.author);
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
            
            const logResult = await LogModel.log('Update Post', `Post updated with title: ${req.body.title}`, req.body.author);
            if(!logResult){
                res.status(400).json({ error: err.message });
            }

            if (!updatedPost) {
                return res.status(400).json({ error: 'Failed to update the post' });
            }
            res.status(200).json(updatedPost);
        } catch (err) {
            const result = await LogModel.log('Error', err, req.body.author);
            res.status(400).json({ error: err.message });
        }
    },

    deletePost: async (req, res) => {
        try {
            const post = await PostModel.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }

            const deletedPost = await PostModel.delete(req.params.id);

            if (!deletedPost) {
                return res.status(404).json({ error: 'Deletion unsuccessful' }); // Ensure correct response if no post was deleted
            }

            res.status(200).send("Post deleted successfully");
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}


export default PostController;