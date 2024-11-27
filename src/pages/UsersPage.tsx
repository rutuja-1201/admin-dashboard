import React, { useState } from 'react';

import { Button } from '@mui/material';
import EditUserModal from '../components/UserManagement/EditUserModal';
import AddUserModal from '../components/UserManagement/AddUserModal';
import DeleteUserDialog from '../components/UserManagement/DeleteUserDialog';
import UserTable from '../components/UserManagement/UserTable';

const UsersPage: React.FC = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  return (
    <div>
      <h1>Users</h1>
      <Button variant="contained" onClick={() => setOpenAddModal(true)}>
        Add User
      </Button>
      <AddUserModal open={openAddModal} onClose={() => setOpenAddModal(false)} />
      {selectedUserId && (
        <>
          <EditUserModal open={openEditModal} onClose={() => setOpenEditModal(false)} userId={selectedUserId} />
          <DeleteUserDialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} userId={selectedUserId} />
        </>
      )}
      <UserTable />
    </div>
  );
};

export default UsersPage;
