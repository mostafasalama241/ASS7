import { getDB } from '../../database/dbConnection.js';

// Q7: Insert a new log into the logs collection
export const insertOneLog = async (req, res) => {
    try {
        const db = getDB();
        const logData = (req.body && Object.keys(req.body).length > 0)
            ? req.body
            : {
                book_id: "64b5c2d8a123456ef8914",
                action: "borrowed"
            };

        const result = await db.collection('logs').insertOne(logData);
        return res.status(201).json({
            acknowledged: result.acknowledged,
            insertedId: result.insertedId
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
