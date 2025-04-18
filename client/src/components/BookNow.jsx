import React, { useState, useEffect } from 'react';
import './BookNow.css'; // Importing the CSS file for styling
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

const BookNow = () => {
  const { id } = useParams(); 
  const [place, setPlace] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    // Fetch the place data from your API or database based on the id
    const fetchPlaceData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/admin/places/${id}`);
        setPlace(response.data); // axios returns data directly in response.data
      } catch (error) {
        console.error('Error fetching place data:', error);
      }
    };

    fetchPlaceData();
  }, [id]);

    const handleFormSubmit = (e) => {
    e.preventDefault();
    setBookingConfirmed(true);

   toast.success(`Booking confirmed!\nCheck-in: ${checkInDate}\nCheck-out: ${checkOutDate}\nGuests: ${guests}`);
  };


  if (!place) {
    return <p>Loading place details...</p>; // Show loading if place data is not available
  }

  return (
    <section className="book-now-container">
      <div className="property-details">
        <img
          src={`http://localhost:8000/uploads/${place.image}`}
          alt="Property Image"
          className="property-image"
        />
        <div className="property-info">
          <h1>{place.place_name}</h1>
          <p className="property-description">{place.description}</p>
          <p className="price">₹{place.price} / night</p>
        </div>
      </div>

      {bookingConfirmed ? (
        <div className="booking-confirmation">
          <h2>Your booking has been confirmed!</h2>
          <p>Check-in: {checkInDate}</p>
          <p>Check-out: {checkOutDate}</p>
          <p>Guests: {guests}</p>
          <p>Enjoy your stay at {place.place_name}!</p>
        </div>
      ) : (
        <form className="booking-form" onSubmit={handleFormSubmit}>
          <h2>Book Your Stay</h2>

          <label htmlFor="check-in">Check-in</label>
          <input
            type="date"
            id="check-in"
            name="check-in"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
          />

          <label htmlFor="check-out">Check-out</label>
          <input
            type="date"
            id="check-out"
            name="check-out"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            required
          />

          <label htmlFor="guests">Number of Guests</label>
          <select
            id="guests"
            name="guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            required
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num} Guest{num > 1 ? 's' : ''}
              </option>
            ))}
          </select>

          <button type="submit" className="book-now-button">Book Now</button>
        </form>
      )}
       <ToastContainer />
    </section>
  );
};

export default BookNow;
