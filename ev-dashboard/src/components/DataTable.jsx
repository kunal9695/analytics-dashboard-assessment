import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Collapse,
    IconButton,
    Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './DataTable.css'; 

function DataTable({ data }) {
    const filteredData = data.filter(item => item.Make && item['Model Year'] && item['Electric Range'] !== undefined);

    const makesCount = filteredData.reduce((acc, item) => {
        const make = item.Make;
        const modelYear = item['Model Year'];
        if (!acc[make]) {
            acc[make] = {};
        }
        if (!acc[make][modelYear]) {
            acc[make][modelYear] = {
                count: 0,
                totalElectricRange: 0,
            };
        }
        acc[make][modelYear].count += 1;
        acc[make][modelYear].totalElectricRange += Number(item['Electric Range']);
        return acc;
    }, {});

    const makesArray = Object.entries(makesCount).map(([make, years]) => ({
        make,
        years: Object.entries(years).map(([year, details]) => ({
            year,
            ...details,
            avgElectricRange: (details.totalElectricRange / details.count).toFixed(2),
        })),
    }));

    const sortedMakes = makesArray.sort((a, b) => {
        const totalA = a.years.reduce((sum, year) => sum + year.count, 0);
        const totalB = b.years.reduce((sum, year) => sum + year.count, 0);
        return totalB - totalA;
    });

    const topMakes = sortedMakes.slice(0, 6);
    const otherMakesCount = sortedMakes.slice(6).reduce((acc, make) => {
        make.years.forEach(yearData => {
            acc.count = (acc.count || 0) + yearData.count;
            acc.totalElectricRange = (acc.totalElectricRange || 0) + yearData.totalElectricRange;
        });
        return acc;
    }, {});

    const finalData = [...topMakes];
    if (otherMakesCount.count) {
        finalData.push({
            make: 'Other',
            years: [{
                year: 'N/A',
                count: otherMakesCount.count,
                avgElectricRange: (otherMakesCount.totalElectricRange / otherMakesCount.count).toFixed(2) || 0,
            }],
        });
    }

    const [openRows, setOpenRows] = useState({});

    const handleRowClick = (make) => {
        setOpenRows((prev) => ({ ...prev, [make]: !prev[make] }));
    };

    return (
        <TableContainer component={Paper} sx={{ maxHeight: '400px', overflow: 'hidden', backgroundColor: '#2A2D3E', color: '#ffffff' }}>
            <div className="scrollable-table">
                <Table stickyHeader aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell sx={{ backgroundColor: '#4A4E64', color: '#ffffff', fontSize: '1.25rem', fontWeight: 'bold' }}>Manufacturer</TableCell>
                            <TableCell sx={{ backgroundColor: '#4A4E64', color: '#ffffff', fontSize: '1.25rem', fontWeight: 'bold' }}>Count</TableCell>
                            <TableCell sx={{ backgroundColor: '#4A4E64', color: '#ffffff', fontSize: '1.25rem', fontWeight: 'bold' }}>Average Electric Range</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {finalData.map(({ make, years }) => (
                            <React.Fragment key={make}>
                                <TableRow>
                                    <TableCell>
                                        <div style={{ display: 'flex', alignItems: 'center', color: '#FFD700' }}>
                                            <Typography variant="body2" sx={{ marginRight: '5px', color: '#FFD700' }}>Details</Typography>
                                            <IconButton aria-label="expand row" size="small" onClick={() => handleRowClick(make)} sx={{ color: '#FFD700' }}>
                                                {openRows[make] ? <KeyboardArrowUpIcon sx={{ color: '#FFD700' }} /> : <KeyboardArrowDownIcon sx={{ color: '#FFD700' }} />}
                                            </IconButton>
                                        </div>
                                    </TableCell>
                                    <TableCell sx={{ backgroundColor: '#3A3D50', color: '#ffffff' }}>{make}</TableCell>
                                    <TableCell sx={{ backgroundColor: '#3A3D50', color: '#ffffff' }}>{years.reduce((sum, year) => sum + year.count, 0)}</TableCell>
                                    <TableCell sx={{ backgroundColor: '#3A3D50', color: '#ffffff' }}>
                                        {(years.reduce((sum, year) => sum + Number(year.avgElectricRange), 0) / years.length).toFixed(2)} miles
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                                        <Collapse in={openRows[make]} timeout="auto" unmountOnExit>
                                            <Typography variant="h6" gutterBottom component="div" style={{ color: '#ffffff' }}>
                                                Yearly Data
                                            </Typography>
                                            <Table size="small" sx={{ backgroundColor: '#3A3D50', color: '#ffffff' }}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell sx={{ backgroundColor: '#4A4E64', color: '#ffffff', fontSize: '1.25rem', fontWeight: 'bold' }}>Year</TableCell>
                                                        <TableCell sx={{ backgroundColor: '#4A4E64', color: '#ffffff', fontSize: '1.25rem', fontWeight: 'bold' }}>Count</TableCell>
                                                        <TableCell sx={{ backgroundColor: '#4A4E64', color: '#ffffff', fontSize: '1.25rem', fontWeight: 'bold' }}>Avg Electric Range</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {years.map((yearData) => (
                                                        <TableRow key={yearData.year}>
                                                            <TableCell style={{ color: '#ffffff' }}>{yearData.year}</TableCell>
                                                            <TableCell style={{ color: '#ffffff' }}>{yearData.count}</TableCell>
                                                            <TableCell style={{ color: '#ffffff' }}>{yearData.avgElectricRange} miles</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </TableContainer>
    );
}

export default DataTable;
