import React from 'react';

function Footer() {
  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} Insights Dashboard. All rights reserved.</p>
    </footer>
  );
}

// Inline styles for simplicity; can be moved to a CSS file
const footerStyle = {
  textAlign: 'center',
  padding: '1rem',
  backgroundColor: '#0078d7',
  color: 'white',
  position: 'absolute',
  bottom: 0,
  width: '100%',
};

export default Footer;
