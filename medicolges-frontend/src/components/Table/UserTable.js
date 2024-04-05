import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Table, TableBody, TableCell,Grid,Typography,CardContent,CardActions,CardMedia, Card,TableContainer, TableHead, TableRow, TablePagination, TextField, Button } from '@mui/material';
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
  const [rowsPerPage, setRowsPerPage] = useState(20);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/user/get-users');
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
      const response = await axios.post('http://localhost:5000/api/user/get-users');
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

  const handleBlockUser = async (_id) => {
    try {
      await axios.patch('http://localhost:5000/api/user/block-user', { _id });
      fetchUsers(); // Refetch users to update the UI after blocking
      toast.warning('The user is blocked :('); // Display success toast
    } catch (error) {
      console.error('Error blocking user:', error);
      toast.error('Failed to block user'); // Display error toast
    }
  };
  

  const handleDelete = async (_id) => {
    try {
        // Use the DELETE method and include the _id in the URL
        await axios.post(`http://localhost:5000/api/user/delete-user/${_id}`);
        fetchUsers(); // Refetch users to update the UI after deletion
        toast.warning('The user is deleted :('); // Display success toast
    } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user'); // Display error toast
    }
};



  const handleUnblockUser = async (_id) => {
    try {
      await axios.patch('http://localhost:5000/api/user/unblock-user', { _id });
      fetchUsers(); // Refetch users to update the UI after unblocking
      toast.success('The user is unblocked :)'); // Display success toast
    } catch (error) {
      console.error('Error unblocking user:', error);
      toast.error('Failed to unblock user'); // Display error toast
    }
  };
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: '#f5f5f5', marginBottom: 2 }}>
      {/* Search Field */}
      <TextField
       fullWidth label="Search by name, email, or role" variant="outlined" margin="normal" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} sx={{ mb: 2, mx: 2 }} 
      />

      {/* Users Table */}
      <Grid container spacing={2} sx={{ p: 2 }}>
    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
      <Grid item xs={12} sm={6} md={2} lg={2} key={user._id}>
        <Card>
        <CardMedia
  component="img"
  height="150"
  image={user.pic || 'defaultImagePlaceholder.jpg'}
  alt="User"
  sx={{
    width: '70%', // Use 100% if you want the image to be responsive and fill the container width
    height: 140, // Match the CardMedia height for consistency
    objectFit: 'cover', // Cover, contain, fill, none, scale-down
  }}
/>

          <CardContent>
          Username:  {user.username}<br />
            <Typography gutterBottom variant="h5" component="div">
            {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {/* User details */}
              
              Role: {user.role}<br />
              {/* Account Status */}
              Account Status: {user.blocked ? "Blocked" : "Active"}<br />
              Certification: <img src={user.certification} alt="C" style={{ width: "30px" }} /><br />
              Deleted: {user.isDeleted ? "Yes" : "No"}<br />
              Created At: {new Date(user.createdAt).toLocaleDateString("en-US")}
            </Typography>
          </CardContent>
          <CardActions>
          <Button
  size="small"
  onClick={() => user.blocked ? handleUnblockUser(user._id) : handleBlockUser(user._id)}
  color="error"
>
  {user.blocked ? "Unblock" : "Block"}
</Button>

            <Button size="small" onClick={() => handleDelete(user._id)} color="error">Delete</Button>
          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[ 10, 20, 50, 100, 200,1000]}
        component="div"
        count={filteredUsers.length} // Ensure you're counting the filtered users, not the total dataset if filtering is applied
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
