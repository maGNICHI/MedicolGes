import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { Form} from 'react-bootstrap';
import {
  Box, Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement,
  Avatar, AvatarBadge, IconButton, Flex, Grid, GridItem, Card, Text, useToast,
  VStack, HStack, chakra, Container, Heading, Icon
} from '@chakra-ui/react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Layout from "../../Dashboard/SuperAdminLayout/Layout";
import 'react-toastify/dist/ReactToastify.css';

const MotionBox = motion(Box);

const AdminProfileScreen = () => {
  const [loading, setLoading] = useState(false);
  const [adminDetails, setAdminDetails] = useState({
    _id: '', username: '', firstName:'', lastName:'', email: '', password: '', pic: '',profilePic: '',
  });
  
  const toast = useToast();
  const selectedName = "User Management";
  const [profilePicPreview, setProfilePicPreview] = useState(adminDetails.pic || '/avatar.jpg');

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setProfilePic(e.target.files[0]);
    }
  };
  const [profilePic, setProfilePic] = useState(null);
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('userInfo'));
    const adminId = admin?._id;
    if (!adminId) {
      toast({
        title: "Admin ID is missing.",
        description: "Please log in again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const fetchAdminDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/user/profile/${adminId}`);
        setAdminDetails({ ...response.data, password: '' }); // Assuming response contains admin data
      } catch (error) {
        toast({
          title: "Failed to fetch profile",
          description: error.toString(),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   const adminId = adminDetails._id;

  //   try {
  //     const { _id, ...updateData } = adminDetails;
  //     await axios.put(`http://localhost:5000/api/user/profile/${adminId}`, updateData, {
  //       headers: { 'Content-Type': 'application/json' },
  //     });
  //     toast({
  //       title: "Profile Updated",
  //       description: "Profile updated successfully.",
  //       status: "success",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   } catch (error) {
  //     toast({
  //       title: "Failed to Update Profile",
  //       description: error.response?.data?.message || error.message,
  //       status: "error",
  //       duration: 9000,
  //       isClosable: true,
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };


const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('username', adminDetails.username);
  formData.append('firstName', adminDetails.firstName);
  formData.append('lastName', adminDetails.lastName);
  formData.append('email', adminDetails.email);
  formData.append('role', adminDetails.role);
  formData.append('password', adminDetails.password);
  formData.append('pfp', profilePic); // Key should match backend

  try {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };
    const response = await axios.put(`http://localhost:5000/api/user/profile/${adminDetails._id}`, formData, config);
    toast({
      title: 'Profile updated successfully.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    setAdminDetails({ ...adminDetails, pic: response.data.pic }); // Update state
  } catch (error) {
    toast({
      title: 'Failed to update profile.',
      description: error.response?.data?.message || error.message,
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  }
};

  return (
    <Layout selectedName={selectedName}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        mt={5}
        mx="auto"
        maxW="4xl"
        p={5}
        shadow="md"
        borderWidth="1px"
      >
        <Flex>
          <Box flex="1" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Avatar size="2xl" name={adminDetails.username} src={adminDetails.pic || '/avatar.jpg'} />
            <Box p={6}>
              <Box display="flex" alignItems="baseline">
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                >
                 Welcome Super Admin! <br/>{adminDetails.username}
                </Box>
              </Box>
            </Box>
            
<div className="d-flex align-items-center">
 
 <Form.Control
   type="file"
   className="rounded-pill"
   onChange={(e) => {
     const file = e.target.files[0];
     if (file) {
       setProfilePic(file);
       const reader = new FileReader();
       reader.onloadend = () => {
         setProfilePicPreview(reader.result);
       };
       reader.readAsDataURL(file);
     }
   }}
 />
</div>
          </Box>
          
 
          <Box flex="3" ml={10}>
            <VStack spacing={4} align="stretch">
              
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FaUser color="gray.300" />
                  </InputLeftElement>
                  <Input type="text" name="username" placeholder="Username" value={adminDetails.username} onChange={handleInputChange} />
                </InputGroup>
              </FormControl>
              <FormControl id="firstName">
                <FormLabel>First Name</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FaUser color="gray.300" />
                  </InputLeftElement>
                  <Input type="text" name="firstName" placeholder="firstName" value={adminDetails.firstName} onChange={handleInputChange} />
                </InputGroup>
              </FormControl>
              <FormControl id="lastname">
                <FormLabel>Last Name</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FaUser color="gray.300" />
                  </InputLeftElement>
                  <Input type="text" name="lastName" placeholder="lastName" value={adminDetails.lastName} onChange={handleInputChange} />
                </InputGroup>
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email Address</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FaEnvelope color="gray.300" />
                  </InputLeftElement>
                  <Input type="email" name="email" placeholder="Email" value={adminDetails.email} onChange={handleInputChange} />
                </InputGroup>
              </FormControl>
              <FormControl id="password">
                <FormLabel>password</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FaUser color="gray.300" />
                  </InputLeftElement>
                  <Input type="password" name="password" placeholder="password" value={adminDetails.password} onChange={handleInputChange} />
                </InputGroup>
              </FormControl>
              
            </VStack>
            <Button mt={4} colorScheme="teal" isLoading={loading} onClick={handleSubmit}>
              Update Profile
            </Button>
          </Box>
        </Flex>
      </MotionBox>
    </Layout>
  );
};

export default AdminProfileScreen;
