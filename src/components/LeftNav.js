import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/LeftNav.css';

function LeftNav() {
  return (
    <nav className="left-nav">
      <ul>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/insights" 
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Insights
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/add-insights" 
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Add Insights
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default LeftNav;
