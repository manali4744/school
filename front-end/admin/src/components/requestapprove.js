import axios from "axios";
import React, { useEffect, useState } from "react";

function RequestApprove() {
    const [requestapprove, setRequestapprove] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/requestapprove/');
                setRequestapprove(response.data.data);
            } catch(error) {
                console.log("Error:", error);
            }
        }
        fetchData();
    }, []);

    const rows = [];
    for (let i = 0; i < requestapprove.length; i += 4) {
        rows.push(requestapprove.slice(i, i + 4));
    }

    const approveTeacher = async (id) => {
        console.log(id, "Approve Teacher");
        const response =  await axios.get(`http://127.0.0.1:8000/requestapprove/${id}/teacher/`);
        if (response.status===200){
            setRequestapprove((prevRequestApprove) =>
                prevRequestApprove.filter((item) => item.id !== id)
            );
        }
    };

    const approveStudent = async (id) => {
        console.log(id, "Approve Student");
        const response = await axios.get(`http://127.0.0.1:8000/requestapprove/${id}/student/`);
        if (response.status===200){
            setRequestapprove((prevRequestApprove) =>
                prevRequestApprove.filter((item) => item.id !== id)
            );
        }
    };

    return (
        <>
            <div className="container-fluid">
                {rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="row" style={{ justifyContent: "space-between" }}>
                        {row.map((request, index) => (
                            <div key={index} className="card" style={{ margin: "30px", minWidth: "500px" }}>
                                <div className="card-header">
                                    <div className="col-auto">{request.email}</div>
                                </div>
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>Name</td>
                                            <td>{request.name}</td>
                                        </tr>
                                        <tr>
                                            <td>is_teacher</td>
                                            <td>{request.is_teacher ? "Yes" : "No"}</td>
                                        </tr>
                                        <tr>
                                            <td>is_student</td>
                                            <td>{request.is_student ? "Yes" : "No"}</td>
                                        </tr>
                                        <tr>
                                            <td>Division</td>
                                            <td>{request.division}</td>
                                        </tr>
                                        <tr>
                                            <td>Standard</td>
                                            <td>{request.Standards}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="card-footer">
                                    <div className="row justify-content-between">
                                        <button
                                            type="button"
                                            className="btn"
                                            style={{ background: "#8081bb", color: "white", margin: "20px" }}
                                            onClick={() => approveTeacher(request.id)}
                                        >
                                            Teacher
                                        </button>
                                        <button
                                            className="btn"
                                            style={{ background: "#8081bb", color: "white", margin: "20px" }}
                                            onClick={() => approveStudent(request.id)}
                                        >
                                            Student
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {row.length < 4 && (
                            // Replicate data to fill the row
                            Array.from({ length: 4 - row.length }).map((_, replicateIndex) => (
                                <div
                                    key={`replicate-${replicateIndex}`}
                                    className="card"
                                    style={{ minWidth: "500px", minHeight: "500px", visibility: "hidden" }}
                                >
                                    {/* Empty card for replication */}
                                </div>
                            ))
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

export default RequestApprove;
