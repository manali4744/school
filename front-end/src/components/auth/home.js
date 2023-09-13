import React, { useState, useEffect } from "react";
import './home.css';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';

function Home() {
    const [announcementdata, setAnnouncementdata] = useState([]);
    const [showAnnouncement, setShowAnnouncement] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/announcement/');
                setAnnouncementdata(response.data.announcement);
                console.log(response.data.announcement);
            } catch (error) {
                console.log("Error:", error);
            }
        }

        fetchData();

        // Set a timeout to show the announcement after 5 seconds
        const timer = setTimeout(() => {
            setShowAnnouncement(true);
        }, 5000);

        // Clean up the timer when the component unmounts
        return () => clearTimeout(timer);
    }, []);

    const handleClearClick = () => {
        setShowAnnouncement(false);
    };

    return (
        <div>
            <style>
                {`
                    body {
                        background-image: url("http://127.0.0.1:3000/img/background.avif");
                        background-size: cover;
                        height: 50vh;
                        margin: 0;
                        padding: 0;
                    }
                `}
            </style>
            <div>
                {showAnnouncement && announcementdata.map((data, index) => (
                    <div key={index} className="announcement">
                        <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
                            <div>
                                <ClearIcon
                                    style={{ marginLeft: '750px', marginTop: '10px', color: 'black', cursor: 'pointer' }}
                                    onClick={handleClearClick}
                                />
                            </div>
                        </div>
                        <div>
                                {/* Render your announcement data here */}
                                <h1>{data.title}</h1>
                                <p>{data.date}</p>
                                <p>{data.extra_info}</p>
                            </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
