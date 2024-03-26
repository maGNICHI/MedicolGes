import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField, Button } from '@mui/material';
import { FaBan, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';

const CustomPaper = styled(Paper)(({ theme }) => ({
  width: '100%', 
  overflow: 'hidden',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
}));

const SearchField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
}));

const CustomButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const CheckTable = () => {
  const [usersData, setUsersData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/v1/admin/get-users');
        setUsersData(response.data.usersData);
        setFilteredUsers(response.data.usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const lowercasedFilter = searchQuery.toLowerCase();
    const filteredData = usersData.filter(item => {
      return Object.keys(item).some(key =>
        item[key].toString().toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredUsers(filteredData);
  }, [searchQuery, usersData]);
  const fetchUsers = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/admin/get-users');
      setUsersData(response.data.usersData); // Update based on your actual API response
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
   
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleBlockUser = async (userId) => {
    try {
      await axios.patch('http://localhost:5000/api/v1/admin/block-user', { userId });
      fetchUsers(); // Refetch users to update the UI after blocking
      toast.warning('The user is blocked :('); // Display success toast
    } catch (error) {
      console.error('Error blocking user:', error);
      toast.error('Failed to block user'); // Display error toast
    }
  };
  
  const handleUnblockUser = async (userId) => {
    try {
      await axios.patch('http://localhost:5000/api/v1/admin/unblock-user', { userId });
      fetchUsers(); // Refetch users to update the UI after unblocking
      toast.success('The user is unblocked :)'); // Display success toast
    } catch (error) {
      console.error('Error unblocking user:', error);
      toast.error('Failed to unblock user'); // Display error toast
    }
  };
  return (
    
     <Paper sx={{
      width: '100%',
      overflow: 'hidden',
      backgroundColor: '#f5f5f5' // Custom background color
    }}>
       <TextField
        fullWidth
        label="Search by name , email or role"
        variant="outlined"
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2, mx: 2 }}
      />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
          
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Account status</TableCell>
              <TableCell>Actions</TableCell>
              
            </TableRow>
          </TableHead>
          
          <TableBody>
  {filteredUsers
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((user, index) => {
      const userNumber = page * rowsPerPage + index + 1; // Calculate the user number
      return (
        <TableRow hover key={user._id}>
          <TableCell>{`${userNumber}. ${user.name}`}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.role}</TableCell>
          <TableCell>{user.blocked ? "Blocked" : "Active"}</TableCell>
          <TableCell>
            <Button
              onClick={() => handleBlockUser(user._id)}
              variant="outlined"
              color="error"
              startIcon={<FaBan />}
            >
              Block
            </Button>
            <Button
              onClick={() => handleUnblockUser(user._id)}
              variant="outlined"
              color="success"
              startIcon={<FaCheck />}
              sx={{ ml: 2 }}
            >
              Unblock
            </Button>
          </TableCell>
        </TableRow>
      );
    })}
</TableBody>

        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 50, 100, 200]}
        component="div"
        count={usersData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CheckTable;


















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { Grid, Card, CardContent, CardActions, Typography, Button, TextField } from '@mui/material';
// import { FaBan, FaCheck } from 'react-icons/fa';
// import { styled } from '@mui/material/styles';

// const SearchField = styled(TextField)(({ theme }) => ({
//   marginBottom: theme.spacing(3),
//   marginLeft: theme.spacing(2),
//   marginRight: theme.spacing(2),
// }));

// const CheckCards = () => {
//   const [usersData, setUsersData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     fetchUsers();
//   }, [searchQuery]);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/v1/admin/get-users', { searchQuery });
//       setUsersData(response.data.usersData);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const handleBlockUser = async (userId) => {
//     try {
//       await axios.patch('http://localhost:5000/api/v1/admin/block-user', { userId });
//       toast.success('The user is blocked :(');
//       fetchUsers();
//     } catch (error) {
//       console.error('Error blocking user:', error);
//       toast.error('Failed to block user');
//     }
//   };

//   const handleUnblockUser = async (userId) => {
//     try {
//       await axios.patch('http://localhost:5000/api/v1/admin/unblock-user', { userId });
//       toast.success('The user is unblocked :)');
//       fetchUsers();
//     } catch (error) {
//       console.error('Error unblocking user:', error);
//       toast.error('Failed to unblock user');
//     }
//   };

//   return (
//     <>
//       <SearchField
//         fullWidth
//         label="Search by name or email"
//         variant="outlined"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />
//       <Grid container spacing={3}>
//         {usersData.map((user) => (
//           <Grid item xs={12} sm={6} md={4} key={user._id}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h5" component="h2">
//                   Name:{user.name}
//                 </Typography>
//                 <Typography color="textSecondary">
//                 Email:{user.email}
//                 </Typography>
//                 <Typography variant="body2" component="p">
//                   Role: {user.role}
//                 </Typography>
//                 <Typography variant="body2" component="p" style={{ color: user.blocked ? 'red' : 'green' }}>
//                   Status: {user.blocked ? "Blocked" : "Active"}
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <Button size="small" color="primary" onClick={() => handleBlockUser(user._id)}>
//                   Block
//                 </Button>
//                 <Button size="small" color="secondary" onClick={() => handleUnblockUser(user._id)}>
//                   Unblock
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </>
//   );
// };

// export default CheckCards;
