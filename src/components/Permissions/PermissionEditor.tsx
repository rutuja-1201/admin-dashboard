import React, { useState } from 'react';
import { Modal, Checkbox, FormControlLabel, Button, Box } from '@mui/material';
import { useRBAC } from '../../context/RBACContext';

interface PermissionEditorProps {
  open: boolean;
  onClose: () => void;
  roleId: number;
}

const PermissionEditor: React.FC<PermissionEditorProps> = ({ open, onClose, roleId }) => {
  const { roles, updateRole } = useRBAC();
  const role = roles.find((r) => r.id === roleId);
  const [permissions, setPermissions] = useState(role?.permissions || []);

  const availablePermissions = ['Read', 'Write', 'Delete', 'Update'];

  const handleTogglePermission = (permission: string) => {
    if (permissions.includes(permission)) {
      setPermissions(permissions.filter((p) => p !== permission));
    } else {
      setPermissions([...permissions, permission]);
    }
  };

  const handleSavePermissions = () => {
    if (roleId) {
      updateRole(roleId, { permissions });
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
        <h3>Edit Permissions</h3>
        {availablePermissions.map((perm) => (
          <FormControlLabel
            key={perm}
            control={
              <Checkbox
                checked={permissions.includes(perm)}
                onChange={() => handleTogglePermission(perm)}
              />
            }
            label={perm}
          />
        ))}
        <Box mt={2}>
          <Button variant="contained" onClick={handleSavePermissions}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PermissionEditor;
