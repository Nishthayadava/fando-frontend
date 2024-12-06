// Header.js
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
    const [open, setOpen] = React.useState(true); // Default to open

    const handleDrawerOpen = () => {
        setOpen(true);
      };
    
  return (
    <AppBar position="fixed">

<Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                mr: 2,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Welcome To F&O Expert CRM
            </Typography>
          </Toolbar>
     
    </AppBar>
  );
};

export default Header;
