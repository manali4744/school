import React, { useEffect} from "react";
import './css/home.css';
import { useNavigate } from 'react-router-dom';


function AdminHome() {
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt_token');
    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

    const boxData = [
        "Class 1", "Class 2", "Class 3", "Class 4",
        "Class 5", "Class 6", "Class 7", "Class 8",
        "Class 9", "Class 10", "Class 11", "Class 12"
    ];

    const handleClick = (index) => {
        const name = index.substring(6); 
        navigate(`/class/${name}`)
    }

    return (
        <>
        <div className="container">
            {boxData.map((box, index) => (
                <div className="row" key={index}>
                    {boxData.slice(index * 4, (index * 4) + 4).map((boxItem, i) => (
                        <button className="box" key={i} onClick={() => handleClick(boxItem)}>
                            {boxItem}
                        </button>
                    ))}
                </div>
            ))}
        </div>
        </>
    );
}

export default AdminHome;
