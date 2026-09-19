import { MongoClient } from 'mongodb';

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const dbName = process.env.DB_NAME || 'assignment7_db';

const client = new MongoClient(mongoURI);

let dbInstance = null;

export const dbConnection = async () => {
    try {
        await client.connect();
        dbInstance = client.db(dbName);
        console.log(`Connected successfully to MongoDB database: ${dbName}`);
        return dbInstance;
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        throw error;
    }
};

export const getDB = () => {
    if (!dbInstance) {
        throw new Error('Database is not connected! Call dbConnection() first.');
    }
    return dbInstance;
};
