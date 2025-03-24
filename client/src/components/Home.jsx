import React from 'react';

const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-white flex flex-col items-center">
        {/* Navbar */}
        <nav className="w-full p-6 flex justify-between items-center border-b shadow-sm fixed top-0 bg-white z-50">
          <h1 className="text-3xl font-bold text-red-500">Vacation Rental</h1>
          <div className="flex space-x-6 text-gray-600 text-lg">
            <p className="hover:text-gray-900 cursor-pointer">Become a Host</p>
            <p className="hover:text-gray-900 cursor-pointer">Sign In</p>
          </div>
        </nav>

        {/* Hero Section */}
        <header 
          className="relative h-screen flex flex-col justify-center items-center text-white text-center bg-cover bg-center w-full mt-16" 
          style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?vacation,travel')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <h2 className="text-6xl font-extrabold relative z-10 drop-shadow-lg">Go Somewhere Special</h2>
          <p className="text-lg mt-4 relative z-10 drop-shadow-md">Discover unique stays and experiences</p>
        </header>

        {/* Featured Stays */}
        <section className="p-8 w-full max-w-7xl text-center">
          <h3 className="text-4xl font-bold mb-8 text-gray-800">Explore Top Stays</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[1, 2, 3].map((stay) => (
              <div key={stay} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300">
                <img src="/your-image-path.jpg" alt={`Stay ${stay}`} className="rounded-lg object-cover" />
                <h4 className="text-2xl font-semibold mt-4">Charming Stay {stay}</h4>
                <p className="text-gray-600 text-lg">From <span className="text-red-500 font-bold">$120/night</span></p>
                <button className="mt-4 bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition text-lg">View Details</button>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-100 text-gray-800 text-center p-6 w-full mt-12 border-t">
          <p className="text-lg">&copy; 2024 Staybnb. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default Home;
