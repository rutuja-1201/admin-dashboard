import React, { useState } from 'react';
import { Modal, TextField, Button, Box } from '@mui/material';
import { useRBAC } from '../../context/RBACContext';

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  userId: number;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ open, onClose, userId }) => {
  const { users, updateUser, roles } = useRBAC();
  const user = users.find((u) => u.id === userId);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState(user?.role || '');

  const handleUpdateUser = () => {
    if (userId) {
      updateUser(userId, { name, email, role });
    }
    onClose();
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
        }}
      >
        <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} />
        <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />
        <TextField
          label="Role"
          fullWidth
          select
          SelectProps={{ native: true }}
          value={role}
          onChange={(e) => setRole(e.target.value)}
          sx={{ mb: 2 }}
        >
          <option value="">Select Role</option>
          {roles.map((r) => (
            <option key={r.id} value={r.name}>
              {r.name}
            </option>
          ))}
        </TextField>
        <Button variant="contained" color="primary" onClick={handleUpdateUser}>
          Update User
        </Button>
      </Box>
    </Modal>
  );
};

export default EditUserModal;
