const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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
    const {title,content,author,created_at} = req.body;
    if (!title || !author ) {
        return res.status(400).json({error:`Data cannot be empty ${req.body}`})
    }

    const newPost = {
        id: currentId++,
        title,
        content,
        author,
        created_at: new Date().now
    }
    
    posts.push(newPost);
    res.status(201).json({ message: 'Post created', data: newPost });
})

// Read a single blog post by id
app.get('/api/posts/:id', (req, res) => {
    const post = findPost(req.params.id);
    if (!post) {
        res.status(404).json({error: "404 Post not found"})
    }
    res.json(post);
  });


// Return all the posts 
app.get('/api/posts/', (req, res) => {
    res.status(200).json(posts);
  });


// Update a blog post by id
app.put('/api/posts/:id', (req, res) => {
    const post = findPost(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(updatePost(post, req.body))
  }); 
//delete posts
app.delete('/api/posts/:id',(req,res)=>{
    const postIndex = posts.findIndex(p=>p.id === parseInt(req.params.id));
    if (postIndex < 0) {
        return res.status(404).json({error:"Post not found"})
    }
    posts.splice(postIndex,1);
    res.status(204).send("post deleted");
})

const findPost = (id)=>{
    return posts.find(p=>p.id === parseInt(id));
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