import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import the Link component
import './newnavbar.css';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt_token');

    const handleStudentClick = () => {
        try {
          if (!token) {
            navigate('/login');
          } else {
            navigate('/information');
          }
        } catch (error) {
          console.error('An error occurred during navigation:', error);
        }
    };
    
    const handleStudentLogout = () => {
        localStorage.removeItem('jwt_token');
        navigate('/login')
    }

    return (
        <ul className="nav justify-content-center">
            <li className="nav-item">
                <Link className="nav-link active" to="/">HOME</Link> {/* Use Link */}
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/aboutus">About</Link> {/* Use Link */}
            </li>
            <li className="nav-item dropdown">
                <Link className="nav-link" data-bs-toggle="dropdown" to="#" role="button" aria-expanded="false">SERVICES</Link>
                <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/academicprogramming">Academic Programming</Link></li> {/* Use Link */}
                    <li><Link className="dropdown-item" to="/therapeuticapproach">Therapeutic Approach</Link></li> {/* Use Link */}
                    <li><Link className="dropdown-item" to="/schoolengagement">School Engagement</Link></li> {/* Use Link */}
                    <li><Link className="dropdown-item" to="/transitionservices">Transition Services</Link></li> {/* Use Link */}
                </ul>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/enrollment">ENROLLMENT</Link> {/* Use Link */}
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="#">Calendar</Link> {/* Use Link */}
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/staff">Staff</Link> {/* Use Link */}
            </li>
            <li className="nav-item">
                <a className="nav-link student" onClick={handleStudentClick}>Student</a> {/* Use Link */}
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="#">Feedback</Link> {/* Use Link */}
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="#">Contact</Link> {/* Use Link */}
            </li>
            {token &&  <li className="nav-item">
                <a className="nav-link student" onClick={handleStudentLogout}>Logout</a> {/* Use Link */}
            </li>}
        </ul>
    );
}

export default Navbar;