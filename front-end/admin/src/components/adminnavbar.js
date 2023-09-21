import React from "react";
import './css/adminnavbar.css'

function AdminNavbar () {
    return (
        <>
        <ul class="nav justify-content-center">
        <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">HOME</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/aboutus">About</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/enrollment">ENROLLMENT</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/requestapprove">Request Approve</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/staff">Staff</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/student">Student</a>
        </li>
        </ul>
        </>
    )
};


export default AdminNavbar;