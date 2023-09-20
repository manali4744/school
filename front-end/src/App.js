import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Info from './components/auth/getinfoform';
import Information from './components/auth/information';
import Home from './components/auth/home';
import Blog from './components/auth/blog';
import Event from './components/auth/event';
import Navbar from './components/newnavbar';
import Footer from './components/footer';
import Enrollment from './components/auth/enrollments';
import AboutUs from './components/auth/aboutus';
import Enroll from './components/auth/enroll';
import AdmissionForm from './components/auth/admissionform';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/register" element={<Register />}/>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/getinfo" element={<Info />} />
          <Route path="/information" element={<Information />} />
          <Route path= "/event" element={<Event/>}/>
          <Route path="/nav" element={<Navbar/>}/>
          <Route path="/enrollment" element={<Enrollment/>}/>
          <Route path="/aboutus" element={<AboutUs/>}/>
          <Route path="/enroll" element={<Enroll/>}/>
          <Route path="/admissionform" element={<AdmissionForm/>}/>  
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
