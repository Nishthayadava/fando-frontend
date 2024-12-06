import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';

const Sidebar = ({ isLoggedIn, role }) => {
  return (
    <div>
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
                  <LogoutIcon sx={{ color: 'white' }}/>
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            ) : (
              <ListItem button onClick={() => handleLogin('testUserId')} component={Link} to="/login" sx={{ color: 'white' }}>
                <ListItemIcon>
                  <LoginIcon sx={{ color: 'white' }}/>
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
            )}
          </List>
      <Divider />
    </div>
  );
};

export default Sidebar;
