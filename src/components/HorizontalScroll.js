import React from 'react';
import InsightsCard from './InsightsCard';

function HorizontalScroll({ insights }) {
  return (
    <div className="horizontal-scroll">
      {insights.map((insight) => (
        <div key={insight.insight_id} className="horizontal-card">
          <InsightsCard insight={insight} />
        </div>
      ))}
    </div>
  );
}

export default HorizontalScroll;
