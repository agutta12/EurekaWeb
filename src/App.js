import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LeftNav from './components/LeftNav';
import InsightsPage from './pages/InsightsPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <LeftNav />
        <div className="content">
          <Routes>
            <Route path="/insights" element={<InsightsPage />} />
            {/* Add other routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
