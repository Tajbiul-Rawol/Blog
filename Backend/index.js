const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;


app.use(bodyParser.json());

//in memory data storage
let posts = [];
let currentId = 1;

// Create a new blog post
app.post('/api/posts',(req,res)=>{
    console.log('POST request received');
    console.log(req.body);  // Correct way to log the incoming request body
    res.status(201).json({ message: 'Post created', data: req.body });
    posts.push(req.body);
})

// Read a single blog post by id
app.get('/api/posts/:id', (req, res) => {
    console.log('GET request received for post with ID:', req.params.id);
    res.status(200).json({ message: 'GET request reached', data: posts });
    console.log(posts);
  });


app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})