import React, { useState, useEffect } from 'react';
import InsightsTimeline from '../components/InsightsTimeline';
import InsightsTable from '../components/InsightsTable';
import './InsightsPage.css';
import Masonry from 'react-masonry-css';
import ExpandableCard from '../components/ExpandableCard';
import TabbedCards from '../components/TabbedCards';
import HorizontalScroll from '../components/HorizontalScroll';

function InsightsPage() {
  const [insights, setInsights] = useState([]);
  const [view, setView] = useState('timeline'); // Default view: timeline
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://insightssummary.azurewebsites.net/api/insights/')
      .then((response) => response.json())
      .then((data) => setInsights(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading insights...</p>;
  if (error) return <p>Error: {error}</p>;

  const renderView = () => {
    switch (view) {
      case 'expandable':
        return (
          <div className="cards-grid">
            {insights.map((insight) => (
              <ExpandableCard key={insight.insight_id} insight={insight} />
            ))}
          </div>
        );
      case 'masonry':
        return (
          <Masonry
            breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
            className="masonry-grid"
            columnClassName="masonry-grid-column"
          >
            {insights.map((insight) => (
              <div key={insight.insight_id} className="card">
                <h3>{insight.content}</h3>
                <p>{new Date(insight.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </Masonry>
        );
      case 'grid':
        return (
          <div className="cards-grid">
            {insights.map((insight) => (
              <div key={insight.insight_id} className="card">
                <h3>{insight.content}</h3>
                <p>{new Date(insight.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        );
      case 'timeline':
        return <InsightsTimeline insights={insights} />;
      case 'table':
        return <InsightsTable insights={insights} />;
      case 'tabbed':
        return <TabbedCards insights={insights} />;
      case 'horizontal':
        return <HorizontalScroll insights={insights} />;
      default:
        return null;
    }
  };

  return (
    <div className="insights-page">
      <h1>Insights</h1>
      <select value={view} onChange={(e) => setView(e.target.value)}>
        <option value="grid">Grid View</option>
        <option value="timeline">Timeline View</option>
        <option value="table">Table View</option>
        <option value="masonry">Masonry View</option>
        <option value="expandable">Exandable View</option>
        <option value="tabbed">Tabbed View</option>
        <option value="horizontal">Horizontal Scroll</option>
      </select>
      {renderView()}
    </div>
  );
}

export default InsightsPage;
