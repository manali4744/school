import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './components/adminlogin';
import AdminHome from './components/adminhome';
import Layout from './layout';
import RequestApprove from './components/requestapprove';
import Student from './components/student';
import Staff from './components/staff';
import AdmissionFormDetails from './components/admissionform';


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
        </Routes>
      </div>
    </Router>
  );
}
export default App;
