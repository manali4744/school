import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function AdmissionFormDetails() {
    const [admissiondetails, setAdmissiondetails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentData = admissiondetails.slice(startIndex, endIndex);

    const totalPages = Math.ceil(admissiondetails.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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
        <div className="container-fluid" style={{ margin: '100px', width: '70%' }}>
          <table className="table table-striped">
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
              {currentData.map((Admission, index) => (
                <tr key={Admission.id}>
                  <th scope="row">{startIndex + index + 1}</th>
                  <td>{Admission.firstName}</td>
                  <td>{Admission.lastName}</td>
                  <td>{Admission.emailaddress}</td>
                  <td>
                    <Link to={`/admissionmoreinfo/${Admission.id}`}>
                      <button>More</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav aria-label="Page navigation">
            <ul className="pagination">
              {Array.from({ length: totalPages }).map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      );
    };

export default AdmissionFormDetails;