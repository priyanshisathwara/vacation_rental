import React from 'react';
import './WhiteRannPage.css';

const KutchMuseumPage = () => {
  return (
    <div className="white-rann-container">
      <h1>Step into History at the Kutch Museum</h1>
      <p className="intro">
        <img src="/src/assets/museem.jpg" alt="Kutch Museum" /><br />
        The Kutch Museum in Bhuj is Gujarat's oldest museum and a treasure trove of Kutch’s history, culture, and art.
      </p>

      <section className="rann-section">
        <h2>🏺 Rare Artifacts & Tribal Culture</h2>
        <p>
          The museum features a remarkable collection of tribal artifacts, embroidery, musical instruments, weapons, and sculptures.
          It gives a deep insight into the ethnic richness of the Kutch region.
        </p>
      </section>

      <section className="rann-section">
        <h2>🎨 Traditional Textiles & Costumes</h2>
        <p>
          One of the highlights is the textile gallery, where you can admire traditional <strong>Kutch embroidery</strong>, block prints, and costumes worn by various communities.
        </p>
      </section>

      <section className="rann-section">
        <h2>📍 Historic Significance</h2>
        <p>
          Established in 1877, the museum building itself is an architectural gem built in the Indo-Gothic style.
          A visit here is a walk through the living history of Kutch.
        </p>
      </section>
    </div>
  );
};

export default KutchMuseumPage;
