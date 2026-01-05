import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", customers: 200 },
  { month: "Feb", customers: 400 },
  { month: "Mar", customers: 650 },
  { month: "Apr", customers: 800 },
  { month: "May", customers: 900 },
  { month: "Jun", customers: 1245 },
];

const CustomersChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="customers" stroke="#1976d2" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomersChart;
