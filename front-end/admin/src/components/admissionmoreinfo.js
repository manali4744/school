import React from "react";
import { useMatch } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

function AdmissionMoreInfo () {
    const match = useMatch('/admissionmoreinfo/:id');
   
    const { params } = match;
    const id = params.id; // Access the ID parameter

    const [admissionmore, setAdmissionMore] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/admissionform/${id}/`)
                setAdmissionMore(response.data.data);
            } catch (error) {
                console.log("Error:", error);
            }
        }
        fetchData();
    }, [])
    

    return (
        <>
            <h1> Admission Info</h1>
            <p>ID: {id}</p>
            <p>{admissionmore.bloodgroup}</p>
        </>
    )
};

export default AdmissionMoreInfo;