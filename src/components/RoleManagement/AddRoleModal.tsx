import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Checkbox, FormControlLabel } from '@mui/material';

interface AddRoleModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newRole: { id: number; name: string; permissions: string[] }) => void;
}

const predefinedPermissions = ['Read', 'Write', 'Delete'];

const AddRoleModal: React.FC<AddRoleModalProps> = ({ open, onClose, onAdd }) => {
  const [roleName, setRoleName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const handlePermissionToggle = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((perm) => perm !== permission)
        : [...prev, permission]
    );
  };

  const handleSubmit = () => {
    const newRole = {
      id: Date.now(), 
      name: roleName,
      permissions: selectedPermissions,
    };
    onAdd(newRole);
    onClose();
    setRoleName('');
    setSelectedPermissions([]);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Role</DialogTitle>
      <DialogContent>
        <TextField
          label="Role Name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          fullWidth
        />
        <div>
          {predefinedPermissions.map((perm) => (
            <FormControlLabel
              key={perm}
              control={
                <Checkbox
                  checked={selectedPermissions.includes(perm)}
                  onChange={() => handlePermissionToggle(perm)}
                />
              }
              label={perm}
            />
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add Role
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRoleModal;
