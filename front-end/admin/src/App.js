import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './components/adminlogin';
import AdminHome from './components/adminhome';
import Layout from './layout';
import RequestApprove from './components/requestapprove';
import Student from './components/student';
import Staff from './components/staff';
import AdmissionFormDetails from './components/admissionform';
import AdmissionMoreInfo from './components/admissionmoreinfo';
import Class from './components/class';
import Division from './components/division';
import React from "react";


function App() {
  const token = localStorage.getItem('jwt_token');
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<AdminLogin />} />
            <Route path="/admin" element={token ? <Layout><AdminHome /></Layout> : <AdminLogin/>} />
            <Route path="/requestapprove" element={token ?<Layout><RequestApprove /></Layout>: <AdminLogin/>} />
            <Route path="/student" element={token ?<Layout><Student /></Layout>: <AdminLogin/>} />
            <Route path="/staff" element={token ?<Layout><Staff /></Layout>: <AdminLogin/>} />
            <Route path="/enrollment" element={token ?<Layout><AdmissionFormDetails /></Layout>: <AdminLogin/>} />
            <Route path="/admissionmoreinfo/:id" element={token ?<Layout><AdmissionMoreInfo /></Layout>: <AdminLogin/>} />
            <Route path="/class/:std" element={token ?<Layout><Class /></Layout>: <AdminLogin/>} />
            <Route path="/class/:std/:div" element={token ? <Layout><Division /></Layout>: <AdminLogin/>} />
          </Routes>
        </div>
      </Router>
  );
}
export default App;
