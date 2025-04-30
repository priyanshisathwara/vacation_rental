import React from 'react';
import './KutchPage.css';
import { useNavigate } from 'react-router-dom';

const KutchPage = () => {
    const navigate = useNavigate();

    const places = [
        {
            name: "White Rann of Kutch",
            description: "A vast white salt desert that stretches to the horizon. Best visited during the Rann Utsav festival.",
            image: "/src/assets/whiterann.jpeg",
            path: "/white-rann"
        },
        {
            name: "Kala Dungar (Black Hill)",
            description: "The highest point in Kutch offering panoramic views of the Rann. Famous for the Dattatreya Temple.",
            image: "/src/assets/kaladungar.jpg",
            path: "/kala-dungar"
        },
        {
            name: "Bhuj",
            description: "A historical city with palaces like Prag Mahal, Aina Mahal and vibrant local markets.",
            image: "/src/assets/bhuj.webp",
             path: "/bhuj"

        },
        {
            name: "Mandvi Beach",
            description: "A serene beach town with golden sand, camel rides, and the historic Vijay Vilas Palace.",
            image: "/src/assets/mandvi.jpg",
             path: "/mandavi-beach"
        },
        {
            name: "Kutch Museum",
            description: "The oldest museum in Gujarat, showcasing tribal culture, textiles, weapons, and more.",
            image: "/src/assets/museem.jpg",
            path : "/kutch-museum"
        }
    ];

    return (
        <div className="kutch-container">
            <h1>Explore the Wonders of Kutch</h1>
            <p className="intro">
                Kutch, located in the westernmost part of Gujarat, is known for its diverse landscapes,
                unique culture, handicrafts, and heritage. Here are some must-visit places:
            </p>

            <div className="kutch-experience">
                <h2>Why Kutch is a Must-Visit Destination</h2>
                <p>Kutch is not just a place—it's an emotion...</p>
                {/* (Other content omitted for brevity) */}
            </div>

            <div className="places-grid">
                {places.map((place, index) => (
                    <div
                        className="place-card"
                        key={index}
                        onClick={() => {
                            if (place.path) navigate(place.path);
                        }}
                        style={{ cursor: place.path ? "pointer" : "default" }}
                    >
                        <img src={place.image} alt={place.name} className="place-image" />
                        <h2>{place.name}</h2>
                        <p>{place.description}</p>
                        {place.path && <span className="read-more-link">Read more →</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KutchPage;
