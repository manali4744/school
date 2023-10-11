import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './css/division.css'
import axios from "axios";

function Division () {
    const { div, std } = useParams();
    const [student, setStudent] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await axios.get(`http://127.0.0.1:8000/student/${std}/${div}/`)
                setStudent(response.data.data)
            } catch(error){
                console.log('Error:', error);
            }
        }
        fetchData();
    }, []);
    return (
        <>
        <div className="container division">
            <div className="row">
            {student.map((student, index) => (
                <div className="studentinfo" key={index}>
                    <div className="item">
                        <h1>{index+1}</h1>
                    <div className="student">
                        <table className="student-table">
                            <tr>
                                <th>Name</th>
                                <th>:{student.name}</th>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <th>:{student.email}</th>
                            </tr>
                            <tr>
                                <th>Gender</th>
                                <th>:{student.gender}</th>
                            </tr>
                            <tr>
                                <th>Division</th>
                                <th>:{student.division}</th>
                            </tr>
                            <tr>
                                <th>Standard</th>
                                <th>:{student.Standards}</th>
                            </tr>
                        </table>
                    </div>
                    </div>
                </div>
            ))}  
            </div>
        </div>
        </>
    )
};

export default Division;