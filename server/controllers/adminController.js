import {createPlace} from '../models/Places.js';

const addPlace = async (req, res) => {
    // console.log("Received Data:", req.body); 

    const { place_name, location, price, owner_name } = req.body;

    if (!place_name || !location || !price || !owner_name) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    console.log("Creating place...");

    try {
        await createPlace(place_name, location, price, owner_name);
        return res.json({ message: 'Successfully Created' });
    } catch (error) {
        console.error("Error creating place:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export default addPlace;
