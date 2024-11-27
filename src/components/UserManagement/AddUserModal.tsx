// import React, { useState } from 'react';
// import { useRBAC } from '../../context/RBACContext';
// import { Modal, TextField, Button, Box } from '@mui/material';

// interface AddUserModalProps {
//   open: boolean;
//   onClose: () => void;
// }

// const AddUserModal: React.FC<AddUserModalProps> = ({ open, onClose }) => {
//   const { addUser, roles } = useRBAC();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [role, setRole] = useState('');

//   const handleAddUser = () => {
//     addUser({ id: Date.now(), name, email, role, status: 'Active' });
//     onClose();
//   };
//   console.log("role",role)

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box
//         sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: 400,
//           bgcolor: 'background.paper',
//           p: 4,
//         }}
//       >
//         <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} />
//         <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />
//         <TextField
//           label="Role"
//           fullWidth
//           select
//           SelectProps={{ native: true }}
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           sx={{ mb: 2 }}
//         >
//           <option value="">Select Role</option>
//           {roles.map((r) => (
//             <option key={r.id} value={r.name}>
//               {r.name}
//             </option>
//           ))}
//         </TextField>
//         <Button variant="contained" color="primary" onClick={handleAddUser}>
//           Add User
//         </Button>
//       </Box>
//     </Modal>
//   );
// };

// export default AddUserModal;
import React, { useState } from 'react';
import { useRBAC } from '../../context/RBACContext';
import { Modal, TextField, Button, Box, MenuItem } from '@mui/material';

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ open, onClose }) => {
  const { addUser, roles } = useRBAC();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active'); 

  const handleAddUser = () => {
    addUser({ id: Date.now(), name, email, role, status });
    onClose();
  };

  console.log("roles",roles)

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
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Role"
          fullWidth
          select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          sx={{ mb: 2 }}
        >
          <MenuItem value="">Select Role</MenuItem>
          {roles.map((r) => (
            <MenuItem key={r.id} value={r.name}>
              {r.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Status"
          fullWidth
          select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
          sx={{ mb: 2 }}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>
        <Button variant="contained" color="primary" onClick={handleAddUser}>
          Add User
        </Button>
      </Box>
    </Modal>
  );
};

export default AddUserModal;
