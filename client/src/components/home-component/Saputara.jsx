import React from "react";
import "./Saputara.css";

const Saputara = () => {
  return (
    <div className="saputara-container">
      <header className="saputara-header">
        <h1>Saputara Hill Station</h1>
        <p>The only hill station in Gujarat, nestled in the Western Ghats</p>
      </header>

      <section className="saputara-hero">
        <img
          src="/src/assets/DonHill.jpeg"
          alt="Saputara Hill Station"
          className="saputara-image"
        />
      </section>

      <section className="saputara-info">
        <h2>Why Saputara is Famous</h2>
        <p>
          Saputara is known for its scenic beauty, pleasant climate, and lush green surroundings. Located in the Dang district,
          it's a popular getaway for nature lovers and adventure enthusiasts. It's especially famous for its tribal culture,
          artist village, and monsoon charm.
        </p>
      </section>

      <section className="saputara-attractions">
        <h2>Popular Attractions</h2>
        <ul>
          <li>Saputara Lake – Boating & Lakeside Walks</li>
          <li>Sunset Point – Breathtaking views of the Sahyadris</li>
          <li>Gira Waterfalls – A scenic picnic spot</li>
          <li>Artist Village – A hub for tribal art & craft</li>
          <li>Step Garden & Rose Garden – Beautiful landscapes</li>
          <li>Ropeway – Ride with panoramic views</li>
        </ul>
      </section>

      <section className="saputara-activities">
        <h2>Things You Can Do</h2>
        <p>
          Enjoy boating, hiking, ropeway rides, visiting tribal museums, exploring local art, and relaxing in nature.
          Saputara also hosts festivals and fairs during peak tourist seasons, making it a cultural delight.
        </p>
      </section>

      <footer className="saputara-footer">
        <p>Escape to Saputara and unwind in the lap of nature!</p>
      </footer>
    </div>
  );
};

export default Saputara;
