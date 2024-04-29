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
  Text,
  useColorModeValue,
  ScaleFade
} from '@chakra-ui/react';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/user/reset-password/${token}`, { password });
      if (response.status === 200) {
        toast.success('Password has been reset successfully.');
        navigate('/login');
      }
    } catch (error) {
      toast.error('Failed to reset password. Please try again.');
    }
  };

  const inputFocusBorderColor = useColorModeValue('blue.500', 'blue.300');
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const boxShadowColor = "0 4px 6px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.08)";

  return (
    <ScaleFade in={true} initialScale={0.9}>
      <Container centerContent>
        <VStack spacing={4} align="center" justify="center" minHeight="100vh"  
                 bgPosition="center" bgRepeat="no-repeat" bgSize="cover">
          <Box p={8} boxShadow={boxShadowColor} borderRadius="lg" bg="whiteAlpha.900" width="100%" maxWidth="500px">
            <Text fontSize="3xl" mb={4} textAlign="center" color="teal.600">Reset Your Password</Text>
            <form onSubmit={handleResetPassword} style={{ width: '100%' }}>
              <FormControl id="password" isRequired>
                <FormLabel>New Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  focusBorderColor={inputFocusBorderColor}
                  _hover={{
                    borderColor: inputFocusBorderColor,
                  }}
                  size="lg"
                />
              </FormControl>
              <FormControl id="confirm-password" isRequired mt={4}>
                <FormLabel>Confirm New Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  focusBorderColor={inputFocusBorderColor}
                  _hover={{
                    borderColor: inputFocusBorderColor,
                  }}
                  size="lg"
                />
              </FormControl>
              <Button
                colorScheme="teal"
                width="full"
                mt={4}
                type="submit"
                size="lg"
                _hover={{
                    bgGradient: 'linear(to-r, teal.400, teal.500)',
                    boxShadow: 'lg'
                }}
              >
                Reset Password
              </Button>
            </form>
          </Box>
        </VStack>
      </Container>
    </ScaleFade>
  );
};

export default ResetPassword;
