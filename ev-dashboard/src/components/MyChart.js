// src/components/MyChart.js
import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Register necessary Chart.js components
Chart.register(...registerables);

const MyChart = ({ data }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null); // Reference for the Chart.js instance

  useEffect(() => {
    // Destroy the existing chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create a new chart
    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'bar', // Change as needed (e.g., 'line', 'pie', etc.)
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Electric Vehicles',
          data: data.values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup on unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]); // Re-run the effect when `data` changes

  return <canvas ref={canvasRef} />;
};

export default MyChart;
