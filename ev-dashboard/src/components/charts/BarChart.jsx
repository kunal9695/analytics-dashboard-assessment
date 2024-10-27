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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
    const vehicleCountByMake = data.reduce((acc, item) => {
        const make = item.Make;
        acc[make] = (acc[make] || 0) + 1;
        return acc;
    }, {});

    const sortedMakes = Object.entries(vehicleCountByMake)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const chartData = {
        labels: sortedMakes.map(entry => entry[0]),
        datasets: [
            {
                label: 'Number of Vehicles',
                data: sortedMakes.map(entry => entry[1]),
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

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
                    size: 18,
                },
                color: '#FFD700',
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
                    text: 'Number of Vehicles',
                    font: {
                        size: 20,
                    },
                    color: '#ffffff',
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                    color: '#ffffff',
                },
                grid: {
                    color: '#444444',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Make',
                    font: {
                        size: 20,
                    },
                    color: '#ffffff',
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                    color: '#ffffff',
                },
                grid: {
                    color: '#444444',
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
