import React from "react";
import "./HikingInGujarat.css";

const HikingInGujarat = () => {
  return (
    <div className="hiking-container">
      <header className="hiking-header">
        <h1>Hiking in Gujarat</h1>
        <p>Explore the rugged terrain and scenic beauty of Gujarat</p>
      </header>

      <section className="hiking-hero">
        <img
          src="/src/assets/hik.jpeg"
          alt="Hiking in Gujarat"
          className="hiking-image"
        />
      </section>

      <section className="hiking-info">
        <h2>Why You Must Experience Hiking in Gujarat</h2>
        <p>
          Gujarat is a state full of diverse landscapes, and its hiking trails
          are some of the most scenic and rewarding in India. From the Aravalli
          mountain range to the Gir Forest, Gujarat offers some of the most
          picturesque spots for trekking. Hiking here not only gives you a chance
          to enjoy the beauty of nature but also provides an opportunity to
          explore ancient forts, hills, and wildlife.
        </p>
      </section>

      <section className="hiking-destinations">
        <h2>Popular Hiking Destinations in Gujarat</h2>
        <ul>
          <li>Girnar Hills</li>
          <li>Sunset Point (Mount Abu)</li>
          <li>Shatrunjaya Hills</li>
          <li>Kailashgadh Hill</li>
          <li>Saptakoteshwar Wildlife Sanctuary</li>
          <li>Pavagadh Hill</li>
        </ul>
      </section>

      <section className="hiking-experience">
        <h2>What to Expect from a Hiking Trip in Gujarat</h2>
        <p>
          Hiking in Gujarat offers you a chance to experience both the natural
          beauty and rich cultural heritage of the state. Whether it's climbing
          the sacred hills of Girnar, witnessing the sunset from Pavagadh, or
          trekking through the lush forests of the Western Ghats, the journey is
          bound to be an unforgettable experience. You will encounter diverse flora
          and fauna, ancient temples, forts, and get a chance to meet local
          tribes.
        </p>
      </section>

      <footer className="hiking-footer">
        <p>Start your hiking adventure in Gujarat today!</p>
      </footer>
    </div>
  );
};

export default HikingInGujarat;
