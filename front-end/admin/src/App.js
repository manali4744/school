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


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/"element={<AdminLogin />}/>
          <Route path="/admin" element={
              <Layout>
                <AdminHome />
              </Layout>
            }
          />
          <Route path='/requestapprove' element={
            <Layout>
              <RequestApprove/>
            </Layout>
          }
          />
           <Route path='/student' element={
            <Layout>
              <Student/>
            </Layout>
          }
          />
           <Route path='/staff' element={
            <Layout>
              <Staff/>
            </Layout>
          }
          />
          <Route path='/enrollment' element={
            <Layout>
              <AdmissionFormDetails/>
            </Layout>
          }/>
          <Route path='/admissionmoreinfo/:id' element={
            <Layout>
              <AdmissionMoreInfo/>
            </Layout>
          }/>
          <Route path='/class/:std' element={
            <Layout>
              <Class/>
            </Layout>
          }/>
           <Route path='/class/:std/:div' element={
            <Layout>
              <Division/>
            </Layout>
          }/>
        </Routes>
        
      </div>
    </Router>
  );
}
export default App;
