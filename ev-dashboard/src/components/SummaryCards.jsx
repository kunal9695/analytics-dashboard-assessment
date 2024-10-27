import React from 'react';
import { Card, CardContent, Typography, Tooltip } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import StarIcon from '@mui/icons-material/Star';
import './SummaryCard.css';

const SummaryCards = ({ data }) => {
  const totalEVs = data.length;
  const totalElectricRange = data.reduce((sum, item) => {
    const electricRange = Number(item['Electric Range']);
    return sum + (isNaN(electricRange) ? 0 : electricRange);
  }, 0);

  const avgElectricRange = totalEVs > 0 ? (totalElectricRange / totalEVs).toFixed(2) : 0;
  const makesCount = data.reduce((acc, item) => {
    acc[item.Make] = (acc[item.Make] || 0) + 1;
    return acc;
  }, {});

  const cityCount = data.reduce((acc, item) => {
    acc[item.City] = (acc[item.City] || 0) + 1;
    return acc;
  }, {});

  const mostPopularCity = Object.keys(cityCount).reduce((a, b) => cityCount[a] > cityCount[b] ? a : b);
  const mostPopularMake = Object.keys(makesCount).reduce((a, b) => makesCount[a] > makesCount[b] ? a : b);

  return (
    <Grid2 container spacing={2} className="summary-card-container">
      <Grid2 xs={12} sm={6} md={3}>
        <Tooltip title="Total number of electric vehicles" arrow>
          <Card className="summary-card">
            <CardContent>
              <DirectionsCarIcon className="summary-card-icon total-evs-icon" />
              <Typography className="summary-card-title">Total Electric Vehicles</Typography>
              <Typography className="summary-card-value">{totalEVs}</Typography>
            </CardContent>
          </Card>
        </Tooltip>
      </Grid2>

      <Grid2 xs={12} sm={6} md={3}>
        <Tooltip title="Average electric range of vehicles" arrow>
          <Card className="summary-card">
            <CardContent>
              <BatteryFullIcon className="summary-card-icon avg-range-icon" />
              <Typography className="summary-card-title">Average Electric Range</Typography>
              <Typography className="summary-card-value">{avgElectricRange} miles</Typography>
            </CardContent>
          </Card>
        </Tooltip>
      </Grid2>

      <Grid2 xs={12} sm={6} md={3}>
        <Tooltip title="Most popular vehicle make" arrow>
          <Card className="summary-card">
            <CardContent>
              <StarIcon className="summary-card-icon popular-make-icon" />
              <Typography className="summary-card-title">Most Popular Make</Typography>
              <Typography className="summary-card-value">{mostPopularMake}</Typography>
            </CardContent>
          </Card>
        </Tooltip>
      </Grid2>

      <Grid2 xs={12} sm={6} md={3}>
        <Tooltip title="City with the highest number of EVs" arrow>
          <Card className="summary-card">
            <CardContent>
              <LocationCityIcon className="summary-card-icon popular-city-icon" />
              <Typography className="summary-card-title">City with Most EVs</Typography>
              <Typography className="summary-card-value">{mostPopularCity}</Typography>
            </CardContent>
          </Card>
        </Tooltip>
      </Grid2>
    </Grid2>
  );
};

export default SummaryCards;
