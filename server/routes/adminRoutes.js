import express from 'express';
import { createPlace, getPlaces } from '../models/Places.js';


const router = express.Router();

router.post('/create-place', createPlace);
router.get('/places', getPlaces);

export default router;
