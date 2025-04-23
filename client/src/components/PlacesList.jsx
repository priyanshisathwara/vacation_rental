import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./PlacesList.css";

const PlacesList = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // Assuming user data is in localStorage

  useEffect(() => {
    // Fetch user data from localStorage (or any other method)
    const loggedInUser = localStorage.getItem('user');
    setUser(loggedInUser ? JSON.parse(loggedInUser) : null);

    // Fetch places data
    axios
      .get("http://localhost:8000/api/admin/places")
      .then((res) => {
        setPlaces(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching places:", err);
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
              <img
                src={`http://localhost:8000/uploads/${place.image}`}
                alt={place.place_name}
                className="card-image"
              />
              <div className="card-content">
                <h3>{place.place_name}</h3>
                <p><strong>Location:</strong> {place.location}</p>
                <p><strong>City:</strong> {place.city}</p>
                <p><strong>Price:</strong> ₹{place.price}</p>
                <p><strong>Added on:</strong> {new Date(place.created_at).toLocaleDateString()}</p>
                <div className="card-buttons">
                  <Link to={`/book-now/${place.id}`} className="book-now-btn">
                    Book Now
                  </Link>

                  {/* Conditionally render the "Update Place" button if the user is the owner */}
                  {user && user.role === "owner" && (
                    <Link to={`/update-place/${place.id}`} className="add-to-cart-btn">
                      Update Place
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlacesList;
