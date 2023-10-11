import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './css/admissionmoreinfo.css';
import ShowModal from './showmodal';
import { useNavigate } from 'react-router-dom';

function AdmissionMoreInfo () {
    const { id } = useParams();
    const [admissionmore, setAdmissionMore] = useState([]);

    const [showdelete, setShowDelete] = useState(false)
    const [showaccept, setShowAccept] = useState(false)
    const [showreject, setShowReject] = useState(false)
    
    const closedeletemodal = () => setShowDelete(false)
    const closeacceptmodal = () => setShowAccept(false)
    const closerejectmodal = () => setShowReject(false)

    const navigate = useNavigate();

    const deletedata = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/admissionform/${id}/`);
           navigate('/enrollment')
        } catch (error) {
            console.error("Error deleting data:", error);
            // Handle error here (e.g., show an error message)
        }
    };

    const deleteModal = (
        <ShowModal closeModal={closedeletemodal}>
            <h1>Are you sure you want to delete?</h1>
            <div className="button-container">
                <button onClick={closedeletemodal} className="btn btn-dark">NOT SURE</button>
                <button className="btn btn-danger" onClick={deletedata}>SURE</button>
            </div>    
        </ShowModal>
    )

    const accept = async () => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/admissionform/accept/${id}/`);
            navigate('/enrollment')
        } catch (error) {
            console.error("Error deleting data:", error);
            // Handle error here (e.g., show an error message)
        }
    }

    const acceptModal = (
        <ShowModal closeModal={closeacceptmodal}>
            <h1>Are you sure you want to accept?</h1>
            <div className="button-container">
                <button onClick={closeacceptmodal} className="btn btn-info">NOT SURE</button>
                <button className="btn btn-success" onClick={accept}>SURE</button>
            </div>    
        </ShowModal>
    )

    const reject = async () => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/admissionform/reject/${id}/`);
            navigate('/enrollment')
        } catch (error) {
            console.error("Error deleting data:", error);
            // Handle error here (e.g., show an error message)
        }
    }

    const rejectModal = (
        <ShowModal closeModal={closerejectmodal}>
            <h1>Are you sure you want to reject?</h1>
            <div className="button-container">
                <button onClick={closerejectmodal} className="btn btn-info">NOT SURE</button>
                <button className="btn btn-danger" onClick={reject}>SURE</button>
            </div>    
        </ShowModal>
    )
    
    
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
    }, [id])
    

    return (
        <>
        <div className="container" style={{marginTop: '50px'}}>
            <div style={{padding: "10px", marginBottom: "10px" , width: "100%"}} id = "admissionform">
                <div className="card" style={{width: "100%"}}>
                    <div className="card-header">
                    <h1> {admissionmore.firstName} {admissionmore.lastName}</h1>
                    </div>
                    <table className="table">
                    <tbody>
                    <tr>
                        <td>First Name</td>
                        <td>{admissionmore.firstName}</td>
                    </tr>
                    <tr>
                        <td>Last Name</td>
                        <td>{admissionmore.lastName}</td>
                    </tr>
                    <tr>
                        <td>Father Name</td>
                        <td>{admissionmore.father_name}</td>
                    </tr>
                    <tr>
                        <td>Mother Name</td>
                        <td>{admissionmore.mother_name}</td>
                    </tr>
                    <tr>
                        <td>Birthdate</td>
                        <td>{admissionmore.birthdate}</td>
                    </tr>
                    <tr>
                        <td>Gender</td>
                        <td>{admissionmore.gender}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>{admissionmore.address}</td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td>{admissionmore.city}</td>
                    </tr>
                    <tr>
                        <td>Country</td>
                        <td>{admissionmore.country}</td>
                    </tr>
                    <tr>
                        <td>Zipcode</td>
                        <td>{admissionmore.zipcode}</td>
                    </tr>
                    <tr>
                        <td>Phone Number</td>
                        <td>{admissionmore.phonenumber}</td>
                    </tr>
                    <tr>
                        <td>Email Address</td>
                        <td>{admissionmore.emailaddress}</td>
                    </tr>
                    <tr>
                        <td>Blood Group</td>
                        <td>{admissionmore.bloodgroup}</td>
                    </tr>
                    </tbody>
                    </table>
                </div>
                <div className="row">
                    <button className="btn btn-primary" onClick={() => setShowReject(true)}>Rejected</button>
                    {showreject &&  rejectModal}
                    <button className="btn btn-success" onClick={() => setShowAccept(true)}>Accept</button>
                    {showaccept &&  acceptModal}
                    <button className="btn btn-danger" onClick={() => setShowDelete(true)}>Delete</button>
                    {showdelete &&  deleteModal}
                </div>
            </div>
        </div>
        </>
    )
};

export default AdmissionMoreInfo;