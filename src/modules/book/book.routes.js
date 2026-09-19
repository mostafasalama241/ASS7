import { Router } from 'express';
import {
    insertOneBook,
    insertManyBooks,
    updateBookYear,
    findBookByTitle,
    findBooksByYearRange,
    findBooksByGenre,
    findBooksSkipLimit,
    findBooksYearInteger,
    findBooksExcludeGenres,
    deleteBooksBeforeYear,
    aggregateBooksFilterSort,
    aggregateBooksProjectFields,
    aggregateBooksUnwindGenres,
    aggregateBooksJoinLogs
} from './book.controller.js';

const router = Router();

// Insertion routes
router.post('/batch', insertManyBooks);
router.post('/', insertOneBook);

// Update route
router.patch('/Future', updateBookYear);
router.patch('/:title', updateBookYear);

// Query routes
router.get('/title', findBookByTitle);
router.get('/year', findBooksByYearRange);
router.get('/genre', findBooksByGenre);
router.get('/skip-limit', findBooksSkipLimit);
router.get('/year-integer', findBooksYearInteger);
router.get('/exclude-genres', findBooksExcludeGenres);

// Deletion route
router.delete('/before-year', deleteBooksBeforeYear);

// Aggregation routes
router.get('/aggregate1', aggregateBooksFilterSort);
router.get('/aggregate2', aggregateBooksProjectFields);
router.get('/aggregate3', aggregateBooksUnwindGenres);
router.get('/aggregate4', aggregateBooksJoinLogs);

export default router;
