import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import postRoutes from './routes/postRoutes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();


app.use(bodyParser.json());

// Enable CORS for all origins
app.use(cors())


// Use post routes
app.use('/api', postRoutes);


if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

export default app;