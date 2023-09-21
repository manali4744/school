import axios from "axios";
import React, { useEffect, useState } from "react";

function AdmissionFormDetails() {
    const [admissiondetails, setAdmissiondetails] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/admissionform/');
                setAdmissiondetails(response.data.data);
            } catch(error) {
                console.log("Error:", error);
            }
        }
        fetchData();
    }, []);
    return (
        <div className="container-fluid" style={{margin: "100px", width: "70%"}}>
        <table class="table table-striped">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">First-Name</th>
                <th scope="col">Last-Name</th>
                <th scope="col">Email</th>
                <th scope="col">More</th>
                </tr>
            </thead>
                <tbody>
                    {admissiondetails.map((Admission, index)=>(
                    <tr>
                    <th scope="row">{index}</th>
                    <td>{Admission.firstName}</td>
                    <td>{Admission.lastName}</td>
                    <td>{Admission.emailaddress}</td>
                    <td><button>more</button></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

};

export default AdmissionFormDetails;