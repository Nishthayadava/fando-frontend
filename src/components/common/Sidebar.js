import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom'; // Import Navigate here
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import { List, ListItem, ListItemText, Divider, ListItemIcon, Avatar, IconButton, Drawer } from '@mui/material'; // Import Drawer
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; // Missing import for ChevronLeftIcon
import ChevronRightIcon from '@mui/icons-material/ChevronRight'; // Missing import for ChevronRightIcon
import TrendingUpIcon from '@mui/icons-material/TrendingUp'; // Missing import for TrendingUpIcon
import Diversity3Icon from '@mui/icons-material/Diversity3'; // Missing import for Diversity3Icon
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck'; // Missing import for LibraryAddCheckIcon
import AdsClickIcon from '@mui/icons-material/AdsClick'; // Missing import for AdsClickIcon
import AccountBoxIcon from '@mui/icons-material/AccountBox'; // Missing import for AccountBoxIcon
import LogoutIcon from '@mui/icons-material/Logout'; // Missing import for LogoutIcon
import LoginIcon from '@mui/icons-material/Login'; // Missing import for LoginIcon
import { styled, useTheme } from '@mui/material/styles'; // Import useTheme

const drawerWidth = 200; // Defining the drawerWidth constant


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


const Sidebar = ({ isLoggedIn, role }) => {
  const [open, setOpen] = useState(true); // Use the state for controlling the drawer
  const theme = useTheme(); // Initialize the theme using useTheme hook
  const [isLoggedInState, setIsLoggedIn] = useState(isLoggedIn); // Track login state
  const [roleState, setRole] = useState(role); // Track user role


  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleLogin = async (userId) => {
    try {
      const response = await axios.post('/api/attendance/login', { userId });

      if (response.status === 201) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('role', response.data.role); // Store role in localStorage
        setIsLoggedIn(true);
        setRole(response.data.role); // Update state with the role
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  const handleLogout = async () => {
    const userId = localStorage.getItem('userId'); // Get userId from localStorage
    if (!userId) {
      console.error('User is not logged in');
      return;
    }

    try {
      // Send a POST request to the backend to log out and update attendance
      const response = await axios.post(
        'http://localhost:5000/api/attendance/logout',
        { userId }, // Send userId to backend to log out
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Send token if needed
          },
        }
      );

      // Handle the success response
      console.log('Logout success:', response.data);

      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('role');

      // Update state to reflect the user is logged out
      setIsLoggedIn(false);
      setRole(null);

      // Redirect to login page
<Navigate to="/login" />
    } catch (error) {
      // Handle error during logout API call
      console.error('Error logging out:', error);
      alert('Error logging out. Please try again later.');
    }
  };

  return (
    <div>
            <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: '#4d0099', // Set background color to blue
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>

          {isLoggedIn && (
            <ListItem sx={{ padding: '16px', display: 'flex', justifyContent: 'center' }}>
              <Avatar sx={{ width: 50, height: 50 }}></Avatar> {/* Profile icon */}
            </ListItem>
          )}

            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            

          </DrawerHeader>
          <Divider />
       <List>
            {/* Common Menu Item */}

               {/* Profile Section */}
          
                
        

            {/* Conditional Menu Items based on Role */}
            {/* {role === 'Admin' && (
              <> */}
                <ListItem button component={Link} to="/admindashboard" sx={{ color: 'white' }}>
                  <ListItemIcon>
                    <DashboardIcon sx={{ color: 'white' }}/>
                  </ListItemIcon>
                  <ListItemText primary="Admin Dashboard" />
                </ListItem>

                <ListItem button component={Link} to="/upload-leads" sx={{ color: 'white' }}>
                  <ListItemIcon>
                    <FolderSpecialIcon sx={{ color: 'white' }}/>
                  </ListItemIcon>
                  <ListItemText primary="Upload Leads" />
                </ListItem>


                <ListItem button component={Link} to="/paidCustomer" sx={{ color: 'white' }}>
                  <ListItemIcon>
                    <PersonAddIcon sx={{ color: 'white' }}/>
                  </ListItemIcon>
                  <ListItemText primary="Paid Customer" />
                </ListItem>

                <ListItem button component={Link} to="/tablePage" sx={{ color: 'white' }}>
                  <ListItemIcon>
                    <PersonAddIcon sx={{ color: 'white' }}/>
                  </ListItemIcon>
                  <ListItemText primary="User Consent" />
                </ListItem>

                <ListItem button component={Link} to="/OverallSales" sx={{ color: 'white' }}>
                  <ListItemIcon>
                    <TrendingUpIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Overall Sales" />
                </ListItem>

                <ListItem button component={Link} to="/salesAgentwise" sx={{ color: 'white' }}>
                  <ListItemIcon>
                    <Diversity3Icon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Sales Agentwise" />
                </ListItem>

                <ListItem button component={Link} to="/create-user" sx={{ color: 'white' }}>
                  <ListItemIcon>
                    <PersonAddIcon sx={{ color: 'white' }}/>
                  </ListItemIcon>
                  <ListItemText primary="Create User" />
                </ListItem>



                <ListItem button component={Link} to="/qualityAndComplaince" sx={{ color: 'white' }}>
                  <ListItemIcon>
                    <LibraryAddCheckIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Quality And Compliance" />
                </ListItem>

              {/* </>
            )} */}

            {/* {role === 'Agent' && (
              <> */}
              <ListItem button component={Link} to="/dashboard" sx={{ color: 'white' }}>
              <ListItemIcon>
                <DashboardIcon  sx={{ color: 'white' }}/>
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
                <ListItem button component={Link} to="/leads" sx={{ color: 'white' }}>
                  <ListItemIcon>
                    <AdsClickIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Leads" />
                </ListItem>

  
                <ListItem button component={Link} to="/paidCustomer" sx={{ color: 'white' }}>
                  <ListItemIcon>
                    <AccountBoxIcon sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Paid Customer" />
                </ListItem>

                <ListItem button component={Link} to="/tablePage" sx={{ color: 'white' }}>
                  <ListItemIcon>
                    <PersonAddIcon sx={{ color: 'white' }}/>
                  </ListItemIcon>
                  <ListItemText primary="User Consent" />
                </ListItem>



                <ListItem button component={Link} to="/followup" sx={{ color: 'white' }}>
                  <ListItemIcon>
                    <ZoomInIcon sx={{ color: 'white' }}/>
                  </ListItemIcon>
                  <ListItemText primary="Follow Up" />
                </ListItem>




                <ListItem button component={Link} to="/salesAgentwise" sx={{ color: 'white' }}>
                  <ListItemIcon>
                    <Diversity3Icon sx={{ color: 'white' }}/>
                  </ListItemIcon>
                  <ListItemText primary="Sales Agentwise" />
                </ListItem>

                <ListItem button component={Link} to="/qualityAndComplaince" sx={{ color: 'white' }}>
                  <ListItemIcon>
                    <LibraryAddCheckIcon  sx={{ color: 'white' }}/>
                  </ListItemIcon>
                  <ListItemText primary="Quality And Compliance" />
                </ListItem>
              
              {/* </>
              
            )} */}

            {/* Login/Logout */}
            {isLoggedIn ? (
            <ListItem button onClick={handleLogout} component={Link} to="/login" sx={{ color: 'white' }}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          ) : (
            <ListItem button onClick={() => handleLogin('testUserId')} component={Link} to="/login" sx={{ color: 'white' }}>
              <ListItemIcon>
                <LoginIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          )}
        </List>
        </Drawer>

  
    </div>
  );
};

export default Sidebar;
