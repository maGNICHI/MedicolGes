import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import { toast, ToastContainer } from 'react-toastify';
// Modal style
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AddNewUserModal() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    gender: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Adjust the URL to match your API endpoint
      const response = await axios.post('http://localhost:5000/api/user/addUser', formData);
      console.log(response.data);
      handleClose(); // Close the modal on success
      toast.success('User added successfully!'); // Display success toast
    } catch (error) {
      console.error('There was an error adding the user:', error.response?.data || error.message);
      toast.error('Error adding user:missing fields or exisiting user '  ); // Display error toast
    }
  };
  return (
    <>
      <Button onClick={handleOpen} sx={{
    borderRadius: 20, // Rounded corners
    boxShadow: 'none', // No shadow for a cleaner look
    '&:hover': {
      boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)', // Custom hover effect
    },
    padding: '8px 16px', // Custom padding
    fontSize: '16px', // Font size
    fontWeight: 600, // Font weight
  }}   startIcon={<AddIcon />} >Add New User</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New User
          </Typography>
          <FormControl fullWidth margin="normal">
  <InputLabel id="gender-select-label">Gender</InputLabel>
  <Select
    labelId="gender-select-label"
    id="gender-select"
    name="gender"
    value={formData.gender}
    label="Gender"
    onChange={handleChange}
  >
    <MenuItem value="Mr">Mr</MenuItem>
    <MenuItem value="Mrs">Mrs</MenuItem>
  </Select>
</FormControl>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <MenuItem value="Patient">Patient</MenuItem>
              <MenuItem value="participative_member">Participative_Member</MenuItem>
              <MenuItem value="Coordinator_Member">Coordinator_Member</MenuItem>
              <MenuItem value="Professionnal">Professionnal</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>  
              <MenuItem value="initiator">initiator</MenuItem> 
              <MenuItem value="super admin">super admin</MenuItem> 
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>Submit</Button>
        </Box>
      </Modal>
    </>
  );
}

export default AddNewUserModal;
