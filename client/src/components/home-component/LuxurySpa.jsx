import React from "react";
import "./LuxurySpa.css";

const LuxurySpa = () => {
  return (
    <div className="luxury-spa-container">
      <header className="luxury-spa-header">
        <h1>Luxury Spa</h1>
        <p>Indulge in the ultimate relaxation experience</p>
      </header>

      <section className="luxury-spa-hero">
        <img
          src="/src/assets/spa.webp"
          alt="Luxury Spa"
          className="luxury-spa-image"
        />
      </section>

      <section className="luxury-spa-info">
        <h2>Why You Should Explore Luxury Spas</h2>
        <p>
          Luxury spas provide the perfect setting for rejuvenation and relaxation.
          They offer high-end treatments, serene environments, and personalized
          services to help you unwind. From world-class massages to soothing therapies,
          a visit to a luxury spa is an experience that combines wellness with indulgence.
        </p>
      </section>

      <section className="luxury-spa-amenities">
        <h2>Exclusive Amenities</h2>
        <ul>
          <li>Private Therapy Rooms</li>
          <li>Signature Massages</li>
          <li>Hot Stone Therapy</li>
          <li>Aromatherapy & Detox Treatments</li>
          <li>Infinity Pools & Jacuzzis</li>
          <li>Personalized Skincare Treatments</li>
        </ul>
      </section>

      <section className="luxury-spa-experience">
        <h2>The Ultimate Relaxation Experience</h2>
        <p>
          Immerse yourself in a complete relaxation experience with luxurious spa
          treatments, exclusive amenities, and a tranquil environment. Whether you
          are looking to de-stress, rejuvenate, or simply indulge, luxury spas provide
          a sanctuary for the soul.
        </p>
      </section>

      <footer className="luxury-spa-footer">
        <p>Escape the hustle and find tranquility at a luxury spa!</p>
      </footer>
    </div>
  );
};

export default LuxurySpa;
