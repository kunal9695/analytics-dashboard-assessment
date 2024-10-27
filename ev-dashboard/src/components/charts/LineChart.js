import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data }) => {
    const yearsData = data.reduce((acc, item) => {
        const year = item['Model Year'];
        const electricRange = Number(item['Electric Range']);
        
        if (!acc[year]) {
            acc[year] = { count: 0, totalElectricRange: 0 };
        }
        
        acc[year].count += 1;
        acc[year].totalElectricRange += isNaN(electricRange) ? 0 : electricRange;

        return acc;
    }, {});

    const sortedYears = Object.keys(yearsData).sort();
    const averageElectricRange = sortedYears.map(year => (yearsData[year].totalElectricRange / yearsData[year].count).toFixed(2));
    const chartData = {
        labels: sortedYears,
        datasets: [
            {
                label: 'Average Electric Range',
                data: averageElectricRange,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
                pointRadius: 5,
                pointHoverRadius: 7,
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
                text: 'Trends in Average Electric Range Over Years',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw || 0;
                        return `${label}: ${value} miles`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Electric Range (miles)',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Year',
                },
            },
        },
    };

    return (
        <div>
            <h2>Trends in Average Electric Range Over Years</h2>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default LineChart;
