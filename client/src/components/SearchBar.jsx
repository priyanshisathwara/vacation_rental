import React, { useState, useEffect } from 'react';
import './seachbar.css';
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(-1);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSearch(e.target.value);
        setSelectedItem(-1); // Reset selection on new input
    };

    const handleClose = () => {
        setSearch("");
        setSearchData([]);
        setSelectedItem(-1);  // ✅ Fixed
    };

    console.log("Selected Item Index:", selectedItem);
    console.log("Selected Item Data:", searchData[selectedItem]);

    const handleKeyDown = (e) => {
        if (searchData.length === 0) return; // Avoid accessing an empty array

        if (e.key === "ArrowUp" && selectedItem > 0) {
            setSelectedItem(prev => prev - 1);
        } else if (e.key === "ArrowDown" && selectedItem < searchData.length - 1) {
            setSelectedItem(prev => prev + 1);
        } else if (e.key === "Enter") {
            if (selectedItem >= 0 && selectedItem < searchData.length) {
                const selected = searchData[selectedItem];
                console.log("Search Data Length:", searchData.length);
                console.log("Selected Item Index:", selectedItem);

                if (selected?.id) {
                    navigate(`/places/${selected.id}`); // ✅ Navigating correctly
                } else if (selected?.city) {
                    navigate(`/places/name/${encodeURIComponent(selected.city)}`);
                } else {
                    console.error("City data is missing required fields:", selected);
                }
            } else {
                console.warn("Invalid selectedItem index:", selectedItem);
            }
        }
    };

    const handleCityClick = (city) => {
        if (city.id) {
            navigate(`/places/${city.id}`);
        } else if (city.city) {
            navigate(`/places/name/${encodeURIComponent(city.city)}`);
        } else {
            console.error("City data is missing required fields:", city);
        }
    };

    useEffect(() => {
        if (search.trim() !== "") {
            axios.post("http://localhost:8000/api/auth/search", { query: search })
                .then((res) => {
                    console.log("API Response:", res.data);
                    setSearchData(Array.isArray(res.data) ? res.data : []);
                })
                .catch(err => {
                    console.error("Error fetching search results:", err);
                    setSearchData([]);
                });
        } else {
            setSearchData([]);
        }
    }, [search]);  // ✅ Removed `searchData` from dependencies

    return (
        <section className='search-section'>
            <div className='search-input-div'>
                <input
                    type='text'
                    className='search-input'
                    placeholder='Search...'
                    autoComplete='off'
                    onChange={handleChange}
                    value={search}
                    onKeyDown={handleKeyDown}
                />
                <div className='search-icon'>
                    {search === "" ? (
                        <AiOutlineSearch size={24} color="#FFFFFF" />
                    ) : (
                        <AiOutlineClose size={24} color="#FFFFFF" onClick={handleClose} />
                    )}
                </div>
            </div>

            {searchData.length > 0 && (
                <div className="search-result">
                    {searchData.map((data, index) => (
                        <div key={index}
                            onClick={() => handleCityClick(data)}
                            className={selectedItem === index ? 'search-suggestion-line active' : 'search-suggestion-line'}>
                            {data.city}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
