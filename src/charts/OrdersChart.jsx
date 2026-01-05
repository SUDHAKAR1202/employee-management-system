import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", orders: 120 },
  { month: "Feb", orders: 180 },
  { month: "Mar", orders: 240 },
  { month: "Apr", orders: 320 },
  { month: "May", orders: 400 },
  { month: "Jun", orders: 532 },
];

const OrdersChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="orders" fill="#9c27b0" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OrdersChart;
