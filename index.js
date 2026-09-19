import dotenv from 'dotenv';
import app from './src/app.js';
import { dbConnection } from './src/database/dbConnection.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await dbConnection();
        app.listen(PORT, () => {
            console.log(`Server is running smoothly on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server due to DB connection error:", error.message);
    }
};

startServer();
