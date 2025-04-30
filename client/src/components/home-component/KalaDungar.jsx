import React from 'react';
import './WhiteRannPage.css'; // Reusing the same CSS for consistent style

const KalaDungarPage = () => {
  return (
    <div className="white-rann-container">
      <h1>The Majestic Kala Dungar (Black Hill)</h1>
      <p className="intro">
        <img src="/src/assets/kaladungar.jpg" alt="Kala Dungar" className='places-image'/><br />
        Kala Dungar, meaning "Black Hill", is the highest point in the Kutch region and offers stunning views of the White Rann and surrounding landscapes.
        It’s not just a geographical marvel but also a place of deep spiritual and cultural significance.
      </p>

      <section className="rann-section">
        <h2>⛰️ Scenic Viewpoint of Kutch</h2>
        <p>
          Located at an altitude of about 458 meters, Kala Dungar provides panoramic views that stretch far across the Rann of Kutch.
          It's a place where visitors can witness the contrast of dark hills against the white salt flats, especially magical at sunset.
        </p>
      </section>

      <section className="rann-section">
        <h2>🕉️ The Sacred Dattatreya Temple</h2>
        <p>
          At the summit of Kala Dungar sits the revered Dattatreya Temple, believed to be over 400 years old.
          According to legend, Lord Dattatreya once walked on this hill and stopped to rest, and his divine presence turned it into a spiritual haven.
        </p>
        <p>
          A unique tradition here involves feeding wild jackals that descend from the hills to receive food from the temple priests—a practice that's been followed for generations.
        </p>
      </section>

      <section className="rann-section">
        <h2>🧭 A Gateway to Tranquility</h2>
        <p>
          Beyond its spiritual aura, Kala Dungar is a peaceful escape from city life. The fresh breeze, scenic trails, and storytelling locals make it an ideal spot for nature lovers and spiritual seekers alike.
        </p>
        <p>
          Visiting during the Rann Utsav enhances the experience, as tourists often combine this hill visit with their trip to the White Rann.
        </p>
      </section>
    </div>
  );
};

export default KalaDungarPage;
