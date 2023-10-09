import './enrollment.css'
import { Button, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

function Enrollment() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const  [feesdata, setFeesdata] = useState([]);
    const [admission, setAdmission] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/fees/');
                setFeesdata(response.data.fees)
                setAdmission(response.data.is_admission)
                localStorage.setItem('admissionID', response.data.is_admission);
                console.log(typeof(response.data.is_admission))
            } catch (error) {
                console.log("Error:", error)
            }
        }
        fetchData();
    }, []);

    return (
        <>
        <div className="container" style={{height: "100px"}}></div>
         <div className="container">
            <div className="row">
                <div className="col">
                <h1>Prepare for Enrollment</h1>
                <ul>
                <li>
                The school creates clear enrollment guidelines, including eligibility criteria, required documents, and fees.
                </li>
                <li>
                The school announces the admission dates when parents can apply.
                </li>
                </ul>
                </div>
                <div className="col">
                    <img src="http://127.0.0.1:3000/img/prepare.avif" alt="" style={{width: "70%"}}/>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col">
                    <img src="http://127.0.0.1:3000/img/submit_application.avif" alt="" style={{width: "70%"}}/>
                </div>
                <div className="col">
                <h1>Submit Application</h1>
                <ul>
                    <li>
                    Parents pick up an application form from the school's office or access it online.
                    </li>
                    <li>
                    Parents complete the application form with accurate information.
                    </li>
                </ul>
                {admission && (
                    <Link to="/admissionform">
                        <Button variant="primary" onClick={handleShow}>
                            Enrollment
                        </Button>
                    </Link>
                )}
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col">
                <h1>Submit Documents</h1>
                <ul>
                    <li>
                    Parents provide a copy of the student's birth certificate to verify their age.
                    </li>
                    <li>
                    They submit proof of residence, such as a utility bill.
                    </li>
                    <li>
                    If the student is transferring from another school, parents provide previous academic <br/>
                    records and a transfer certificate.
                    </li>
                    <li>
                    Recent passport-size photographs of the student are attached.
                    </li>
                </ul>
                </div>
                <div className="col">
                    <img src="http://127.0.0.1:3000/img/submit_document.avif" alt="" style={{width: "70%"}}/>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col">
                    <img src="http://127.0.0.1:3000/img/assessment.avif" alt="" style={{width: "70%"}}/>
                </div>
                <div className="col">
                <h1>Assessment</h1>
                <ul>
                    <li>
                    schools may conduct a simple assessment<br/>
                    or interview to understand the student's skills and readiness for the 5th grade.
                    </li>
                </ul>
                </div>
            </div>
        </div>
        <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Payment of Fees</h1>
                        <ul>
                            <li>Parents pay the required admission fees and any additional charges.</li>
                            <Button variant="primary" onClick={handleShow}>
                                Learn more
                            </Button>
                            <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
                                <Modal.Header closeButton>
                                    <Modal.Title>Fees structure</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <table className="table">
                                <thead>
                                    <tr>
                                    <th scope="col">Standard</th>
                                    <th scope="col">academic_fee</th>
                                    <th scope="col">lunch_fee</th>
                                    <th scope="col">Co_curricular_fee</th>
                                    <th scope="col">Transport_fee</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {feesdata.map((fee, index) => (
                                        <tr key={index}>
                                            <td>{fee.standard}</td>
                                            <td>{fee.academic_fee}</td>
                                            <td>{fee.lunch_fee}</td>
                                            <td>{fee.co_curricular_fee}</td>
                                            <td>{fee.transport_fee}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                </table>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </ul>
                    </div>
                    <div className="col">
                        <img src="http://127.0.0.1:3000/img/payment.avif" alt="" style={{ width: "70%" }} />
                    </div>
                </div>
            </div>
        <div className="container">
            <div className="row">
                <div className="col">
                    <img src="http://127.0.0.1:3000/img/confirm.avif" alt="" style={{width: "70%"}}/>
                </div>
                <div className="col">
                <h1>Confirmation</h1>
                <ul>
                    <li>
                    Once the application is accepted,<br/> the school provides an admission confirmation letter or receipt.
                    </li>
                </ul>
                </div>
            </div>
        </div>
        </>
    )
};

export default Enrollment;