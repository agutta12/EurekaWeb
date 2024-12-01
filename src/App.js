import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LeftNav from './components/LeftNav';
import InsightsPage from './pages/InsightsPage';
import AddInsightsPage from './pages/AddInsightsPage'; // Import new page
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <div className="app">
        <LeftNav />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/add-insights" element={<AddInsightsPage />} /> {/* New route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
