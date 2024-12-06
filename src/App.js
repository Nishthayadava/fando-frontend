import React, { useState ,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar'; 
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PaidCustomer from './components/PaidCustomer'
import OverallSales from './components/OverallSales';
import SalesAgentwise from './components/SalesAgentwise';
import QualityAndCompliance from './components/QualityAndComplaince';
import TablePage from './components/TablePage';

import AdminDashboard from './components/Admin/AdminDashboard'; // Adjust the path as necessary
import LeadsDashboard from './components/Agent/Lead/LeadsDashboard';
import CreateUser from './components/CreateUser';
import UploadLeads from './components/Admin/CSV/UploadLeads';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import Diversity3Icon from '@mui/icons-material/Diversity3';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import FollowUp from './components/Agent/Lead/FollowUp';


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

  const [role, setRole] = useState(localStorage.getItem('role')); // Get role from localStorage
  const [loading, setLoading] = useState(true); // Loading state to avoid flickering

  


  const isAuthenticated = () => {
    return !!localStorage.getItem('token'); // Check if token exists
  };

  // Ensure state is updated when component loads
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
    setRole(localStorage.getItem('role'));
    setLoading(false); // Stop loading after checking auth status

   
    
  }, [isLoggedIn]);


  if (loading) return <div>Loading...</div>; // Avoid flickering until the auth state is resolved


  return (
  
  );
}

export default App;
