import React, { useState } from 'react';
import axios from 'axios';
import {   Icon } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
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
  Box,
  useColorModeValue,
  Link,
  Image,
  ScaleFade
} from '@chakra-ui/react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const toast = useToast();
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const inputFocusBorderColor = useColorModeValue('blue.500', 'blue.300');
    const boxShadowColor = "0 4px 6px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.08)";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
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
        setIsSubmitting(false);
    };

    return (
        <ScaleFade in={true} initialScale={0.9}>
            <Flex height="100vh" alignItems="center" justifyContent="center" bg={bgColor}  
                 bgPosition="center" bgRepeat="no-repeat" bgSize="cover">
                <Container maxW="lg" bg="whiteAlpha.900" p={8} borderRadius="lg" boxShadow={boxShadowColor}>
                    <VStack spacing={5}>
                        <Text fontSize="3xl" fontWeight="bold" textAlign="center" color="teal.600">Reset Your Password</Text>
                        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <FormControl isRequired>
                                <FormLabel htmlFor="email">Email Address</FormLabel>
                                <Input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    focusBorderColor={inputFocusBorderColor}
                                    _hover={{
                                        borderColor: inputFocusBorderColor,
                                    }}
                                    size="lg"
                                />
                            </FormControl>
                            <Button
                                isLoading={isSubmitting}
                                loadingText="Sending..."
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
                                Send Reset Link
                            </Button>
                        </form>
                        <Link
      href="/login"
      color="teal.500"
      fontSize="lg" // Larger font size for better visibility
      fontWeight="bold" // Bold font weight for emphasis
      display="flex" // Ensures the icon and text align properly
      alignItems="center" // Aligns items vertically
      _hover={{ color: "teal.600", textDecoration: "underline" }} // Enhanced hover effect
      mb={4} // Margin bottom for spacing
    >
      <Icon as={ArrowBackIcon} mr={2} /> {/* Icon for visual appeal */}
                 Back to login
    </Link>
                    </VStack>
                </Container>
            </Flex>
        </ScaleFade>
    );
};

export default ForgotPassword;
