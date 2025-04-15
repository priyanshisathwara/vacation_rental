import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CityResult.css";

const CityResult = () => {
    const { city } = useParams(); // Only use city from params
    const [cityData, setCityData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Fetching data for city:", city); // Log city name
    
        const apiUrl = `http://localhost:8000/api/auth/places/name/${encodeURIComponent(city)}`;
    
        axios.get(apiUrl)
            .then((res) => {
                console.log("API Response:", res.data);
                if (Array.isArray(res.data)) {
                    setCityData(res.data);
                } else if (res.data) {
                    setCityData([res.data]);
                } else {
                    setCityData([]);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching city data:", err.response || err.message);
                setError("Failed to load city details.");
                setLoading(false);
            });
    }, [city]);
    
    console.log("City parameter in API call:", city);


    if (loading) return <h2>Loading city details...</h2>;
    if (error) return <h2 className="error">{error}</h2>;
    if (!cityData || cityData.length === 0) return <h2>No details found for this city.</h2>;

    return (
        <div className="city-container">
            {cityData.map((place, index) => (
                <div key={index} className="city-card">
                    <img
                        src={`http://localhost:8000/uploads/${place.image}`}
                        alt={place.place_name}
                        className="city-image"
                        onError={(e) => e.target.src = "/default-image.jpg"}
                    />
                    
                    <div className="city-details">
                        <h1>{place.city}</h1>
                        <h2>{place.place_name}</h2>
                        <p><strong>Location:</strong> {place.location}</p>
                        <p><strong>Price:</strong> ₹{place.price}</p>
                        <p><strong>Owner:</strong> {place.owner_name}</p>
                        <p className="date">
                            Added on: {new Date(place.created_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CityResult;
