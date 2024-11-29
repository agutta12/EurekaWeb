import React from 'react';

function Header() {
  return (
    <header style={headerStyle}>
      <h1>Insights Dashboard</h1>
      <nav>
        <ul style={navStyle}>
          <li><a href="#home" style={linkStyle}>Home</a></li>
          <li><a href="#about" style={linkStyle}>About</a></li>
          <li><a href="#contact" style={linkStyle}>Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

// Inline styles for simplicity; can be moved to a CSS file
const headerStyle = {
  textAlign: 'center',
  padding: '1rem',
  backgroundColor: '#0078d7',
  color: 'white',
};

const navStyle = {
  listStyle: 'none',
  padding: 0,
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
};

export default Header;
