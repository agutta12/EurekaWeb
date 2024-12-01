import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

function ExpandableCard({ insight }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card">
      <div className="card-summary" onClick={() => setExpanded(!expanded)}>
        <div className="content">
          <h3>{insight.content}</h3>
          <span className="toggle-icon">
            {expanded ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </div>
      </div>
      {expanded && (
        <div className="card-details">
          <p><strong>Confidence Level:</strong> {insight.confidence_level.name}</p>
          <p><strong>Timeliness:</strong> {insight.timeliness.type}</p>
          <p><strong>Created At:</strong> {new Date(insight.created_at).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
}

export default ExpandableCard;
