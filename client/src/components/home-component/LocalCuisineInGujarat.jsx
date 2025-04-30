import React from "react";
import "./LocalCuisineInGujarat.css";

const LocalCuisineInGujarat = () => {
  return (
    <div className="cuisine-container">
      <header className="cuisine-header">
        <h1>Famous Local Cuisine of Gujarat</h1>
        <p>Explore the rich and diverse flavors of Gujarat's traditional food</p>
      </header>

      <section className="cuisine-hero">
        <img
          src="/src/assets/cusine.avif"
          alt="Gujarat Cuisine"
          className="cuisine-image"
        />
      </section>

      <section className="cuisine-info">
        <h2>Why You Must Try Gujarat's Cuisine</h2>
        <p>
          Gujarat's cuisine is a delightful blend of flavors, with an emphasis on
          vegetarian dishes. It is known for its distinct sweet, salty, and spicy
          combinations. The cuisine is a reflection of the state’s rich culture and
          traditions, using locally sourced ingredients and ancient cooking techniques.
          From street food to royal dishes, Gujarat’s food offers a unique experience
          that reflects the state's history, diversity, and culinary creativity.
        </p>
      </section>

      <section className="cuisine-dishes">
        <h2>Popular Dishes You Must Try</h2>
        <ul>
          <li>Famous Dhokla</li>
          <li>Khandvi</li>
          <li>Undhiyu</li>
          <li>Handvo</li>
          <li>Farsan</li>
          <li>Gujarathi Thali</li>
          <li>Shrikhand</li>
          <li>Khichdi</li>
        </ul>
      </section>

      <section className="cuisine-experience">
        <h2>What to Expect from the Local Cuisine Experience</h2>
        <p>
          Gujarat’s local cuisine offers a range of taste experiences, from the
          tangy and spicy flavors of dishes like Khandvi and Dhokla to the sweet
          delights of Shrikhand and Puran Poli. A traditional Gujarati Thali is a
          must-try, which features a variety of dishes on a single platter, giving
          you a taste of the region's diverse food culture. The culinary journey
          also includes street food, with snacks like Farsan and Bhel Puri, perfect
          for a quick bite while exploring local markets.
        </p>
      </section>

      <footer className="cuisine-footer">
        <p>Indulge in Gujarat's culinary wonders for a memorable experience!</p>
      </footer>
    </div>
  );
};

export default LocalCuisineInGujarat;
