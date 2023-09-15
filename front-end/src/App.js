import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Info from './components/auth/getinfoform';
import Information from './components/auth/information';
import ResponsiveAppBar from './components/navbar';
import Home from './components/auth/home';
import Blog from './components/auth/blog';
import Event from './components/auth/event';
import Navbar from './components/newnavbar';
import Footer from './components/footer';
import Enrollment from './components/auth/enrollments';

function App() {
  // Set the initial state of isLoggedIn based on localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedId = localStorage.getItem('userId');
    return !!storedId; // Convert storedId to a boolean
  });

  useEffect(() => {
    // You can use useEffect to update the isLoggedIn state when localStorage changes
    const storedId = localStorage.getItem('userId');
    setIsLoggedIn(!!storedId);
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/getinfo" element={<Info />} />
          <Route path="/information" element={<Information />} />
          <Route path= "/event" element={<Event/>}/>
          <Route path="/nav" element={<Navbar/>}/>
          <Route path="/enrollment" element={<Enrollment/>}/>
        </Routes>
        {/* <Footer/> */}
      </div>
    </Router>
  );
}

export default App;
