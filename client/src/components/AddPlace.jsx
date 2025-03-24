import React, { useState } from 'react';
import "./AddPlace.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function AddPlace() {
  const [formData, setFormData] = useState({
    place_name: '',
    location: '',
    price: '',
    owner_name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? Number(value) : value  
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data before sending:", formData); 

    try {
        const response = await axios.post('http://localhost:8000/api/admin/create-place', formData);
        console.log("Response:", response.data);
        toast.success("Place added successfully!");

        setFormData({
          place_name: '',
          location: '',
          price: '',
          owner_name: ''
        });

    } catch (error) {
        console.error("Error adding place:", error.response ? error.response.data : error.message);
        toast.error("Failed to add place. Please try again!");
    }
};

  

  return (
    <div className="form-container">
      <h2>Add Place</h2>
      <form onSubmit={handleSubmit} className="place-form">
        <div className="form-group">
          <label htmlFor="place_name">Place Name</label>
          <input
            type="text"
            id="place_name"
            name="place_name"
            value={formData.place_name}
            onChange={handleChange}
            placeholder="Enter the place name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter the location"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter the price"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="owner_name">Owner Name</label>
          <input
            type="text"
            id="owner_name"
            name="owner_name"
            value={formData.owner_name}
            onChange={handleChange}
            placeholder="Enter the owner's name"
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      <ToastContainer/>
    </div>
  );
}
