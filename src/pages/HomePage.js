import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import './HomePage.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function HomePage() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    fetch('https://insightssummary.azurewebsites.net/api/insights/')
      .then((response) => response.json())
      .then((data) => {
        setInsights(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading charts...</p>;
  if (error) return <p>Error: {error}</p>;

  // Group 1: Distribution and Overview
  const typesData = insights.reduce((acc, insight) => {
    acc[insight.insight_type.name] = (acc[insight.insight_type.name] || 0) + 1;
    return acc;
  }, {});

  const timelinessData = insights.reduce((acc, insight) => {
    acc[insight.timeliness.type] = (acc[insight.timeliness.type] || 0) + 1;
    return acc;
  }, {});

  const confidenceData = insights.reduce((acc, insight) => {
    const domain = insight.domain.name;
    const confidence = insight.confidence_level.name;

    if (!acc[domain]) {
      acc[domain] = { High: 0, Medium: 0, Low: 0 };
    }

    acc[domain][confidence] = (acc[domain][confidence] || 0) + 1;
    return acc;
  }, {});

  const domains = Object.keys(confidenceData);
  const highData = domains.map((domain) => confidenceData[domain].High);
  const mediumData = domains.map((domain) => confidenceData[domain].Medium);
  const lowData = domains.map((domain) => confidenceData[domain].Low);

  // Group 2: Temporal Trends
  const overTimeData = insights.reduce((acc, insight) => {
    const month = new Date(insight.created_at).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const agingData = insights.reduce((acc, insight) => {
    const createdDate = new Date(insight.created_at);
    const currentDate = new Date();
    const ageInMonths = Math.floor((currentDate - createdDate) / (1000 * 60 * 60 * 24 * 30));

    if (ageInMonths <= 3) acc['0-3 months'] = (acc['0-3 months'] || 0) + 1;
    else if (ageInMonths <= 6) acc['3-6 months'] = (acc['3-6 months'] || 0) + 1;
    else if (ageInMonths <= 12) acc['6-12 months'] = (acc['6-12 months'] || 0) + 1;
    else acc['12+ months'] = (acc['12+ months'] || 0) + 1;

    return acc;
  }, {});

  // Chart data
  const barData = {
    labels: Object.keys(typesData),
    datasets: [
      {
        label: 'Insights by Type',
        data: Object.values(typesData),
        backgroundColor: ['#0078d7', '#28a745', '#ffc107', '#dc3545'],
      },
    ],
  };

  const pieData = {
    labels: Object.keys(timelinessData),
    datasets: [
      {
        data: Object.values(timelinessData),
        backgroundColor: ['#0078d7', '#6f42c1', '#e83e8c', '#fd7e14'],
      },
    ],
  };

  const stackedBarData = {
    labels: domains,
    datasets: [
      {
        label: 'High Confidence',
        data: highData,
        backgroundColor: '#28a745',
      },
      {
        label: 'Medium Confidence',
        data: mediumData,
        backgroundColor: '#ffc107',
      },
      {
        label: 'Low Confidence',
        data: lowData,
        backgroundColor: '#dc3545',
      },
    ],
  };

  const lineData = {
    labels: Object.keys(overTimeData),
    datasets: [
      {
        label: 'Insights Over Time',
        data: Object.values(overTimeData),
        fill: false,
        borderColor: '#0078d7',
        tension: 0.1,
      },
    ],
  };

  const histogramData = {
    labels: Object.keys(agingData),
    datasets: [
      {
        label: 'Aging Insights',
        data: Object.values(agingData),
        backgroundColor: ['#0078d7', '#6f42c1', '#e83e8c', '#fd7e14'],
      },
    ],
  };

  return (
    <div className="home-page">
      <h1>Dashboard</h1>

      {/* Group 1: Distribution and Overview */}
      <div className="category-box">
        <div className="category-title">Distribution and Overview</div>
        <div className="chart-container">
          <div className="chart-item">
            <h3>Insights by Type</h3>
            <Bar data={barData} />
          </div>
          <div className="chart-item">
            <h3>Insights by Timeliness</h3>
            <Pie data={pieData} />
          </div>
          <div className="chart-item">
            <h3>Insights by Confidence Level</h3>
            <Bar
              data={stackedBarData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    stacked: true,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Group 2: Temporal Trends */}
      <div className="category-box">
        <div className="category-title">Temporal Trends</div>
        <div className="chart-container">
          <div className="chart-item">
            <h3>Insights Over Time</h3>
            <Line data={lineData} />
          </div>
          <div className="chart-item">
            <h3>Aging Insights</h3>
            <Bar
              data={histogramData}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Age Ranges',
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Count of Insights',
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

