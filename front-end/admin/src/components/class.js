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
                console.log(response.data.data)
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
        console.log(name);
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
        <p>{subject.map((sub, subInde) => (
            <div className="container subject-name" key={subInde} style={{ boxShadow: '0 0 30px rgba(0,0,0,0.25)'}}> {sub.subject_name}</div>
        ))}</p>
        </>
    );
}

export default Class;
