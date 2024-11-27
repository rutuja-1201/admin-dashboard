import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Checkbox, FormControlLabel } from '@mui/material';

interface EditRoleModalProps {
  open: boolean;
  onClose: () => void;
  roleId: number;
  roles: { id: number; name: string; permissions: string[] }[];
  onUpdate: (updatedRole: { id: number; name: string; permissions: string[] }) => void;
}

const predefinedPermissions = ['Read', 'Write', 'Delete'];

const EditRoleModal: React.FC<EditRoleModalProps> = ({ open, onClose, roleId, roles, onUpdate }) => {
  const [roleName, setRoleName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    const role = roles.find((r) => r.id === roleId);
    if (role) {
      setRoleName(role.name);
      setSelectedPermissions(role.permissions);
    }
  }, [roleId, roles]);

  const handlePermissionToggle = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((perm) => perm !== permission)
        : [...prev, permission]
    );
  };

  const handleSubmit = () => {
    onUpdate({ id: roleId, name: roleName, permissions: selectedPermissions });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Role</DialogTitle>
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
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditRoleModal;
