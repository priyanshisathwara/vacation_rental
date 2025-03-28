import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PlacesList.css"; // Import CSS file

const PlacesList = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/api/admin/places") // Adjust API URL if needed
            .then((response) => {
                setPlaces(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching places:", error);
                setError("Failed to load places");
                setLoading(false);
            });
    }, []);

    if (loading) return <h2>Loading places...</h2>;
    if (error) return <h2 className="error">{error}</h2>;

    return (
        <div className="places-list-page">
        <div className="container">
            <div className="grid">
                {places.map((place) => (
                    <div key={place.id} className="card">
                        <h3>{place.place_name}</h3>
                        <p><strong>Location:</strong> {place.location}</p>
                        <p><strong>City:</strong> {place.city}</p>
                        <p><strong>Price:</strong> ₹{place.price}</p>
                        <p><strong>Owner:</strong> {place.owner_name}</p>
                        <p className="date">
                            Added on: {new Date(place.created_at).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </div>
    
    );
};

export default PlacesList;
