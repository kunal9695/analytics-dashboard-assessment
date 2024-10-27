// src/components/Dashboard.js
import React, { useContext } from "react";
import CSVDataContext from "../context/CSVDataContext";
import SummaryCards from "./SummaryCards";
import BarChart from "./charts/BarChart";
import PieChart from "./charts/PieChart";
import DataTable from "./DataTable";
import ElectricRangeHistogram from "./charts/ElectricRangeHistogram";
import SearchIcon from "@mui/icons-material/Search"; // Import Search Icon
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Import Account Icon
import EVIcon from "@mui/icons-material/ElectricCar"; // Import EV Icon for the header
import "./Dashboard.css";

function Dashboard() {
  const { data, loading } = useContext(CSVDataContext);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="header">
        <h1>
          <EVIcon className="header-icon" /> Electric Vehicle Dashboard
        </h1>
        <div className="header-icons">
          <SearchIcon className="icon" />
          <AccountCircleIcon className="icon" />
        </div>
      </div>
      <div className="dashboard-container">
        <SummaryCards data={data} />

        <div className="charts-container">
          <div className="chart-item chart-card">
            <h3 className="centered-heading">Electric Range Distribution</h3> {/* Centered heading */}
            <ElectricRangeHistogram data={data} />
          </div>
          <div className="chart-item chart-card">
            <h3 className="centered-heading">Sales by Manufacturer</h3> {/* Centered heading */}
            <BarChart data={data} />
          </div>
          <div className="chart-item chart-card">
            <h3 className="centered-heading">Category Breakdown</h3> {/* Centered heading */}
            <PieChart data={data} />
          </div>
        </div>

        <div className="table-card data-table-container">
          <h3 className="centered-heading">Detailed Vehicle Data</h3> {/* Centered heading */}
          <DataTable data={data} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;