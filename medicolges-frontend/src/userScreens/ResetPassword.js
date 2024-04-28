import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Box,
  Text
} from '@chakra-ui/react';

const ResetPassword = () => {
  const { token } = useParams();  // Extract the token from the URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Check if password meets minimum length requirement
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/user/reset-password/${token}`, {
        password  // Ensure this matches the backend expectation
      });
      if (response.status === 200) {
        toast.success('Password has been reset successfully.');
        navigate('/login');  // Redirect to the login page after successful reset
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to reset password. Please try again.');
    }
  };
  

  return (
    <Container centerContent>
      <VStack spacing={4} align="center" justify="center" minHeight="100vh">
        <Box p={8} boxShadow="2xl" borderRadius="lg" bg="white" width="100%" maxWidth="500px">
          <Text fontSize="2xl" mb={4} textAlign="center">Reset Your Password</Text>
          <form onSubmit={handleResetPassword} style={{ width: '100%' }}>
            <FormControl id="password" isRequired>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl id="confirm-password" isRequired mt={4}>
              <FormLabel>Confirm New Password</FormLabel>
              <Input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
            <Button colorScheme="blue" width="full" mt={4} type="submit">
              Reset Password
            </Button>
          </form>
        </Box>
      </VStack>
    </Container>
  );
};

export default ResetPassword;
