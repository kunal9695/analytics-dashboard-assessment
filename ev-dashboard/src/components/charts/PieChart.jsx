// src/components/charts/PieChart.js
import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from 'recharts';
import './PieChart.css';

const PieChartComponent = ({ data }) => {
    // Market Share by Make
    const makeCounts = data.reduce((acc, item) => {
        acc[item.Make] = (acc[item.Make] || 0) + 1;
        return acc;
    }, {});

    // Sort makes by count and get the top 6
    const sortedMakes = Object.entries(makeCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6);

    // Calculate total vehicles in other makes
    const totalOthers = Object.entries(makeCounts)
        .slice(6)
        .reduce((acc, curr) => acc + curr[1], 0);

    // Prepare data for market share chart
    const labels = sortedMakes.map(([make]) => make);
    const dataValues = sortedMakes.map(([, count]) => count);

    if (totalOthers > 0) {
        labels.push('Other Manufacturers');
        dataValues.push(totalOthers);
    }

    const makePieData = labels.map((label, index) => ({
        name: label,
        value: dataValues[index],
    }));

    // Count Electric Vehicle Types
    const typeCounts = data.reduce((acc, item) => {
        const type = item['Electric Vehicle Type'];
        if (type) {
            acc[type] = (acc[type] || 0) + 1;
        }
        return acc;
    }, {});

    const typePieData = Object.entries(typeCounts).map(([name, value]) => ({ name, value }));

    // Darker colors for a dark theme
    const COLORS = [
        '#1f77b4',
        '#ff7f0e',
        '#2ca02c',
        '#d62728',
        '#9467bd',
        '#8c564b',
        '#e377c2', // Additional color for 'Other Manufacturers'
    ];

    return (
        <div className="pie-chart-container">
            <div className="pie-chart-card" style={{ backgroundColor: '#333646', padding: '20px', borderRadius: '8px' }}>
                <h2>Market Share by Make</h2>
                <PieChart width={500} height={400}> {/* Increased size */}
                    <Pie
                        data={makePieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100} // Adjusted outer radius for better appearance
                        fill="#8884d8"
                        label={false} // Disable labels when not hovering
                    >
                        {makePieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
                    <Legend />
                </PieChart>
            </div>
            <div className="pie-chart-card" style={{ backgroundColor: '#333646', padding: '20px', borderRadius: '8px' }}>
                <h2>Electric Vehicle Type Distribution</h2>
                <PieChart width={500} height={400}> {/* Increased size */}
                    <Pie
                        data={typePieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100} // Adjusted outer radius for better appearance
                        fill="#8884d8"
                        label={false} // Disable labels when not hovering
                    >
                        {typePieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
                    <Legend />
                </PieChart>
            </div>
        </div>
    );
};

export default PieChartComponent;
