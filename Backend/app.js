const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = 3000;


app.use(bodyParser.json());

// Enable CORS for all origins
app.use(cors())


// Use post routes
app.use('/api', postRoutes);

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})