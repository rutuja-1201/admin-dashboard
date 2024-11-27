import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Tooltip, Snackbar, Alert } from "@mui/material";
import { useRBAC } from "../../context/RBACContext";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import DeleteUserDialog from "./DeleteUserDialog";
import { CheckCircle, Cancel, Edit, Delete } from "@mui/icons-material";

const Users = () => {
  const { users, updateUser } = useRBAC();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

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
      const newStatus = user.status === "Active" ? "Inactive" : "Active";
      updateUser(id, { status: newStatus });
      setNotification(`User status updated to ${newStatus}`);
    }
  };

  const handleNotificationClose = () => setNotification(null);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>{params.row.status}</span>
          <Tooltip title="Toggle User Status">
            <Button
              variant="outlined"
              size="small"
              color={params.row.status === "Active" ? "success" : "error"}
              onClick={() => handleToggleStatus(params.row.id)}
              startIcon={
                params.row.status === "Active" ? <CheckCircle /> : <Cancel />
              }
              sx={{
                minWidth: "auto",
                padding: "4px",
                "&:hover": {
                  backgroundColor:
                    params.row.status === "Active"
                      ? "rgba(76, 175, 80, 0.1)"
                      : "rgba(244, 67, 54, 0.1)",
                  transform: "scale(1.05)",
                  transition: "all 0.3s",
                },
              }}
            ></Button>
          </Tooltip>
        </div>
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "10px", paddingTop: "10px" }}>
          <Tooltip title="Edit User">
            <Button
              color="primary"
              size="small"
              variant="outlined"
              onClick={() => handleEditUser(params.row.id)}
              startIcon={<Edit />}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(33, 150, 243, 0.1)",
                  transform: "scale(1.05)",
                  transition: "all 0.3s",
                },
              }}
            >
              Edit
            </Button>
          </Tooltip>
          <Tooltip title="Delete User">
            <Button
              color="secondary"
              size="small"
              variant="outlined"
              onClick={() => handleDeleteUser(params.row.id)}
              startIcon={<Delete />}
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(244, 67, 54, 0.1)",
                  transform: "scale(1.05)",
                  transition: "all 0.3s",
                },
              }}
            >
              Delete
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ height: 450, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          style={{ background: "#fff", borderRadius: 8 }}
        />
      </div>

      <AddUserModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
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

      <Snackbar
        open={!!notification}
        autoHideDuration={3000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleNotificationClose}
          severity="success"
          variant="filled"
          sx={{
            "& .MuiAlert-message": {
              fontWeight: "bold",
            },
            backgroundColor: "#4caf50",
          }}
        >
          {notification}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Users;
