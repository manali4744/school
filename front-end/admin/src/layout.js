import React from 'react';
import AdminNavbar from './components/adminnavbar';

function Layout({ children }) {
  return (
    <div>
      <AdminNavbar /> {/* Include your Navbar component here */}
      {children}
    </div>
  );
}

export default Layout;
