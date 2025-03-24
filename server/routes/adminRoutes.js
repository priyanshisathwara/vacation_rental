import express from 'express';
import { createPlace } from '../models/Places.js';


const router = express.Router();

router.post('/create-place', createPlace);

export default router;
