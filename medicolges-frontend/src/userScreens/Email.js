import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  InputGroup,
  InputLeftElement,
  Icon
} from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';

const VerificationPage = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleVerify = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/user/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, code })
      });
      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Verification Successful",
          description: data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/");
      } else {
        toast({
          title: "Verification Failed",
          description: data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Failed to verify. Please try again later.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={4} align="center" justify="center" height="100vh" bg="gray.50" p={4}>
      <Box p={6} boxShadow="2xl" bg="white" borderRadius="lg" w="100%" maxW="md">
        <Text fontSize="3xl" mb={4} fontWeight="bold" textAlign="center">Email Verification</Text>
        <form onSubmit={handleVerify}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={EmailIcon} color="gray.500" />}
              />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                borderColor="blue.500"
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Verification Code</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={LockIcon} color="gray.500" />}
              />
              <Input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter your verification code"
                borderColor="blue.500"
              />
            </InputGroup>
          </FormControl>
          <Button type="submit" colorScheme="blue" size="lg" mt={6} w="full">
            Verify Email
          </Button>
        </form>
      </Box>
    </VStack>
  );
};

export default VerificationPage;
