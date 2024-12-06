import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, IconButton, Toolbar } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import RoutesConfig from './components/RoutesConfig';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, useTheme } from '@mui/material/styles';
import { AppBar as MuiAppBar, Drawer } from '@mui/material'; // Import original AppBar as MuiAppBar
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

// Rename custom styled AppBar to avoid conflict
const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: '#4d0099',
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
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
  const theme = useTheme();
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  // Ensure state is updated on initial load
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
    setRole(localStorage.getItem('role'));
    setLoading(false); // Stop loading after checking auth status
  }, []);

  if (loading) return <div>Loading...</div>; // Avoid flickering until the auth state is resolved

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <StyledAppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setOpen(!open)}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </StyledAppBar>

        <Sidebar open={open} />
        <Main open={open}>
          <RoutesConfig isLoggedIn={isLoggedIn} />
        </Main>
      </Box>
    </Router>
  );
}

export default App;
