import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Ensure CSS is imported

function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center text-white vh-100 home-background">
      
      <div className="text-center content">
        <h1 className="display-4 mb-4">Welcome to Creative Maths Management System</h1>
        <p className="lead mb-5">Manage and track your students with ease</p>
        <div className="d-grid gap-3 col-md-6 mx-auto">
          <Link to="/users" className="  btn btn-outline-light btn-lg">Go to the system</Link>
        </div>
        <p className="mt-5">© {currentYear} Powered By Creative Maths</p>
      </div>
    </div>
  );
}

export default Home;
