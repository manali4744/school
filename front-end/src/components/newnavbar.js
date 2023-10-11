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
                <a className="nav-link" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">SERVICES</a>
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



// import React from "react";
// import './newnavbar.css'


// function Navbar() {
//     return (
//         <>
//         <ul class="nav justify-content-center">
//         <li class="nav-item">
//             <a class="nav-link active" aria-current="page" href="/">HOME</a>
//         </li>
//         <li class="nav-item">
//             <a class="nav-link" href="/aboutus">About</a>
//         </li>
//         <li class="nav-item dropdown">
//             <a class="nav-link" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">SERVICES</a>
//             <ul class="dropdown-menu">
//             <li><a class="dropdown-item" href="#">Academic Programming</a></li>
//             <li><a class="dropdown-item" href="#">Therapeutic Approach</a></li>
//             <li><a class="dropdown-item" href="#">School Engagement</a></li>
//             <li><a class="dropdown-item" href="#">Transition Services</a></li>
//             </ul>
//         </li>
//         <li class="nav-item">
//             <a class="nav-link" href="/enrollment">ENROLLMENT</a>
//         </li>
//         <li class="nav-item">
//             <a class="nav-link" href="#">Calendar</a>
//         </li>
//         <li class="nav-item">
//             <a class="nav-link" href="/staff">Staff</a>
//         </li>
//         <li class="nav-item">
//             <a class="nav-link" href="/login">Student</a>
//         </li>
//         <li class="nav-item">
//             <a class="nav-link" href="#">Feedback</a>
//         </li>
//         <li class="nav-item">
//             <a class="nav-link" href="#">Contact</a>
//         </li>
//         </ul>
//         </>
//     )
// };

// export default Navbar;