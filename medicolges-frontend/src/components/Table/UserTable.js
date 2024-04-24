import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Flex,
  Grid,
  Image,
  Text,
  Input,
  Button,
  useToast,
  VStack,
  HStack,
  IconButton,
  Avatar,
  Tag,
  Select
} from '@chakra-ui/react';

import { FaBan, FaCheck, FaUserTimes, FaUserEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
const CheckTable = () => {
  const [usersData, setUsersData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10000000);
  const toast = useToast();

  // Function to fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/get-users');
      setUsersData(response.data.usersData);
      setFilteredUsers(response.data.usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Failed to fetch users",
        description: error.toString(),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleUpdateAdmin = async (_id) => {
    try {
        // Use the DELETE method and include the _id in the URL
        await axios.patch(`http://localhost:5000/api/user/updateUserRoleToAdmin/${_id}`);
        fetchUsers(); // Refetch users to update the UI after deletion
        
    } catch (error) {
        console.error('Error updating user:', error);
       
    }
  };
  
   
  useEffect(() => {
    fetchUsers();  // Fetch users on component mount
  }, []);

  useEffect(() => {
    const lowercasedFilter = searchQuery.toLowerCase();
    const filteredData = usersData.filter(item =>
      Object.keys(item).some(key =>
        item[key].toString().toLowerCase().includes(lowercasedFilter)
      )
    );
    setFilteredUsers(filteredData);
  }, [searchQuery, usersData]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(parseInt(value, 10));
    setPage(0);
  };
 
  const handleUnblockUser = async (_id) => {
    try {
      await axios.patch('http://localhost:5000/api/user/unblock-user', { _id });
      fetchUsers(); // Refetch users to update the UI after unblocking
      toast.success('The user is unblocked :)'); // Display success toast
    } catch (error) {
      console.error('Error unblocking user:', error);
     
    }
  };
  const handleBlockUser = async (_id) => {
    try {
      await axios.patch('http://localhost:5000/api/user/block-user', { _id });
      fetchUsers(); // Refetch users to update the UI after blocking
      toast.warning('The user is blocked :('); // Display success toast
    } catch (error) {
      console.error('Error blocking user:', error);
     
    }
  };
  
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/delete-user/${_id}`);
      fetchUsers();  // Refetch users to update the UI after deletion
      toast({
        title: 'User Deleted',
        description: 'The user has been successfully deleted.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Deletion Failed',
        description: 'Failed to delete user.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="gray.50" p={5}>
      <Input
        placeholder="Search by name, email, or role"
        mb={4}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
          <VStack key={user._id} bg="white" p={4} boxShadow="md" borderRadius="md">
              <Text fontSize="sm">{user.username}</Text>
            <Avatar size="xl" name={user.firstName + ' ' + user.lastName} src={user.pic} />

            <Text fontSize="xl" fontWeight="bold">{user.firstName} {user.lastName}</Text>
            <Text fontSize="sm">Email : {user.email}</Text>
            <Text fontSize="sm">Role: {user.role}</Text>
            <Text fontSize="sm">Created At: :{new Date(user.createdAt).toLocaleDateString("en-UK")}</Text>
             
           
            <Tag colorScheme={user.blocked ? 'red' : 'green'}>{user.blocked ? 'Blocked' : 'Active'}</Tag>
            <HStack>
              <IconButton
                aria-label={user.blocked ? "Unblock user" : "Block user"}
                icon={user.blocked ? <FaCheck /> : <FaBan />}
                onClick={() => user.blocked ? handleUnblockUser(user._id) : handleBlockUser(user._id)}
              />
              <IconButton aria-label="Delete user" icon={<FaUserTimes />} onClick={() => handleDelete(user._id)} />
              <IconButton aria-label="Promote to admin" icon={<FaUserEdit />} onClick={() => handleUpdateAdmin(user._id)} />
              
            </HStack>
             {/* <Text fontSize="sm">Certification : <img src={user.certification}/></Text> */}
          </VStack>
        ))}
      </Grid>
       
    </Box>
  );
};

export default CheckTable;
