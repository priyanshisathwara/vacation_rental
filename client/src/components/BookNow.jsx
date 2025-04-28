import React, { useState, useEffect } from 'react';
import './BookNow.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookNow = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [userName, setUserName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      toast.error('You must login first!');
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/admin/places/${id}`);
        setPlace(response.data);
      } catch (error) {
        console.error('Error fetching place data:', error);
      }
    };

    fetchPlaceData();
  }, [id]);

  const handlePayment = async () => {
  const totalAmount = place.price * (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 3600 * 24);

  const options = {
    key_id: import.meta.env.KEY_ID, // Replace with your actual Razorpay Key ID
    amount: totalAmount * 100, // in paise
    currency: "INR",
    name: "BeachHouse Booking",
    description: `Booking at ${place.place_name}`,
    handler: async function (response) {
      try {
        await axios.post('http://localhost:8000/api/admin/bookings', {
          placeId: id,
          checkInDate,
          checkOutDate,
          guests,
          userName
        });

        setBookingConfirmed(true);
        toast.success(`Payment Successful! Booking Confirmed for ${userName}`);
      } catch (error) {
        console.error('Booking failed after payment:', error);
        toast.error('Payment succeeded but booking failed.');
      }
    },
    prefill: {
      name: userName,
      email: "testuser@example.com", // Dummy email
      contact: "9999999999" // Dummy number
    },
    theme: {
      color: "#3399cc"
    }
  };

  // Add the authorization header for Razorpay API call
  const headers = {
    'Authorization': `Basic ${btoa('rzp_test_yourKeyID:yourKeySecret')}`, // Use your actual Key ID and Key Secret here
  };

  try {
    // Make the API request to Razorpay to create the checkout preferences
    const response = await axios.post(
      'https://api.razorpay.com/v2/standard_checkout/preferences',
      options,  // Send Razorpay options as the request body
      { headers }  // Include the authorization header
    );

    // Assuming Razorpay response is successful
    const { id: checkoutId } = response.data;

    const rzp = new window.Razorpay({
      key_id: options.key_id,
      order_id: checkoutId,
      handler: options.handler,
    });

    rzp.open();
  } catch (error) {
    console.error('Payment initiation failed:', error);
    toast.error('Payment initiation failed.');
  }
};


  const handleFormSubmit = (e) => {
    e.preventDefault();

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkOut <= checkIn) {
      toast.error('Check-out date must be after check-in date.');
      return;
    }

    if (!userName.trim()) {
      toast.error('Please enter your name.');
      return;
    }

    handlePayment();
  };

  if (!place) {
    return <p>Loading place details...</p>;
  }

  return (
    <section className="book-now-container">
      <div className="property-details">
        <img
          src={`http://localhost:8000/uploads/${place.image}`}
          alt="Property"
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

          <label htmlFor="user-name">Your Name</label>
          <input
            type="text"
            id="user-name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <label htmlFor="check-in">Check-in</label>
          <input
            type="date"
            id="check-in"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
          />

          <label htmlFor="check-out">Check-out</label>
          <input
            type="date"
            id="check-out"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            required
          />

          <label htmlFor="guests">Number of Guests</label>
          <select
            id="guests"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            required
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>
                {num} Guest{num > 1 ? 's' : ''}
              </option>
            ))}
          </select>

          <button type="submit" className="book-now-button">Pay & Book Now</button>
        </form>
      )}
      <ToastContainer />
    </section>
  );
};

export default BookNow;
