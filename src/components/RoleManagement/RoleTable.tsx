import React from 'react';
import { Box, Card, CardContent, CardActions, Typography, Button, Grid, useTheme, useMediaQuery } from '@mui/material';

interface RoleTableProps {
  roles: { id: number; name: string; permissions: string[] }[];
  onEdit: (roleId: number) => void;
  onDelete: (roleId: number) => void;
}

const RoleTable: React.FC<RoleTableProps> = ({ roles, onEdit, onDelete }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Roles
      </Typography>

      <Grid container spacing={3}>
        {roles.map((role) => (
          <Grid item xs={12} sm={6} md={4} key={role.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {role.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Permissions: {role.permissions.join(', ')}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  onClick={() => onEdit(role.id)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  variant="outlined"
                  onClick={() => onDelete(role.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RoleTable;
