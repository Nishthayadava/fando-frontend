import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import { List, ListItem, ListItemText, Divider, ListItemIcon, Avatar, IconButton, Drawer } from '@mui/material'; // Import Drawer components
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { styled, useTheme } from '@mui/material/styles'; // Import useTheme


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Sidebar = ({ open, handleDrawerClose }) => {
  const theme = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  const handleLogin = async (userId) => {
    try {
      const response = await axios.post('https://fandoexpert1.onrender.com/api/attendance/login', { userId });

      if (response.status === 201) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('role', response.data.role); // Store role in localStorage
        setIsLoggedIn(true);
        setRole(response.data.role);

        // Redirect based on role
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User is not logged in');
      return;
    }

    try {
      const response = await axios.post(
        'https://fandoexpert1.onrender.com/api/attendance/logout',
        { userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log('Logout success:', response.data);

      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('role');

      setIsLoggedIn(false);
      setRole(null);

    } catch (error) {
      console.error('Error logging out:', error);
      alert(`Error logging out: ${error.response ? error.response.data : error.message}`);
    }
  };


  return (
    <div>
      <Drawer
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            paddingTop:'64px',

            backgroundColor: '#4d0099',
            transition: 'transform 0.3s ease',
            transform: open ? 'translateX(0)' : 'translateX(-50%)', // Move sidebar in and out
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          {/* <IconButton onClick={handleDrawerClose}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton> */}
          {isLoggedIn && (
            <ListItem sx={{ padding: '16px', display: 'flex', justifyContent: 'center' }}>
              <Avatar sx={{ width: 50, height: 50 }}></Avatar> {/* Profile icon */}
            </ListItem>
          )}
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
