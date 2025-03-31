import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CityResult.css";

const CityResult = () => {
    const { id, city } = useParams();
    const [cityData, setCityData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Params:", { id, city });

        let apiUrl = id
            ? `http://localhost:8000/api/auth/places/${id}`
            : `http://localhost:8000/api/auth/places/name/${encodeURIComponent(city)}`;

        axios.get(apiUrl)
            .then((res) => {
                console.log("API Response:", res.data);
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setCityData(res.data[0]); // Ensure we're accessing the first object
                } else {
                    setCityData(null);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching city data:", err);
                setError("Failed to load city details.");
                setLoading(false);
            });
    }, [id, city]);

    if (loading) return <h2>Loading city details...</h2>;
    if (error) return <h2 className="error">{error}</h2>;
    if (!cityData) return <h2>No details found for this city.</h2>;

    return (
        <div className="city-container">
            <div className="city-card">
                {/* Display Image from Database */}
                <img
                    src={`http://localhost:8000/uploads/${cityData.image}`}  
                    alt={cityData.place_name}
                    className="city-image"
                    onError={(e) => e.target.src = "/default-image.jpg"} // Fallback for missing images
                />
                
                <div className="city-details">
                    <h1>{cityData.city}</h1>
                    <h2>{cityData.place_name}</h2>
                    <p><strong>Location:</strong> {cityData.location}</p>
                    <p><strong>Price:</strong> ₹{cityData.price}</p>
                    <p><strong>Owner:</strong> {cityData.owner_name}</p>
                    <p className="date">
                        Added on: {new Date(cityData.created_at).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CityResult;
