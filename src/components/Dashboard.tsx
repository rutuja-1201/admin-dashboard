import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Paper, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { Home as HomeIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
     
      <AppBar position="sticky" sx={{ boxShadow: 3 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" sx={{ mr: 2 }}>
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            RBAC Dashboard
          </Typography>
       
        </Toolbar>
      </AppBar>

      
      <Box
        sx={{
          mt: 3,
          px: isSmallScreen ? 2 : 5,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          alignItems: 'center',
        }}
      >
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row',
            gap: 2,
            width: '100%',
            maxWidth: '800px',
          }}
        >
          <Paper
            sx={{
              flex: 1,
              padding: 2,
              boxShadow: 3,
              textAlign: 'center',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            <Typography variant="h6" color="primary">
              Total Users
            </Typography>
            <Typography variant="h4" color="text.secondary">
              1,024
            </Typography>
          </Paper>
          <Paper
            sx={{
              flex: 1,
              padding: 2,
              boxShadow: 3,
              textAlign: 'center',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            <Typography variant="h6" color="primary">
              Active Roles
            </Typography>
            <Typography variant="h4" color="text.secondary">
              35
            </Typography>
          </Paper>
          <Paper
            sx={{
              flex: 1,
              padding: 2,
              boxShadow: 3,
              textAlign: 'center',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            <Typography variant="h6" color="primary">
              Monthly Growth
            </Typography>
            <Typography variant="h4" color="text.secondary">
              +15%
            </Typography>
          </Paper>
        </Box>

        
        <Paper
          sx={{
            width: '100%',
            maxWidth: '800px',
            padding: 3,
            boxShadow: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Get Started with RBAC
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/users"
            sx={{ mx: 1 }}
          >
            Manage Users
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/roles"
            sx={{ mx: 1 }}
          >
            Manage Roles
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
