import React, { useContext } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Box, InputBase } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import SearchIcon from '@mui/icons-material/Search'
import { ColorModeContext } from '../App'


export default function Topbar({ onToggleSidebar }) {
const colorMode = useContext(ColorModeContext)
const mode = localStorage.getItem('mode') || 'dark'


return (
<AppBar position="fixed" color="default" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
<Toolbar>
<IconButton edge="start" onClick={onToggleSidebar} sx={{ mr: 2 }}>
<MenuIcon />
</IconButton>


<Typography variant="h6" sx={{ flexGrow: 1 }}>Dashboards / Default</Typography>


<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'background.paper', px: 1, borderRadius: 1 }}>
<SearchIcon />
<InputBase placeholder="Search..." />
</Box>


<IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
{mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
</IconButton>
</Toolbar>
</AppBar>
)
}