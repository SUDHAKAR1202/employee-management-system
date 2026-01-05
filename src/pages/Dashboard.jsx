import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography, Paper, Stack, Button } from "@mui/material";
import { FiSearch, FiPlus } from "react-icons/fi";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { MdLogout } from "react-icons/md";
import { toast } from "react-toastify";
import RevenueChart from "../charts/RevenueChart";
import GrowthChart from "../charts/GrowthChart";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

import EmployeeTable from "../components/employees/EmployeeTable";
import EmployeeForm from "../components/employees/EmployeeForm";
import EmployeeFilters from "../components/employees/EmployeeFilters";
import { getEmployees } from "../utils/storage";
import { initEmployees } from "../utils/initEmployees";

/* ================= DASHBOARD STATIC DATA ================= */

const Dashboard = () => {
  const products = [
    { name: "ASOS Ridley High Waist", price: 79, qty: 82, amount: 6518 },
    { name: "Marco Lightweight Shirt", price: 129, qty: 37, amount: 4755 },
    { name: "Half Sleeve Shirt", price: 40, qty: 64, amount: 2559 },
    { name: "Lightweight Jacket", price: 20, qty: 184, amount: 3680 },
    { name: "Marco Shoes", price: 79, qty: 64, amount: 1966 },
  ];

  const locations = [
    { city: "New York", value: "72K", coordinates: [-74.006, 40.7128] },
    { city: "San Francisco", value: "39K", coordinates: [-122.4194, 37.7749] },
    { city: "Sydney", value: "25K", coordinates: [151.2093, -33.8688] },
    { city: "Singapore", value: "61K", coordinates: [103.8198, 1.3521] },
  ];

  const salesData = [
    { name: "Affiliate", value: 400 },
    { name: "Direct", value: 300 },
    { name: "E-mail", value: 200 },
    { name: "Sponsored", value: 100 },
  ];

  const COLORS = ["#4caf50", "#1976d2", "#9c27b0", "#ff9800"];

  const geoUrl =
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    initEmployees();
    setEmployees(getEmployees());
    setTimeout(() => setLoading(false), 500);
  }, []);

  const filteredEmployees = employees
    .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
    .filter((e) => (gender ? e.gender === gender : true))
    .filter((e) =>
      status ? (status === "active" ? e.isActive : !e.isActive) : true
    );

  const total = employees.length;
  const active = employees.filter((e) => e.isActive).length;
  const inactive = total - active;

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    toast.info("Logged out successfully!");
    setTimeout(() => {
      navigate("/login");
    },1200);
  };

  return (
    <Box p={4} sx={{ width: "100%", p: 3 }}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Employee Dashboard</Typography>
        <Button onClick={logout} variant="outlined">
          <MdLogout size={22} />
          <p style={{ color: "black", fontSize: "16px" }}>Logout</p>
        </Button>
      </Stack>
      {/* ================= EMPLOYEE SUMMARY ================= */}
      <Grid container spacing={3} mt={3} alignItems="stretch">
        {[
          { label: "Total Employees", value: total },
          { label: "Active Employees", value: active },
          { label: "Inactive Employees", value: inactive },
        ].map((item) => (
          <Grid item xs={12} md={4} key={item.label}>
            <Paper
              sx={{
                p: 3,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="subtitle2">{item.label}</Typography>
              <Typography variant="h4">{item.value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <br />
      {/* ================= PLACEHOLDER: MAP & CHARTS ================= */}
      <Grid container spacing={3} mt={3} display="flex">
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={3} sx={{ p: 3, height: 400, minHeight: 350 }}>
            <Typography variant="h6" gutterBottom>
              Revenue
            </Typography>
            <RevenueChart />
          </Paper>
        </Grid>
        {/* Growth Chart */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Projections vs Actuals
            </Typography>
            <GrowthChart />
          </Paper>
        </Grid>

        {/* Revenue by Location (Map) */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Revenue by Location
            </Typography>

            <Box sx={{ width: "100%", height: 250 }}>
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: 160, center: [0, 20] }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <ZoomableGroup zoom={1}>
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="#EAEAEC"
                          stroke="#D6D6DA"
                        />
                      ))
                    }
                  </Geographies>

                  {locations.map(({ city, coordinates, value }, index) => (
                    <Marker key={city} coordinates={coordinates}>
                      <circle
                        r={6 + parseInt(value) / 1000}
                        fill={COLORS[index % COLORS.length]}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    </Marker>
                  ))}
                </ZoomableGroup>
              </ComposableMap>
            </Box>
          </Paper>
        </Grid>
      </Grid>{" "}
      <br />
      {/* ================= FILTERS & TABLE ================= */}
      <Paper
        sx={{
          p: 3,
          width: "100%",
          height: "100%",
        }}
      >
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <EmployeeFilters
            search={search}
            setSearch={setSearch}
            gender={gender}
            setGender={setGender}
            status={status}
            setStatus={setStatus}
          />
          <Button
            variant="contained"
            onClick={() => {
              setSelectedEmployee(null);
              setShowForm(true);
            }}
          >
            <FiPlus size={20} />
            Add Employee
          </Button>
        </Stack>

        {loading ? (
          <Typography>Loading employees...</Typography>
        ) : (
          <EmployeeTable
            employees={filteredEmployees}
            setEmployees={setEmployees}
            onEdit={(emp) => {
              setSelectedEmployee(emp);
              setShowForm(true);
            }}
          />
        )}
      </Paper>
      {showForm && (
        <EmployeeForm
          selectedEmployee={selectedEmployee}
          onClose={() => setShowForm(false)}
          refreshEmployees={() => setEmployees(getEmployees())}
        />
      )}
    </Box>
  );
};

export default Dashboard;
