import React from 'react';
import './InsightsCard.css';

function InsightsCard({ insight }) {
  return (
    <div className="insights-card">
      <h2>{insight.content}</h2>
      <span className="badge badge-high">{insight.confidence_level.name}</span>
      <span className="badge badge-realtime">{insight.timeliness.type}</span>
      <p><strong>Created At:</strong> {new Date(insight.created_at).toLocaleDateString()}</p>
      <p><strong>Type:</strong> {insight.insight_type.name}</p>
    </div>
  );
}

export default InsightsCard;
