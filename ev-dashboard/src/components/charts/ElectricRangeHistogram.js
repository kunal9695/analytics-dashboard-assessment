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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ElectricRangeHistogram = ({ data }) => {
    const bins = Array.from({ length: 10 }, (_, i) => i * 30);

    const histogramData = Array(bins.length).fill(0);

    data.forEach(item => {
        const electricRange = Number(item['Electric Range']);
        if (!isNaN(electricRange)) {
            const binIndex = Math.floor(electricRange / 30);
            if (binIndex < histogramData.length) {
                histogramData[binIndex] += 1;
            }
        }
    });

    const chartData = {
        labels: bins.map((bin, index) => (index < bins.length - 1 ? `${bin} - ${bin + 30}` : `${bin} +`)),
        datasets: [
            {
                label: 'Frequency of Electric Ranges',
                data: histogramData,
                backgroundColor: 'rgba(135, 206, 250, 0.6)',
                borderColor: 'rgba(135, 206, 250, 1)',
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
                    text: 'Electric Range (miles)',
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
            <h2 className="histogram-title">Distribution of Electric Ranges</h2>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default ElectricRangeHistogram;
