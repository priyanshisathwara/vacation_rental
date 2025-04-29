// src/components/Owner/OwnerRequestList.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './OwnerRequestList.css'; // create CSS for your styling if needed

const OwnerRequestList = () => {
  const [places, setPlaces] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchOwnerPlaces();
  }, []);

  const getStatus = (isApproved) => {
    switch (isApproved) {
      case 0:
        return "Pending";
      case 1:
        return "Accepted";
      case 2:
        return "Rejected";
      default:
        return "Unknown";
    }
  };

  
  const fetchOwnerPlaces = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/admin/owner-places', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const ownerPlaces = response.data.data;
      console.log('Owner Places Response:', ownerPlaces);

      setPlaces(ownerPlaces);
    } catch (error) {
      console.error('Error fetching owner places:', error);
    }
  };

  return (
    <div className="owner-places-container">
      <h2>My Properties</h2>

      {places.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="places-grid">
          {places.map((place) => (
            <div key={place.id} className="place-card">
              <img
                src={`http://localhost:8000/uploads/${place.image}`}
                alt={place.place_name}
                className="place-image"
              />
              <h3>{place.place_name}</h3>

              {/* Status */}
              <div className="property-status">
  Status: <span className={`status-label ${getStatus(place.is_approved).toLowerCase()}`}>
    {getStatus(place.is_approved)}
  </span>
</div>


              <p>Location: {place.city}</p>
              <p>Price: ₹{place.price} /night</p>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default OwnerRequestList;
