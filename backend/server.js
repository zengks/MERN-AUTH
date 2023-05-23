import express from 'express';
import dotevn from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser';
import path from 'path'

dotevn.config();

connectDB();

const port = process.env.PORT || 5000;

const app = express();

// To parse raw json data
app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
    // set up root directory
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, 'frontend/dist')));

    // if getting anything but /api/users routes, we use index.html from dist folder
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')))
} else {
    app.get('/', (req, res) => {
        res.send('Server is ready');
    });
}


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

