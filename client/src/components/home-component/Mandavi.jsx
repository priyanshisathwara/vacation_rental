import React from 'react';
import './WhiteRannPage.css';

const MandviPage = () => {
  return (
    <div className="white-rann-container">
      <h1>Relax at the Golden Shores of Mandvi Beach</h1>
      <p className="intro">
        <img src="/src/assets/mandvi.jpg" alt="Mandvi Beach" className='places-image'/><br />
        Mandvi is a charming coastal town in Kutch, perfect for a beach getaway with historical charm and scenic beauty.
      </p>

      <section className="rann-section">
        <h2>🏖️ Golden Sand & Serene Waters</h2>
        <p>
          Mandvi Beach is a peaceful stretch where you can enjoy camel rides, beach volleyball, and spectacular sunsets.
          It's a favorite spot for families and nature lovers alike.
        </p>
      </section>

      <section className="rann-section">
        <h2>🏯 The Grand Vijay Vilas Palace</h2>
        <p>
          Overlooking the Arabian Sea, **Vijay Vilas Palace** is a beautiful royal residence built in the 1920s with intricate Rajput architecture. It has been featured in many Bollywood movies.
        </p>
      </section>

      <section className="rann-section">
        <h2>🚤 Local Boat Building & Seafood</h2>
        <p>
          Mandvi is also known for its traditional wooden shipbuilding yard and delicious coastal cuisine, offering a true taste of Kutch by the sea.
        </p>
      </section>
    </div>
  );
};

export default MandviPage;
