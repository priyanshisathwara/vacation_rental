import React from 'react';
import './WhiteRannPage.css';

const WhiteRannPage = () => {
  return (
    <div className="white-rann-container">
      <h1>The Enchanting White Rann of Kutch</h1>
      <p className="intro">
        <img src='/src/assets/whiterann.jpeg' className='places-image'/><br/>
        A vast, shimmering salt desert that transforms into a magical landscape under the moonlight—
        the White Rann of Kutch is one of India’s most surreal and breathtaking natural wonders.
      </p>

      <section className="rann-section">
        <h2>🧂 How the White Rann is Formed</h2>
        <p>
          The White Rann is a seasonal salt marsh located in the Thar Desert in Kutch, Gujarat. It’s formed when seawater floods the region during the monsoon and evaporates over time,
          leaving behind thick deposits of white salt. This natural process turns the area into a glistening white expanse—especially spectacular during the dry winter months.
        </p>
      </section>

      <section className="rann-section">
        <h2>🌟 Why It’s So Popular</h2>
        <p>
          The White Rann is famous not only for its unique geography but also for the <strong>Rann Utsav</strong>—a cultural festival held every year from November to February.
          Tourists from around the world come to experience this one-of-a-kind celebration featuring folk music, dance performances, local art, camel rides, and stargazing on the salt desert.
        </p>
        <p>
          The view of the full moon reflecting off the salt flat is a once-in-a-lifetime experience and a photographer’s dream. Eco-resorts and tent cities set up during the festival
          provide a luxurious and immersive experience in the middle of the desert.
        </p>
      </section>

      <section className="rann-section">
        <h2>📜 A Glimpse into History</h2>
        <p>
          Historically, the Rann of Kutch has been a strategic and cultural bridge between India and its neighboring lands.
          It was once under the rule of the Harappan civilization and later witnessed trade and exchanges under various dynasties including the Jadeja Rajputs.
        </p>
        <p>
          Over time, the region’s unique geography and salt-rich terrain made it both a prized asset and a subject of awe.
          Today, it stands as a symbol of Gujarat’s pride and India’s natural beauty.
        </p>
      </section>
    </div>
  );
};

export default WhiteRannPage;
