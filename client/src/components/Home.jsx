import React from 'react';
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import "./home.css";
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Home = () => {
  const navigate = useNavigate();
  let user = null;

  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Error parsing user from localStorage", error);
    user = null;
  }

  const isOwner = user?.role === "owner";

  const handleAddProperty = () => {
    navigate("/add-places");
  };

  return (
    <div>
      <div className='home-container'>
        <Navbar />
        <div className="search-bar-container">
          <SearchBar /> 
        </div>
        <div className="home-text">
          <h3>Welcome To</h3>
          <h1>Vacation Rental</h1>
          <p>Your Dream Stay, just a click away!</p>
        </div>
      </div>

      {isOwner && (
        <div className="o-add-property-card" onClick={handleAddProperty}>
          <div className="owner-card-icon">🏠</div>
          <div className="owner-card-text">Add Your Property</div>
          <div className="card-quote">"Turn your space into someone’s next dream stay!"</div>
        </div>
      )}
      {/* Popular Destinations */}
      <section className="popular-destinations">
        <h3>Popular Destinations</h3>
        <div className="destination-cards">
          <div className="destination-card">
            <img src="/src/assets/guj1.jpg" alt="Beach" />
            <p>Statue Of Unity</p>
          </div>
          <div className="destination-card">
            <img src="/src/assets/kutch.jpeg" alt="Mountains" />
            <p>Kutch</p>
          </div>
          <div className="destination-card">
            <img src="/src/assets/DonHill.jpeg" alt="Lake" />
            <p>Saputara</p>
          </div>
        </div>
      </section>

      {/* Top Experiences */}
      <section className="top-experiences">
        <h3>Top Experiences</h3>
        <div className="experience-cards">
          <div className="experience-card">
            <img src="/src/assets/spa.webp" alt="Spa" />
            <p>Luxury Spa</p>
          </div>
          <div className="experience-card">
            <img src="/src/assets/hik.jpeg" alt="Hiking" />
            <p>Mountain Hiking</p>
          </div>
          <div className="experience-card">
            <img src="/src/assets/cusine.avif" alt="Local Food" />
            <p>Local Cuisine</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <h3>Why Choose Us</h3>
        <div className="features">
          <div className="feature">
            <span>✅</span>
            <p>Verified Listings</p>
          </div>
          <div className="feature">
            <span>🔐</span>
            <p>Secure Payments</p>
          </div>
          <div className="feature">
            <span>📱</span>
            <p>Mobile Booking</p>
          </div>
          <div className="feature">
            <span>💬</span>
            <p>24/7 Support</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
