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
  Icon,
  ScaleFade,
  useColorModeValue
} from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';

const VerificationPage = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const formBackground = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("blue.500", "blue.200");

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
        navigate("/login");
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
    <ScaleFade in={true} initialScale={0.9}>
      <VStack spacing={4} align="center" justify="center" height="100vh" bg="gray.50" p={4}>
        <Box p={8} boxShadow="xl" bg={formBackground} borderRadius="xl" w="100%" maxW="md">
          <Text fontSize="3xl" mb={6} fontWeight="bold" textAlign="center"  >Email Verification </Text>
          <Text fontSize="1xl" mb={6}  textAlign="center"  >Check Email Spam </Text>
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
                  borderColor={borderColor}
                  focusBorderColor={borderColor}
                />
              </InputGroup>
            </FormControl>
            <FormControl  mt={4}>
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
                  borderColor={borderColor}
                  focusBorderColor={borderColor}
                />
              </InputGroup>
            </FormControl>
            <Button type="submit" colorScheme="teal" size="lg" mt={6} w="full" _hover={{ bg: "teal.600" }}>
              Verify Email
            </Button>
          </form>
        </Box>
      </VStack>
    </ScaleFade>
  );
};

export default VerificationPage;
