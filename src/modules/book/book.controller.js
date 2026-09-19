import { getDB } from '../../database/dbConnection.js';

// Q5: Insert one document into books collection
export const insertOneBook = async (req, res) => {
    try {
        const db = getDB();
        const bookData = (req.body && Object.keys(req.body).length > 0)
            ? req.body
            : {
                title: "Book1",
                author: "Ali",
                year: 1937,
                genres: ["Fantasy", "Adventure"]
            };

        const result = await db.collection('books').insertOne(bookData);
        return res.status(201).json({
            acknowledged: result.acknowledged,
            insertedId: result.insertedId
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Q6: Insert multiple documents into books collection (batch)
export const insertManyBooks = async (req, res) => {
    try {
        const db = getDB();
        const booksBatch = (Array.isArray(req.body) && req.body.length >= 3)
            ? req.body
            : [
                { title: "Future", author: "George Orwell", year: 2020, genres: ["Science Fiction"] },
                { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, genres: ["Classic", "Fiction"] },
                { title: "Brave New World", author: "Aldous Huxley", year: 2006, genres: ["Dystopian", "Science Fiction"] }
            ];

        const result = await db.collection('books').insertMany(booksBatch);
        return res.status(201).json({
            acknowledged: result.acknowledged,
            insertedIds: result.insertedIds
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Q8: Update the book with title "Future", change year to 2022
export const updateBookYear = async (req, res) => {
    try {
        const db = getDB();
        const title = req.params.title || "Future";
        const newYear = req.body.year ? Number(req.body.year) : 2022;

        const result = await db.collection('books').updateOne(
            { title: title },
            { $set: { year: newYear } }
        );

        return res.status(200).json({
            acknowledged: result.acknowledged,
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Q9: Find a book with title "Brave New World"
export const findBookByTitle = async (req, res) => {
    try {
        const db = getDB();
        const title = req.query.title || "Brave New World";

        const book = await db.collection('books').findOne({ title });
        return res.status(200).json(book || { message: "Book not found" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Q10: Find all books published between 1990 and 2010
export const findBooksByYearRange = async (req, res) => {
    try {
        const db = getDB();
        const from = Number(req.query.from) || 1990;
        const to = Number(req.query.to) || 2010;

        const books = await db.collection('books').find({
            year: { $gte: from, $lte: to }
        }).toArray();

        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Q11: Find books where genre includes "Science Fiction"
export const findBooksByGenre = async (req, res) => {
    try {
        const db = getDB();
        const genre = req.query.genre || "Science Fiction";

        const books = await db.collection('books').find({
            genres: genre
        }).toArray();

        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Q12: Skip first two books, limit results to next three, sorted by year descending
export const findBooksSkipLimit = async (req, res) => {
    try {
        const db = getDB();
        const books = await db.collection('books')
            .find()
            .sort({ year: -1 })
            .skip(2)
            .limit(3)
            .toArray();

        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Q13: Find books where year field stored as an integer
export const findBooksYearInteger = async (req, res) => {
    try {
        const db = getDB();
        const books = await db.collection('books').find({
            year: { $type: "int" }
        }).toArray();

        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Q14: Find all books where genres field does NOT include any of "Horror" or "Science Fiction"
export const findBooksExcludeGenres = async (req, res) => {
    try {
        const db = getDB();
        const books = await db.collection('books').find({
            genres: { $nin: ["Horror", "Science Fiction"] }
        }).toArray();

        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Q15: Delete all books published before 2000
export const deleteBooksBeforeYear = async (req, res) => {
    try {
        const db = getDB();
        const targetYear = Number(req.query.year) || 2000;

        const result = await db.collection('books').deleteMany({
            year: { $lt: targetYear }
        });

        return res.status(200).json({
            acknowledged: result.acknowledged,
            deletedCount: result.deletedCount
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Q16: Aggregation - Filter books published after 2000 and sort by year descending
export const aggregateBooksFilterSort = async (req, res) => {
    try {
        const db = getDB();
        const pipeline = [
            { $match: { year: { $gt: 2000 } } },
            { $sort: { year: -1 } }
        ];

        const books = await db.collection('books').aggregate(pipeline).toArray();
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Q17: Aggregation - Find books after 2000, show only title, author, year
export const aggregateBooksProjectFields = async (req, res) => {
    try {
        const db = getDB();
        const pipeline = [
            { $match: { year: { $gt: 2000 } } },
            { $project: { _id: 0, title: 1, author: 1, year: 1 } }
        ];

        const books = await db.collection('books').aggregate(pipeline).toArray();
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Q18: Aggregation - Unwind array of genres into separate documents
export const aggregateBooksUnwindGenres = async (req, res) => {
    try {
        const db = getDB();
        const pipeline = [
            { $unwind: "$genres" },
            { $project: { _id: 0, title: 1, genres: 1 } }
        ];

        const results = await db.collection('books').aggregate(pipeline).toArray();
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Q19: Aggregation - Join books collection with logs collection
export const aggregateBooksJoinLogs = async (req, res) => {
    try {
        const db = getDB();
        const pipeline = [
            {
                $lookup: {
                    from: 'books',
                    let: { log_book_id: "$book_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $or: [
                                        { $eq: ["$_id", "$$log_book_id"] },
                                        { $eq: [{ $toString: "$_id" }, "$$log_book_id"] }
                                    ]
                                }
                            }
                        },
                        {
                            $project: { _id: 0, title: 1, author: 1, year: 1 }
                        }
                    ],
                    as: 'book_details'
                }
            },
            {
                $project: {
                    _id: 0,
                    action: 1,
                    book_details: 1
                }
            }
        ];

        const results = await db.collection('logs').aggregate(pipeline).toArray();
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
