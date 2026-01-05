import React from 'react'
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Avatar, Typography, Box } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FolderIcon from '@mui/icons-material/Folder'
import { Link, useLocation } from 'react-router-dom'


const drawerWidth = 260


export default function Sidebar({ open = true }) {
const location = useLocation()
return (
<Drawer
variant="permanent"
open={open}
sx={{
width: drawerWidth,
'& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' }
}}
>
<Toolbar>
<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
<Avatar>BW</Avatar>
<Typography variant="h6">ByeWind</Typography>
</Box>
</Toolbar>


<List>
<ListItemButton component={Link} to="/" selected={location.pathname === '/'}>
<ListItemIcon><DashboardIcon /></ListItemIcon>
<ListItemText primary="Default" />
</ListItemButton>


<ListItemButton component={Link} to="/orders" selected={location.pathname === '/orders'}>
<ListItemIcon><ShoppingCartIcon /></ListItemIcon>
<ListItemText primary="Employees List" />
</ListItemButton>


<ListItemButton component={Link} to="/products" selected={location.pathname === '/products'}>
<ListItemIcon><FolderIcon /></ListItemIcon>
<ListItemText primary="Products" />
</ListItemButton>
</List>
</Drawer>
)
}