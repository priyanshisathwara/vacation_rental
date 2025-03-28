import React, { useState } from 'react';
import "./AddPlace.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function AddPlace() {
  const [formData, setFormData] = useState({
    place_name: '',
    location: '',
    price: '',
    owner_name: '',
    city: ''
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
      if (response.status === 201) {
        toast.success("Place added successfully!");
        setFormData({ place_name: '', location: '', price: '', owner_name: '', city: '' }); // Reset form
      }

    } catch (error) {
      console.error("Error adding place:", error.response ? error.response.data : error.message);

      if (error.response?.data?.error === "Invalid Price") {
        toast.error(`Invalid price! Suggested range for ${formData.city}: ₹${(error.response.data.averagePrice * 0.9).toFixed(2)} - ₹${(error.response.data.averagePrice * 1.1).toFixed(2)}`);
      } else if (error.response?.data?.error === "City not found in database") {
        toast.error("Selected city is not available in our database.");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };



  return (
    <div className="add-place-page">
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
          <div className="form-group">
            <label htmlFor="city">City</label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            >
              <option value="">Select City</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Surat">Surat</option>
              <option value="Vadodara">Vadodara</option>
              <option value="Rajkot">Rajkot</option>
              <option value="Bhavnagar">Bhavnagar</option>
              <option value="Jamnagar">Jamnagar</option>
              <option value="Gandhinagar">Gandhinagar</option>
              <option value="Junagadh">Junagadh</option>
              <option value="Anand">Anand</option>
              <option value="Nadiad">Nadiad</option>
              <option value="Morbi">Morbi</option>
              <option value="Mehsana">Mehsana</option>
              <option value="Bharuch">Bharuch</option>
              <option value="Vapi">Vapi</option>
              <option value="Navsari">Navsari</option>
              <option value="Porbandar">Porbandar</option>
              <option value="Gondal">Gondal</option>
              <option value="Patan">Patan</option>
              <option value="Dahod">Dahod</option>
              <option value="Amreli">Amreli</option>
            </select>
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
