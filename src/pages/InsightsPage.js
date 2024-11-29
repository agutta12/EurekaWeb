import React, { useEffect, useState } from 'react';
import InsightsCard from '../components/InsightsCard';

function InsightsPage() {
  const [insights, setInsights] = useState([]); // Store fetched insights
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Azure Function API URL (replace with your actual Azure Function URL)
  const API_URL = 'https://insightssummary.azurewebsites.net/api/insights';

  useEffect(() => {
    // Fetch insights from the Azure Function
    const fetchInsights = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setInsights(data); // Update state with fetched data
      } catch (err) {
        console.error('Error fetching insights:', err);
        setError(err.message); // Set error state
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchInsights();
  }, [API_URL]); // Dependency array: reruns only if API_URL changes

  // Render UI
  if (loading) {
    return <p>Loading insights...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="insights-page">
      <h1>Insights</h1>
      <div className="insights-container">
        {insights.map((insight) => (
          <InsightsCard key={insight.insight_id} insight={insight} />
        ))}
      </div>
    </div>
  );
}

export default InsightsPage;
