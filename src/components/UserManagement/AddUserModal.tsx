import React, { useState } from 'react';
import { useRBAC } from '../../context/RBACContext';
import { Modal, TextField, Button, Box, MenuItem, Typography, CircularProgress } from '@mui/material';

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ open, onClose }) => {
  const { addUser, roles } = useRBAC();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
  const [errors, setErrors] = useState<{ name?: string; email?: string; role?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Valid email is required';
    if (!role) newErrors.role = 'Role is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddUser = () => {
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      addUser({ id: Date.now(), name, email, role, status });
      setIsLoading(false);
      onClose();
    }, 1000); 
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
          Add New User
        </Typography>
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Role"
          fullWidth
          select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          error={!!errors.role}
          helperText={errors.role}
          sx={{ mb: 2 }}
        >
          <MenuItem value="">Select Role</MenuItem>
          {roles.map((r) => (
            <MenuItem key={r.id} value={r.name}>
              {r.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Status"
          fullWidth
          select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
          sx={{ mb: 2 }}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddUser}
            disabled={isLoading || !name || !email || !role}
            startIcon={isLoading && <CircularProgress size={20} />}
          >
            {isLoading ? 'Adding...' : 'Add User'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddUserModal;
