import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(bodyParser.json());

//specific routes
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK' });
});

app.get('/api/docs', (req, res) => {
    const filePath = path.join(__dirname, 'docs.json');
    res.sendFile(filePath, err => {
        if (err) {
            console.error(err);
            res.status(500).send('Error');
        }
    });
});

app.get('/api/chapters', (req, res) => {
    const filePath = path.join(__dirname, 'chapters.json');
    res.sendFile(filePath, err => {
        if (err) {
            console.error(err);
            res.status(500).send('Error');
        }
    });
});

app.get('/api/products', (req, res) => {
    const filePath = path.join(__dirname, 'products.json');
    res.sendFile(filePath, err => {
        if (err) {
            console.error(err);
            res.status(500).send('Error');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});