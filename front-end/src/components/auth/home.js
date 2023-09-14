import React, { useState, useEffect } from "react";
import './home.css';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';

function Home() {
    const [announcementData, setAnnouncementData] = useState([]);
    const [showItem, setShowItem] = useState(false); // Initially, hide the item
    const [hiddenAnnouncements, setHiddenAnnouncements] = useState([]); // To store the indices of hidden announcements

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/announcement/');
                setAnnouncementData(response.data.announcement);
                console.log(response.data.announcement);
            } catch (error) {
                console.log("Error:", error);
            }
        }

        fetchData();

        // Delay showing the item for 5 seconds
        const delay = 5000; // 5 seconds in milliseconds
        const timeoutId = setTimeout(() => {
            setShowItem(true);
        }, delay);

        // Clean up the timer when the component unmounts
        return () => clearTimeout(timeoutId);
    }, []);

    const handleClearClick = (index) => {
        // Add the index of the clicked announcement to hiddenAnnouncements
        setHiddenAnnouncements([...hiddenAnnouncements, index]);
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
            {showItem && (
                <div className="item">
                    {announcementData.map((data, index) => (
                        // Check if the index is not in the hiddenAnnouncements array
                        !hiddenAnnouncements.includes(index) && (
                            <div key={index} className="announcement">
                                <div>
                                    <ClearIcon
                                        style={{ marginLeft: '500px', color: 'black', cursor: 'pointer', marginTop: '10px' }}
                                        onClick={() => handleClearClick(index)}
                                    />
                                </div>
                                <div>
                                    <h1>{data.title}</h1>
                                    <p>{data.date}</p>
                                    <p>{data.extra_info}</p>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
