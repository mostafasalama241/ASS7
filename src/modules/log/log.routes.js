import { Router } from 'express';
import { insertOneLog } from './log.controller.js';

const router = Router();

router.post('/', insertOneLog);

export default router;
