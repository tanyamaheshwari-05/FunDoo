import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Header/Navbar';
import SideNavigation from '../Components/SideNavigation/SideNavigation';

// Drawer ki width jo aapne SideNavigation mein use ki hai (Keep style usually 240-280px)
const drawerWidth = 240; 
const closedDrawerWidth = 64;

export default function Fundo() {
  const [open, setOpen] = useState(false);
  const [isGridView, setIsGridView] = useState(true);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw' }}>
      <Navbar
        handleDrawerToggle={() => setOpen(!open)}
        isGridView={isGridView}
        setIsGridView={setIsGridView}
      />
      
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <SideNavigation open={open} />
        
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start', 
            width: 'auto',
            minWidth: 0,
          }}
        >
          <Box sx={{ width: '100%', maxWidth: '1000px' }}>
             <Outlet context={{ isGridView }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}