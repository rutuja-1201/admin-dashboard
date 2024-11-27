import React from 'react';
import { Box, Card, CardContent, CardActions, Typography, Button, useTheme } from '@mui/material';

interface RoleTableProps {
  roles: { id: number; name: string; permissions: string[] }[];
  onEdit: (roleId: number) => void;
  onDelete: (roleId: number) => void;
}

const RoleTable: React.FC<RoleTableProps> = ({ roles, onEdit, onDelete }) => {
  const theme = useTheme();

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Roles
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: 3,
          [theme.breakpoints.down('lg')]: {
            gridTemplateColumns: 'repeat(2, 1fr)', 
          },
          [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr', 
          },
        }}
      >
        {roles.map((role) => (
          <Card
            key={role.id}
            sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
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
        ))}
      </Box>
    </Box>
  );
};

export default RoleTable;
