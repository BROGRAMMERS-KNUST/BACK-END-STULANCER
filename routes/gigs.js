import express from 'express';
import { createGig } from '../controllers/createGig';

const router = express.Router();
router.post('/', createGig);
export default router;
