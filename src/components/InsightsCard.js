import React from 'react';
import './InsightsCard.css';

function InsightsCard({ insight }) {
  return (
    <div className="insights-card">
      <h2>{insight.content}</h2>
      <p><strong>Created At:</strong> {new Date(insight.created_at).toLocaleDateString()}</p>

      <h3>Details</h3>
      <ul>
        <li>
          <strong>Insight Type:</strong> {insight.insight_type.name} - {insight.insight_type.description}
        </li>
        <li>
          <strong>Data Source:</strong> {insight.data_source.name} - {insight.data_source.description}
        </li>
        <li>
          <strong>Audience:</strong> {insight.audience.name} - {insight.audience.description}
        </li>
        <li>
          <strong>Domain:</strong> {insight.domain.name} - {insight.domain.description}
        </li>
        <li>
          <strong>Confidence Level:</strong> {insight.confidence_level.name} - {insight.confidence_level.description}
        </li>
        <li>
          <strong>Timeliness:</strong> {insight.timeliness.type} - {insight.timeliness.description}
        </li>
        <li>
          <strong>Delivery Channel:</strong> {insight.delivery_channel.name} - {insight.delivery_channel.description}
        </li>
        <li>
          <strong>Alignment Goal:</strong> {insight.alignment_goal.name} - {insight.alignment_goal.description}
        </li>
        <li>
          <strong>Value Priority:</strong> {insight.value_priority.name} - {insight.value_priority.description}
        </li>
      </ul>
    </div>
  );
}

export default InsightsCard;
