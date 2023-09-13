// Layout.js
import React from 'react';
import ResponsiveAppBar from './components/navbar';

function Layout({ children }) {
  return (
    <div className="App">
      <ResponsiveAppBar />
      {children}
    </div>
  );
}

export default Layout;
