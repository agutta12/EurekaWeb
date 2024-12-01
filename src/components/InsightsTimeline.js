import React from 'react';
import '../styles/InsightsTimeline.css';

function InsightsTimeline({ insights }) {
  return (
    <div className="timeline">
      {insights.map((insight) => (
        <div key={insight.insight_id} className="timeline-card">
          <div className="date">{new Date(insight.created_at).toLocaleDateString()}</div>
          <div className="content">
            <h3>{insight.content}</h3>
            <p><strong>Confidence:</strong> {insight.confidence_level.name}</p>
            <p><strong>Timeliness:</strong> {insight.timeliness.type}</p>
            <p><strong>Domain:</strong> {insight.domain.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InsightsTimeline;
