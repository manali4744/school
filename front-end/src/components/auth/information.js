import React, { useState, useEffect } from "react";
import axios from "axios";
import './information.css';
import { useNavigate } from 'react-router-dom';

function Information() {

  const navigate = useNavigate();
  const token = localStorage.getItem('jwt_token')
  if (!token){
    navigate('/login')
  }


  const [resultData, setResultData] = useState(null);
  const [grade, setGrade] = useState(null);
  const [total, setTotal] = useState(null);
  const [pass, setPass] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('jwt_token')
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`http://127.0.0.1:8000/getresult/`, config);
        const { Result, Grade, Total_mark, pass_fail, User } = response.data;
        setResultData(Result);
        setGrade(Grade);
        setTotal(Total_mark);
        setPass(pass_fail);
        setUser(User);
      } catch (error) {
        navigate('/login')
      }
    }
    fetchData();
  }, [navigate]);

  return (
    <div className="center-container">
      <div className="subject-card-info">
        <div className="container text-start">
          <div className="row">
            <div className="col">
              <p>Student: {user?.name}</p>
            </div>
            <div className="col">
              <p>Standard: {user?.Standards}</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>Division: {user?.division}</p>
            </div>
            <div className="col">
              <p className="email">Email: {user?.email}</p>
            </div>
          </div>
        </div>
      </div>
      {resultData && (
        <div className="subject-card">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Mark</th>
              </tr>
            </thead>
            <tbody>
              {resultData.map((item, index) => (
                <tr key={index}>
                  <td>{item.subject_name}</td>
                  <td>{item.mark}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="subject-card">
            <table className="styled-table">
              <thead>
                <tr>
                  <th style={{ width: '33%' }}>Total</th>
                  <th style={{ width: '33%' }}>Grade</th>
                  <th style={{ width: '34%' }}>Pass/Fail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{total}</td>
                  <td>{grade}</td>
                  <td>{pass}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Information;
