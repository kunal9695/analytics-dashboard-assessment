// src/components/charts/BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
    // Count vehicles by make
    const vehicleCountByMake = data.reduce((acc, item) => {
        const make = item.Make;
        acc[make] = (acc[make] || 0) + 1; // Increment count for each make
        return acc;
    }, {});

    // Convert to array and sort by count in descending order
    const sortedMakes = Object.entries(vehicleCountByMake)
        .sort((a, b) => b[1] - a[1]) // Sort by count
        .slice(0, 5); // Get top 5

    // Prepare chart data
    const chartData = {
        labels: sortedMakes.map(entry => entry[0]), // Labels are the makes
        datasets: [
            {
                label: 'Number of Vehicles',
                data: sortedMakes.map(entry => entry[1]), // Values are the counts
                backgroundColor: 'rgba(75, 192, 192, 0.5)', // Keep existing bar color
                borderColor: 'rgba(75, 192, 192, 1)', // Keep existing border color
                borderWidth: 1,
            },
        ],
    };

    // Options for the Bar chart
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Top 5 Makes by Vehicle Count',
                font: {
                    size: 18, // Increase title font size
                },
                color: '#FFD700',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw || 0;
                        return `${label}: ${value} vehicles`; // Display count in tooltip
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Vehicles',
                    font: {
                        size: 20, // Increase title font size
                    },
                    color: '#ffffff',
                },
                ticks: {
                    font: {
                        size: 12, // Increase label font size
                    },
                    color: '#ffffff', // Adjust tick color
                },
                grid: {
                    color: '#444444', // Darker grid line color
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Make',
                    font: {
                        size: 20, // Increase title font size
                    },
                    color: '#ffffff',
                },
                ticks: {
                    font: {
                        size: 12, // Increase label font size
                    },
                    color: '#ffffff', // Adjust tick color
                },
                grid: {
                    color: '#444444', // Darker grid line color
                },
            },
        },
    };

    return (
        <div>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default BarChart;
