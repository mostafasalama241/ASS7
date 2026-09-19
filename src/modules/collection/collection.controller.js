import { getDB } from '../../database/dbConnection.js';

// Q1: Create explicit collection "books" with title validation rule
export const createBooksCollection = async (req, res) => {
    try {
        const db = getDB();
        await db.createCollection('books', {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: ['title'],
                    properties: {
                        title: {
                            bsonType: 'string',
                            minLength: 1,
                            description: 'title must be a non-empty string and is required'
                        }
                    }
                }
            }
        });
        return res.status(201).json({ ok: 1 });
    } catch (error) {
        // Handle case where collection already exists
        if (error.codeName === 'NamespaceExists' || error.code === 48) {
            return res.status(200).json({ ok: 1, message: "Collection 'books' already exists." });
        }
        return res.status(500).json({ message: error.message });
    }
};

// Q2: Create implicit collection "authors" by inserting data directly
export const createAuthorsImplicit = async (req, res) => {
    try {
        const db = getDB();
        const authorData = (req.body && Object.keys(req.body).length > 0)
            ? req.body
            : { name: "Author1", nationality: "British" };

        const result = await db.collection('authors').insertOne(authorData);
        return res.status(201).json({
            acknowledged: result.acknowledged,
            insertedId: result.insertedId
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Q3: Create capped collection "logs" with size limit 1MB (1048576 bytes)
export const createCappedLogsCollection = async (req, res) => {
    try {
        const db = getDB();
        await db.createCollection('logs', {
            capped: true,
            size: 1048576 // 1MB in bytes
        });
        return res.status(201).json({ ok: 1 });
    } catch (error) {
        if (error.codeName === 'NamespaceExists' || error.code === 48) {
            return res.status(200).json({ ok: 1, message: "Capped collection 'logs' already exists." });
        }
        return res.status(500).json({ message: error.message });
    }
};

// Q4: Create index on books collection for title field
export const createBooksIndex = async (req, res) => {
    try {
        const db = getDB();
        const indexName = await db.collection('books').createIndex({ title: 1 });
        return res.status(200).json({ indexName });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
