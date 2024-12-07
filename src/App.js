import React, { useState, useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './components/common/Sidebar';
import RoutesConfig from './components/common/RoutesConfig';
import { useLocation, useNavigate } from 'react-router-dom';  // <-- Import useLocation and useNavigate

import { styled, useTheme } from '@mui/material/styles';
import Header from './components/common/Header'; // Import the Header component

const drawerWidth = 240; // Defining the drawerWidth constant

// Rename custom styled AppBar to avoid conflict
const StyledAppBar = styled('div', { shouldForwardProp: (prop) => prop !== 'open' })( 
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? drawerWidth : 0, // Adjusting margin for the AppBar
  })
);

function App() {
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // To redirect after login or logout

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  // Ensure state is updated on initial load
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
    setRole(localStorage.getItem('role'));
    setLoading(false); // Stop loading after checking auth status

 
  }, [isLoggedIn, location, navigate]);

  if (loading) return <div>Loading...</div>; // Avoid flickering until the auth state is resolved

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} isLoggedIn={isLoggedIn} role={role} setIsLoggedIn={setIsLoggedIn} setRole={setRole} />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          transition: 'margin-left 0.3s ease', // Smooth transition when the sidebar is toggled
          marginTop: '64px', // Adjust for AppBar height
        }}
      >
        <CssBaseline />
        <Header handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} open={open} />
        <StyledAppBar open={open}>
          <RoutesConfig isLoggedIn={isLoggedIn} />
        </StyledAppBar>
      </Box>
    </Box>
  );
}

export default App;
