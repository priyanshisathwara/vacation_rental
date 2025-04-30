import React, { useEffect } from "react";
import "./StatueOfUnity.css";

const StatueOfUnity = () => {

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when page mounts
  }, []);


  return (
    <div className="sou-container">
      <header className="sou-header">
        <h1>Statue of Unity</h1>
        <p>Located in Kevadia, Gujarat – the world's tallest statue</p>
      </header>

      <section className="sou-hero">
        <img
          src="/src/assets/guj1.jpg"
          alt="Statue of Unity"
          className="sou-image"
        />
      </section>

      <section className="sou-info">
        <h2>About the Statue of Unity</h2>
        <p>
          The Statue of Unity is a tribute to Sardar Vallabhbhai Patel, one of
          India’s founding fathers. Standing at 182 meters, it is the tallest
          statue in the world. It was inaugurated on October 31, 2018.
        </p>
      </section>

      <section className="sou-attractions">
        <h2>Popular Attractions Nearby</h2>
        <ul>
          <li>Valley of Flowers</li>
          <li>Viewing Gallery (153m high)</li>
          <li>Sardar Sarovar Dam</li>
          <li>Laser Light and Sound Show</li>
          <li>Jungle Safari & Pet Zone</li>
          <li>Vishwa Van – Forest of the World</li>
        </ul>
      </section>

      <section className="sou-activities">
        <h2>Things You Can Do</h2>
        <p>
          Visitors can enjoy panoramic views from the gallery, take part in
          boat rides on the Narmada River, visit museums and exhibition halls,
          and enjoy cultural programs and events hosted around the site.
        </p>
      </section>

      <footer className="sou-footer">
        <p>Plan your trip today and witness the pride of India!</p>
      </footer>
    </div>
  );
};

export default StatueOfUnity;
