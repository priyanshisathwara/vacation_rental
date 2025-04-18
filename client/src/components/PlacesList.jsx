import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./PlacesList.css";

const PlacesList = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  const handleAddToCart = (place) => {
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const isAlreadyInCart = existingCart.some((item) => item.id === place.id);

    if (!isAlreadyInCart) {
      const updatedCart = [...existingCart, place];
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };

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
                <p><strong>Owner:</strong> {place.owner_name}</p>
                <p><strong>Added on:</strong> {new Date(place.created_at).toLocaleDateString()}</p>
                <div className="card-buttons">
                <Link to={`/book-now/${place.id}`} className="book-now-btn">
                Book Now
              </Link>
                  <Link
                    to="/cart"
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(place)}
                  >
                    Add to Cart
                  </Link>
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
