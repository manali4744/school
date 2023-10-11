import React from "react";
import './css/adminnavbar.css'
import { Link } from 'react-router-dom';

function AdminNavbar () {
    const token = localStorage.getItem('jwt_token');
    const handleAdminLogout = () => {
        localStorage.removeItem('jwt_token');
    }
    return (
        <>
        <ul className="nav justify-content-center">
            <li className="nav-item">
                <Link className="nav-link active" to="/admin">HOME</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/aboutus">About</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/enrollment">ENROLLMENT</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/requestapprove">Request Approve</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/staff">Staff</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/student">Student</Link>
            </li>
            {token &&  <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleAdminLogout}>Logout</Link>
            </li>}
        </ul>
        </>
    )
};


export default AdminNavbar;