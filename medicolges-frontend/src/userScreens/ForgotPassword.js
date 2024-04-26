import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  VStack,
  useToast,
  Flex,
  Box
} from '@chakra-ui/react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/user/forgot-password', { email });
            toast({
                title: "Email Sent",
                description: "If an account with that email exists, we have sent a link to reset your password.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Error sending password reset email. Please try again later.",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Container>
                <VStack spacing={4} width="100%" maxW="md" p={5} boxShadow="xl" borderRadius="lg" bg="white">
                    <Text fontSize="2xl" fontWeight="bold">Reset Your Password</Text>
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <FormControl isRequired>
                            <FormLabel htmlFor="email">Email Address</FormLabel>
                            <Input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </FormControl>
                        <Button colorScheme="blue" width="full" mt={4} type="submit">
                            Send Reset Link
                        </Button>
                    </form>
                </VStack>
            </Container>
        </Flex>
    );
};

export default ForgotPassword;
