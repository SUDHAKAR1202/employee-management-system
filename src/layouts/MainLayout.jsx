import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function MainLayout() {
  const [open, setOpen] = React.useState(true);

  const DRAWER_WIDTH = 260;
  const COLLAPSED_WIDTH = 72;

  const sidebarWidth = open ? DRAWER_WIDTH : COLLAPSED_WIDTH;

  return (
    <Box sx={{ display: "flex", width: "100vw" }}>
      <Sidebar open={open} width={sidebarWidth} />

      <Box
        component="main"
        sx={{
          width: `calc(100vw - ${sidebarWidth}px)`,
          minHeight: "100vh",
          bgcolor: "background.default",
          overflowX: "hidden",
        }}
      >
        <Topbar onToggleSidebar={() => setOpen((s) => !s)} />
        <Toolbar />

        {/* CONTENT */}
        <Box sx={{ width: "100%", p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
