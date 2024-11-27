import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useRBAC } from '../../context/RBACContext';

interface DeleteUserDialogProps {
  open: boolean;
  onClose: () => void;
  userId: number;
}

const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({ open, onClose, userId }) => {
  const { deleteUser } = useRBAC();

  const handleDeleteUser = () => {
    deleteUser(userId);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>Are you sure you want to delete this user?</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDeleteUser} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserDialog;
