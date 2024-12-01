import React from 'react';
import '../styles/InsightsTable.css';

function InsightsTable({ insights }) {
  return (
    <table className="insights-table">
      <thead>
        <tr>
          <th>Content</th>
          <th>Created At</th>
          <th>Confidence</th>
          <th>Timeliness</th>
        </tr>
      </thead>
      <tbody>
        {insights.map(insight => (
          <tr key={insight.insight_id}>
            <td>{insight.content}</td>
            <td>{new Date(insight.created_at).toLocaleDateString()}</td>
            <td>{insight.confidence_level.name}</td>
            <td>{insight.timeliness.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default InsightsTable;
