import React from "react";
import './newnavbar.css'


function Navbar() {
    return (
        <>
        <ul class="nav justify-content-center">
        <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">HOME</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/aboutus">About</a>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">SERVICES</a>
            <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Academic Programming</a></li>
            <li><a class="dropdown-item" href="#">Therapeutic Approach</a></li>
            <li><a class="dropdown-item" href="#">School Engagement</a></li>
            <li><a class="dropdown-item" href="#">Transition Services</a></li>
            </ul>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/enrollment">ENROLLMENT</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Calendar</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Staff</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/login">Student</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Feedback</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Contact</a>
        </li>
        </ul>
        </>
    )
};

export default Navbar;