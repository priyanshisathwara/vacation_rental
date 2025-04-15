import React from 'react';
import Navbar from './Navbar';
import SearchBar from './SearchBar';  // ✅ Import SearchBar component
import "./home.css";

const Home = () => {
  return (
    <>
      <div className='home-container'>
        <Navbar />
        
        <div className="search-bar-container">
          <SearchBar />
        </div>
      </div>
      {/* <PlacesList /> */}
    </>
  );
};

export default Home;
