import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import './css/class.css';
import { useNavigate } from 'react-router-dom';

function Class() {
    const { std } = useParams(); // Assuming you want to use the 'int' parameter from the URL
    const [subject, setSubject] = useState([]);
    const navigate = useNavigate();
    // Define your divisions
    const divisions = [
        "A", "B", "C", "D"
    ];

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/subject/${std}`);
                setSubject(response.data.data.subject)
            } catch(error) {
                console.log("Error:", error);
            }
        }
        fetchData();
    }, []);

    const handleClick = (index) => {
        const name = index
        navigate(`/class/${std}/${name}`)
    }


    return (
        <>
        <div className="container subject">
            <div className="row">
                {divisions.map((divName, index) => (
                <button className="div" key={index} onClick={() => handleClick(divName)}>
                    {divName}
                </button>
                ))}
            </div>
        </div>
        <h1>Exploring Subjects</h1>
        <div className="container">
            <div class="row">
                <div className="col col-30">
                    {subject.map((sub, subInde) => (
                    <p key={subInde}> {sub.subject_name}</p>
                    ))}
                </div>
                <div className="col col-70">
                    <h1>ADD - UPDATE- DELETE</h1>
                </div>
            </div>
        </div>
        </>
    );
}

export default Class;
