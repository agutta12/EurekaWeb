import React, { useState } from 'react';
import InsightsCard from './InsightsCard';

function TabbedCards({ insights }) {
  const [activeTab, setActiveTab] = useState("Descriptive");

  // Extract unique tabs from the insights
  const tabs = Array.from(new Set(insights.map((insight) => insight.insight_type.name)));

  return (
    <div className="tabbed-cards">
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {insights
          .filter((insight) => insight.insight_type.name === activeTab)
          .map((insight) => (
            <InsightsCard key={insight.insight_id} insight={insight} />
          ))}
      </div>
    </div>
  );
}

export default TabbedCards;
