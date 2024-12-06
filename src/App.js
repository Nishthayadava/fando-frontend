// App.js
import React, { useState, useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './components/common/Sidebar';
import RoutesConfig from './components/common/RoutesConfig';
import {  useLocation } from 'react-router-dom';  // <-- Import useLocation here

import { styled, useTheme } from '@mui/material/styles';
import Header from './components/common/Header'; // Import the Header component

const drawerWidth = 240;

// Rename custom styled AppBar to avoid conflict
const StyledAppBar = styled('div', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? 0 : `-${drawerWidth}px`,
  })
);

function App() {
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const location = useLocation(); // Get the current location

  // Check if user is authenticated


  // Ensure state is updated on initial load
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
    setRole(localStorage.getItem('role'));
    setLoading(false); // Stop loading after checking auth status
 


  if (!isLoggedIn) {
    // Store the path in localStorage before redirecting to login
    if (location.pathname !== '/login') {
      localStorage.setItem('redirectTo', location.pathname);
    }
  }
}, [isLoggedIn, location]);


  if (loading) return <div>Loading...</div>; // Avoid flickering until the auth state is resolved

  return (
   
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header /> {/* Use the Header component here */}

        <Sidebar open={open} />
        <StyledAppBar>
          <RoutesConfig isLoggedIn={isLoggedIn} />
        </StyledAppBar>
      </Box>
   
  );
}

export default App;
