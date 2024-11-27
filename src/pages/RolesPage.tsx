import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AddRoleModal from "../components/RoleManagement/AddRoleModal";
import EditRoleModal from "../components/RoleManagement/EditRoleModal";
import RoleTable from "../components/RoleManagement/RoleTable";
import { useRBAC } from "../context/RBACContext";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const RolesPage: React.FC = () => {
  const { roles, addRole, updateRole, deleteRole } = useRBAC();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);

  const handleAddRole = (newRole: { name: string; permissions: string[] }) => {
    const id = roles.length ? Math.max(...roles.map((role) => role.id)) + 1 : 1;
    addRole({ id, ...newRole });
    setOpenAddModal(false);
  };

  const handleUpdateRole = (updatedRole: {
    name?: string;
    permissions?: string[];
  }) => {
    if (selectedRoleId !== null) {
      updateRole(selectedRoleId, updatedRole);
      setOpenEditModal(false);
    }
  };

  return (
    <div>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Role Management
        </Typography>

        <Box sx={{ paddingTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            onClick={() => setOpenAddModal(true)}
            sx={{
              textTransform: "none",
              boxShadow: 2,
              "&:hover": {
                boxShadow: 4,
              },
              padding: "10px 20px",
            }}
          >
            Add Role
          </Button>
        </Box>
      </Box>
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
        onDelete={(roleId: number) => deleteRole(roleId)}
      />
    </div>
  );
};

export default RolesPage;
