import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/login">Login Page</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard Page</Link>
        </li>
        <li>
          <Link to="/management">Management Page</Link>
        </li>
        <li>
          <Link to="/cliniciansmanagement">Cliniciansmanagement Page</Link>
        </li>
        <li>
          <Link to="/patientsmanagement">Patientsmanagement Page</Link>
        </li>
        <li>
          <Link to="/decisiontreemanagement">Decisiontreemanagement Page</Link>
        </li>
        <li>
          <Link to="/decisionsupportpage">Decisionsupportpage Page</Link>
        </li>
        <li>
          <Link to="/patientdetailspage">Patientdetailspage Page</Link>
        </li>
        <li>
          <Link to="/decisionpage">Decisionpage Page</Link>
        </li>
        <li>
          <Link to="/notfound">Notfound Page</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
