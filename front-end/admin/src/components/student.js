import axios from "axios";
import React, { useEffect, useState } from "react";

function Student() {

    const [student, setStudent] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/requestapprove/student/');
                setStudent(response.data.data);
            } catch(error) {
                console.log("Error:", error);
            }
        }
        fetchData();
    }, []);
    const rows = [];
    for (let i = 0; i < student.length; i += 4) {
        rows.push(student.slice(i, i + 4));
    }

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
                            </div>
                        ))}
                        {row.length < 4 && (
                            // Replicate data to fill the row
                            Array.from({ length: 4 - row.length }).map((_, replicateIndex) => (
                                <div
                                    key={`replicate-${replicateIndex}`}
                                    className="card"
                                    style={{ minWidth: "500px", visibility: "hidden" }}
                                >
                                    {/* Empty card for replication */}
                                </div>
                            ))
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}

export default Student;