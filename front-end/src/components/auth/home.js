import React, { useState, useEffect } from "react";
import './home.css';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';

function Home() {
    const [announcementData, setAnnouncementData] = useState([]);
    const [showItem, setShowItem] = useState(false); // Initially, hide the item
    const [hiddenAnnouncements, setHiddenAnnouncements] = useState([]); // To store the indices of hidden announcements
    const  [eventdata, setEventdata] = useState([]);

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

        async function fetchAnotherData() {
            try {
                // Call the second API
                const response2 = await axios.get('http://127.0.0.1:8000/event/');
                // Process the response from the second API as needed
                setEventdata(response2.data.event)
            } catch (error) {
                console.log("Error:", error);
            }
        }

        fetchData();
        
        setTimeout(() => {
            fetchAnotherData();
        }, 3000); 


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
        <>
        <div>
            <div className="container-fluid">
                <img src="http://127.0.0.1:3000/img/graduate.avif" alt="" style={{width: "50%", height: "90%"}}/>
            </div>
            <div className="container-fluid" style={{marginBottom: "70px"}}>
                <div className="row color">
                    <div className="col">
                        <div class="card">
                            <img src="http://127.0.0.1:3000/img/academic_programming.png" class="card-img-top" alt="..."/>
                            <div class="card-body">
                                <h5 class="card-title">Academic <br/>Programming</h5>
                                <p class="card-text">Our Academy offers a comprehensive curriculum aligned <br/>with Connecticut State Standards. </p>
                                <a href="#" class="btn btn-primary">Learn more</a>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div class="card">
                            <img src="http://127.0.0.1:3000/img/therapeutic_Approch.png" class="card-img-top" alt="..."/>
                            <div class="card-body">
                                <h5 class="card-title">Therapeutic<br/>Approach </h5>
                                <p class="card-text">Our Therapeutic Approach is what makes Academy a <br/>truly unique school environment for our students.</p>
                                <a href="#" class="btn btn-primary">Learn more</a>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div class="card">
                            <img src="http://127.0.0.1:3000/img/school_engagement.png" class="card-img-top" alt="..."/>
                            <div class="card-body">
                                <h5 class="card-title">School Engagement<br/>Services </h5>
                                <p class="card-text">We recognize that school is not easy for many students. For<br/> some students, it is simply overwhelming. </p>
                                <a href="#" class="btn btn-primary">Learn more</a>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div class="card">
                            <img src="http://127.0.0.1:3000/img/transition_services.png" class="card-img-top" alt="..."/>
                            <div class="card-body">
                                <h5 class="card-title">Transition<br/>Services</h5>
                                <p class="card-text">In working with even our youngest students, we have their <br/>long-term future in mind. </p>
                                <a href="#" class="btn btn-primary">Learn more</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid justify-content-center">
                <h1 className="home-h1">Welcome to Academy </h1>
                <p className="home-p">At Our Academy, we recognize and cultivate each student’s strengths and talents, while providing individualized instruction to meet his or<br/> 
                her unique learning needs. Our unique approach of embedding therapeutic supports throughout the academic school day allows us to <br/>
                provide students with an environment in which they feel safe to learn, grow, and build positive relationships. Each student at Hope Academy <br/>receives individualized instruction aligned with the Connecticut State Standards as well as targeted intervention using specialized <br/>
                methodologies when appropriate. Emphasis is placed on college and career readiness, and the development of executive functioning skills<br/>
                for all students. </p>
                < a href="#" className="btn btn-primary">Learn more</a>
            </div>
        <div className="container-fluid" style={{height: "150px"}}>

        </div>
        <div className="container-fluid">
            <div className="row calendar">
                <div className="col">
                <img src="http://127.0.0.1:3000/img/Sports-PNG-Image.png" alt="" style={{width: "80%"}}/>
                </div>
                <div className="col calendar">
                    <div class="container event">
                        <div class="item-start">
                            <h1 class="event">Upcoming event date</h1>
                        </div>
                        <div class="item-end">
                            <a href="/event" class="btn">All Events</a>
                        </div>
                    </div>
                    <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Start-date</th>
                        <th scope="col">End-date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventdata.map((eventEntry, index) => (
                            <tr key={index}>
                                <td>{eventEntry.sub_title}</td>
                                <td>{eventEntry.start_date}</td>
                                <td>{eventEntry.end_date}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div className="container-fluid" style={{height: "150px"}}>
        </div>

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
        </>
    );
}

export default Home;
