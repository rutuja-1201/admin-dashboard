import React, { useState } from 'react';
import { Button } from '@mui/material';
import AddRoleModal from '../components/RoleManagement/AddRoleModal';
import EditRoleModal from '../components/RoleManagement/EditRoleModal';
import RoleTable from '../components/RoleManagement/RoleTable';

interface Role {
  id: number;
  name: string;
  permissions: string[];
}

const RolesPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([
    { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
    { id: 2, name: 'Editor', permissions: ['Read', 'Write'] },
  ]);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);

  const handleAddRole = (newRole: Role) => {
    setRoles((prevRoles) => [...prevRoles, newRole]);
  };

  const handleUpdateRole = (updatedRole: Role) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) => (role.id === updatedRole.id ? updatedRole : role))
    );
  };

  const handleDeleteRole = (roleId: number) => {
    setRoles((prevRoles) => prevRoles.filter((role) => role.id !== roleId));
  };

  return (
    <div>
      <h1>Role Management</h1>
      <Button variant="contained" onClick={() => setOpenAddModal(true)}>
        Add Role
      </Button>
      <AddRoleModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onAdd={handleAddRole}
      />
      {selectedRoleId && (
        <EditRoleModal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          roleId={selectedRoleId}
          roles={roles}
          onUpdate={handleUpdateRole}
        />
      )}
      <RoleTable
        roles={roles}
        onEdit={(roleId: number) => {
          setSelectedRoleId(roleId);
          setOpenEditModal(true);
        }}
        onDelete={handleDeleteRole}
      />
    </div>
  );
};

export default RolesPage;
