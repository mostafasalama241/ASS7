import express from 'express';
import collectionRouter from './modules/collection/collection.routes.js';
import bookRouter from './modules/book/book.routes.js';
import logRouter from './modules/log/log.routes.js';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/collection', collectionRouter);
app.use('/books', bookRouter);
app.use('/logs', logRouter);

// Root Welcome Route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to Route Node.js Assignment 7 API" });
});

// 404 Not Found Handler
app.use('*', (req, res) => {
    res.status(404).json({ message: "Endpoint Not Found" });
});

export default app;
