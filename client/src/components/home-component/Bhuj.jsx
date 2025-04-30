import React from 'react';
import './WhiteRannPage.css'; // Using the same styles for consistency

const BhujPage = () => {
  return (
    <div className="white-rann-container">
      <h1>Discover the Historic City of Bhuj</h1>
      <p className="intro">
        <img src="/src/assets/bhuj.webp" alt="Bhuj" className='places-image'/><br />
        Bhuj is the cultural heart of Kutch, a city steeped in history, royal palaces, bustling bazaars, and artistic heritage.
      </p>

      <section className="rann-section">
        <h2>🏰 Regal Architecture</h2>
        <p>
          Visit the iconic **Prag Mahal** and **Aina Mahal**, beautiful palaces that showcase European and Indian architectural styles.
          These landmarks narrate stories of royal grandeur and artistic mastery.
        </p>
      </section>

      <section className="rann-section">
        <h2>🧵 Center of Craftsmanship</h2>
        <p>
          Bhuj is home to several artisan villages known for traditional crafts such as embroidery, bandhani, and leatherwork.
          The nearby villages like Bhujodi and Ajrakhpur are must-visits for anyone interested in handicrafts.
        </p>
      </section>

      <section className="rann-section">
        <h2>🛍️ Local Markets & Culture</h2>
        <p>
          Dive into the colorful Bhuj markets offering textiles, jewelry, and spices. The city also hosts museums and cultural centers that capture the rich legacy of the Kutch region.
        </p>
      </section>
    </div>
  );
};

export default BhujPage;
