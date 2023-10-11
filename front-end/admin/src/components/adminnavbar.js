import React from "react";
import './css/adminnavbar.css'

function AdminNavbar () {
    const token = localStorage.getItem('jwt_token');
    const handleAdminLogout = () => {
        localStorage.removeItem('jwt_token');
    }
    return (
        <>
        <ul className="nav justify-content-center">
            <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/admin">HOME</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/aboutus">About</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/enrollment">ENROLLMENT</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/requestapprove">Request Approve</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/staff">Staff</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/student">Student</a>
            </li>
            {token &&  <li className="nav-item">
                <a className="nav-link" href="/" onClick={handleAdminLogout}>Logout</a>
            </li>}
        </ul>
        </>
    )
};


export default AdminNavbar;