import { Router } from 'express';
import {
    createBooksCollection,
    createAuthorsImplicit,
    createCappedLogsCollection,
    createBooksIndex
} from './collection.controller.js';

const router = Router();

router.post('/books', createBooksCollection);
router.post('/authors', createAuthorsImplicit);
router.post('/logs/capped', createCappedLogsCollection);
router.post('/books/index', createBooksIndex);

export default router;
