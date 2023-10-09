import React, { useEffect, useState } from "react";
import './event.css'
import axios from "axios";
import TurnedInIcon from '@mui/icons-material/TurnedIn';


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
            <div className="container-fluid">
                <img src="http://127.0.0.1:3000/img/event.avif" alt="" style={{width: "20%", height: "20%"}}/>
            </div>
            <div className="container">
                <h1 className="event-heading">Event Details</h1>
            </div>
            {eventdata.map((eventEntry, index) => (
            <div className="container" style={{ boxShadow: '0 0 30px rgba(0,0,0,0.15)'}}>
                <div className="row row-shadow">
                    <div className="col-70">
                    <div className="row-cal-white">
                    </div>
                    <div className="row-cal-white">
                        <div className="overview">
                            <div className="overviewtitle">
                                <h4>{eventEntry.sub_title}</h4>
                            </div>
                            <p>{eventEntry.description}</p>
                        </div>
                    </div>
                    </div>
                    <div className="col-30">
                        <div className="row-cal-gray">
                            <div className="event-date">
                            <TurnedInIcon className="icon"/>
                                {/* <p className="event-day">3</p>
                                <p className="event-month">oct</p>
                                <p className="event-year">2023</p> */}
                            </div>
                            <h3 className="event-title">{eventEntry.title}</h3>
                            <h4 className="event-coordinator">Coordinator</h4>
                            <p>{eventEntry.coordinator}</p>
                        </div>
                        <div className="row-cal-white">
                            <div className="details">
                                <h4>Date</h4>
                                <p>
                                <span>{eventEntry.start_date}</span>
                                <span></span>
                                <br />
                                <span>{eventEntry.end_date}</span>
                                </p>
                                <h4>Location</h4>
                                <p>{eventEntry.GD_Room}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ))
            }
        </div>
        </>
    )

};

export default Event;