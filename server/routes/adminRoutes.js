import express from 'express';
import { createPlace, getPlaces } from '../models/Places.js';
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage });

router.post("/create-place", upload.single("image"), createPlace);
router.get('/places', getPlaces);

export default router;
