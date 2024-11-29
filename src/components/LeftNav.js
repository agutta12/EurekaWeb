import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/LeftNav.css';

function LeftNav() {
  return (
    <nav className="left-nav">
      <h2>Menu</h2>
      <ul>
        <li>
          <NavLink
            to="/insights"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Insights
          </NavLink>
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
}

export default LeftNav;
