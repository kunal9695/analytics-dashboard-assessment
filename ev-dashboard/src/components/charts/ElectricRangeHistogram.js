// src/components/charts/ElectricRangeHistogram.js
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
import './ElectricRangeHistogram.css';

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ElectricRangeHistogram = ({ data }) => {
    // Define bins for electric range
    const bins = Array.from({ length: 10 }, (_, i) => i * 30); // Creates bins: [0, 30, 60, ..., 270]

    // Prepare data for the histogram
    const histogramData = Array(bins.length).fill(0);

    data.forEach(item => {
        const electricRange = Number(item['Electric Range']);
        if (!isNaN(electricRange)) {
            // Find the appropriate bin
            const binIndex = Math.floor(electricRange / 30);
            if (binIndex < histogramData.length) {
                histogramData[binIndex] += 1; // Increment count in the appropriate bin
            }
        }
    });

    // Prepare chart data
    const chartData = {
        labels: bins.map((bin, index) => (index < bins.length - 1 ? `${bin} - ${bin + 30}` : `${bin} +`)),
        datasets: [
            {
                label: 'Frequency of Electric Ranges',
                data: histogramData,
                backgroundColor: 'rgba(135, 206, 250, 0.6)', // Slightly lighter color
                borderColor: 'rgba(135, 206, 250, 1)', // Slightly lighter border color
                borderWidth: 1,
            },
        ],
    };

    // Options for the Histogram
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw || 0;
                        return `${label}: ${value} vehicles`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Frequency',
                    font: {
                        size: 20, // Increase title font size
                    },
                    color: '#ffffff',
                },
                ticks: {
                    font: {
                        size: 12, // Increase label font size
                    },
                    color: '#ffffff', // Adjust tick color if needed
                },
                grid: {
                    color: '#444444', // Darker grid line color
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Electric Range (miles)',
                    font: {
                        size: 20, // Increase title font size
                    },
                    color: '#ffffff',
                },
                ticks: {
                    font: {
                        size: 12, // Increase label font size
                    },
                    color: '#ffffff', // Adjust tick color if needed
                },
                grid: {
                    color: '#444444', // Darker grid line color
                },
            },
        },
    };

    return (
        <div>
            <h2 className="histogram-title">Distribution of Electric Ranges</h2>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default ElectricRangeHistogram;
