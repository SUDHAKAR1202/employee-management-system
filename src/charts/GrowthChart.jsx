import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";


const data = [
  { name: "Mar", projected: 15000, actual: 12000 },
  { name: "Apr", projected: 25000, actual: 20000 },
  { name: "May", projected: 40000, actual: 35000 },
  { name: "Jun", projected: 55000, actual: 48000 },
];

const GrowthChart = () => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} barSize={30}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="name" stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip />
        <Legend />

        <Bar
          dataKey="projected"
          fill="#8884d8"
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="actual"
          fill="#82ca9d"
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GrowthChart;
