import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useRBAC } from '../../context/RBACContext';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import DeleteUserDialog from './DeleteUserDialog';

const Users = () => {
  const { users, updateUser } = useRBAC();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleEditUser = (id: number) => {
    setSelectedUserId(id);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = (id: number) => {
    setSelectedUserId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleToggleStatus = (id: number) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
      updateUser(id, { status: newStatus });
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <>
          <Button color="primary" onClick={() => handleEditUser(params.row.id)}>
            Edit
          </Button>
          <Button color="secondary" onClick={() => handleDeleteUser(params.row.id)}>
            Delete
          </Button>
          <Button
           
            onClick={() => handleToggleStatus(params.row.id)}
          >
            Toggle Status
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <div style={{ height: 400, width: '100%', marginTop: 20 }}>
        <DataGrid rows={users} columns={columns} />
      </div>

      <AddUserModal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      {selectedUserId !== null && (
        <>
          <EditUserModal
            open={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            userId={selectedUserId}
          />
          <DeleteUserDialog
            open={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            userId={selectedUserId}
          />
        </>
      )}
    </div>
  );
};

export default Users;
