import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import postRoutes from './routes/postRoutes.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';


// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// Set limit for JSON payload
app.use(bodyParser.json({ limit: '10mb' }));


// Set limit for URL-encoded payload
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // Increase the limit as needed

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

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