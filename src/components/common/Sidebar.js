import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Divider, ListItemIcon, Avatar,ListItemButton, Typography,Box , Drawer } from '@mui/material'; // Import Drawer components
import { styled } from '@mui/material/styles'; // Import useTheme
import { useNavigate } from 'react-router-dom';
import {handleLogin, handleLogout } from './AuthHandler';

import {
  Dashboard as DashboardIcon,
  PersonAdd as PersonAddIcon,
  FolderSpecial as FolderSpecialIcon,
  ZoomIn as ZoomInIcon,
  TrendingUp as TrendingUpIcon,
  Diversity3 as Diversity3Icon,
  LibraryAddCheck as LibraryAddCheckIcon,
  AdsClick as AdsClickIcon,
  AccountBox as AccountBoxIcon,
  Logout as LogoutIcon,
  Login as LoginIcon
} from '@mui/icons-material';



const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',  // Vertically center the content
  justifyContent: 'flex-start',  // Align the items at the start horizontally
  width: '100%',  // Ensure the content fills the available space
  marginTop: theme.spacing(10),
  marginBottom: theme.spacing(4),
  paddingLeft:  theme.spacing(4),
}));


const Sidebar = ({ open, handleDrawerClose, isLoggedIn, role, setIsLoggedIn, setRole }) => {
 
  const navigate = useNavigate();
 // State to hold user profile data
 const [userProfile, setUserProfile] = useState({
  name: '',
  role: ''
});
   // Fetch user profile data
   useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userId = localStorage.getItem('userId');
      axios
        .get(`https://fandoexpert1.onrender.com/api/getuserprofile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const { name, role } = response.data;
          setUserProfile({ name, role });
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, [isLoggedIn]); // Fetch profile when login status changes

  const handleNavigate = (route) => {
    navigate(route);
    handleDrawerClose(); // Close the drawer after navigation
  };


  const handleLoginButtonClick = () => {
    const userId = localStorage.getItem('userId');
    handleLogin(userId, setIsLoggedIn, setRole, handleNavigate);
  };

  const handleLogoutButtonClick = () => {
    handleLogout(setIsLoggedIn, setRole, navigate);
  };
  useEffect(() => {
    // Sync state with localStorage whenever the `isLoggedIn` or `role` state changes
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    if (token && userRole) {
      setIsLoggedIn(true);
      setRole(userRole);
    }
  }, [isLoggedIn, role, setIsLoggedIn, setRole]); // Runs when login/logout occurs

  return (
    <div>
       <Drawer
      sx={{
        flexShrink: 0,

        '& .MuiDrawer-paper': {
          width: 240,
          backgroundColor: '#4d0099', // Dark theme for sidebar
          color: '#fff',
          border: 'none',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          borderRadius: '8px',
          transition: '0.3s ease-in-out',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
      onClose={handleDrawerClose}
    >
         <DrawerHeader>
          <Avatar sx={{ width: 40, height: 40, backgroundColor: '#fff', color: '#4d0099' }}>
            {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
          </Avatar>
          <Box sx={{ ml: 2 }}>
            <Typography variant="h6" color="white">
              {userProfile.name || 'User'}
            </Typography>
            <Typography variant="body2" color="white">
              {userProfile.role || 'Role'}
            </Typography>
          </Box>
        </DrawerHeader>
      <Divider sx={{ backgroundColor: '#fff' }} />
        <List>
  {/* Common Menu Item */}

  {/* Profile Section */}
  <ListItem>
    <ListItemButton onClick={() => handleNavigate('/dashboard')}>
      <ListItemIcon><DashboardIcon sx={{ color: 'white' }} /></ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
  </ListItem>

      <ListItem>
        <ListItemButton onClick={() => handleNavigate('/upload-leads')}>
          <ListItemIcon><FolderSpecialIcon sx={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="Upload Leads" />
        </ListItemButton>
      </ListItem>

      <ListItem>
        <ListItemButton onClick={() => handleNavigate('/paidCustomer')}>
          <ListItemIcon><PersonAddIcon sx={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="Paid Customer" />
        </ListItemButton>
      </ListItem>
  <ListItem>
        <ListItemButton onClick={() => handleNavigate('/userconsent')}>
          <ListItemIcon><PersonAddIcon sx={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="User Consent" />
        </ListItemButton>
      </ListItem>


      <ListItem>
        <ListItemButton onClick={() => handleNavigate('/OverallSales')}>
          <ListItemIcon><TrendingUpIcon sx={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="Overall Sales" />
        </ListItemButton>
      </ListItem>

      <ListItem>
        <ListItemButton onClick={() => handleNavigate('/salesAgentwise')}>
          <ListItemIcon><Diversity3Icon sx={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="Sales Agentwise" />
        </ListItemButton>
      </ListItem>

      <ListItem>
        <ListItemButton onClick={() => handleNavigate('/create-user')}>
          <ListItemIcon><PersonAddIcon sx={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="Create User" />
        </ListItemButton>
      </ListItem>





      <ListItem>
        <ListItemButton onClick={() => handleNavigate('/leads')}>
          <ListItemIcon><AdsClickIcon sx={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="Leads" />
        </ListItemButton>
      </ListItem>

      


    

  

      <ListItem>
        <ListItemButton onClick={() => handleNavigate('/followup')}>
          <ListItemIcon><ZoomInIcon sx={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="Follow Up" />
        </ListItemButton>
      </ListItem>



      <ListItem>
        <ListItemButton onClick={() => handleNavigate('/qualityAndComplaince')}>
          <ListItemIcon><LibraryAddCheckIcon sx={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="Quality And Compliance" />
        </ListItemButton>
      </ListItem>
  

  {/* Login/Logout */}
  {isLoggedIn ? (
    <ListItem>
      <ListItemButton onClick={handleLogoutButtonClick}>
        <ListItemIcon><LogoutIcon sx={{ color: 'white' }} /></ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </ListItem>
  ) : (
    <ListItem>
    <ListItemButton onClick={() => handleLoginButtonClick}>
    <ListItemIcon><LoginIcon sx={{ color: 'white' }} /></ListItemIcon>
        <ListItemText primary="Login" />
      </ListItemButton>
    </ListItem>
  )}
</List>

      </Drawer>
    </div>
  );
};

export default Sidebar;
