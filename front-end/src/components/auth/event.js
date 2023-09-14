import React, { useEffect, useState } from "react";
import './event.css'
import axios from "axios";


function Event()  {
    const  [eventdata, setEventdata] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/event/');
                setEventdata(response.data.event)
            } catch (error) {
                console.log("Error:", error)
            }
        }
        fetchData();
    }, []);
    return (
        <>
        <div>
        <style>
                {`
                    body {
                        background-image: url("http://127.0.0.1:3000/img/event_announcement.jpg");
                        background-size: cover;
                        height: 50vh;
                        margin: 0;
                        padding: 0;
                    }
                `}
            </style>
            <div className="container">
                {eventdata.map((eventEntry, index) => (
                    <div key={index} className="card" style={{margin:'20px'}}>
                        <div className="card-header" >{eventEntry.sub_title}</div>
                        <div class="card-body">
                            <h5 class="card-title">{eventEntry.title}</h5>
                            <div class="date-display">
                                <span class="date start-date">Start :{eventEntry.start_date}</span><br/>
                                <span class="date end-date">End     : {eventEntry.end_date}</span>
                            </div>
                            <p className="data-text">
                                {eventEntry.description}
                            </p>
                            <div className="date">
                                <span className="coordinator">Coordinator</span>
                            </div>
                            <ul class="bullet-list">
                                <li>{eventEntry.coordinator}</li>
                            </ul>
                            <div className="date">
                                <span className="coordinator">Co-coordinator</span>
                            </div>
                            <ul class="bullet-list">
                                {eventEntry.co_coordinator.map((i, j)=> (
                                    <li>
                                        {i}
                                    </li>
                                ))}
                            </ul>
                            <div className="date coordinator">Venue</div>
                            <ul class="bullet-list">
                                <li>{eventEntry.GD_Room}</li>
                            </ul>
                        </div>
                    </div>
                ))

                }
            </div>
        </div>
        </>
    )

};

export default Event;