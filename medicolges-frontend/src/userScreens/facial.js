import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Spinner,
  Center,
  Text,
  Heading,
  Container
} from '@chakra-ui/react';

function FacialAuth() {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!image) {
            toast({
                title: 'Error',
                description: 'Please select an image to authenticate.',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top'
            });
            return;
        }
    
        setLoading(true);
        const formData = new FormData();
        formData.append('image', image);
    
        try {
            const response = await fetch('http://localhost:5000/api/user/face', {
                method: 'POST',
                body: formData,
            });
    
            const data = await response.json();
            if (data.match && data.login_result && data.login_result.token) {
                localStorage.setItem('userInfo', JSON.stringify(data.login_result));
                navigate('/');
                toast({
                    title: 'Authentication Successful',
                    description: 'You have been logged in.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top'
                });
            } else {
                toast({
                    title: 'Authentication Failed',
                    description: 'No matching face found.',
                    status: 'warning',
                    duration: 3000,
                    isClosable: true,
                    position: 'top'
                });
            }
        } catch (error) {
            console.error('Error:', error);
            toast({
                title: 'Error',
                description: 'Failed to authenticate.',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleNavigation = () => {
        navigate('/login');
    };

    return (
        <Container centerContent p={4}>
            <VStack spacing={8} w="full" maxW="lg" p={5} boxShadow="md" borderRadius="lg" bg="gray.50">
                <Heading size="lg" color="teal.400">Facial Authentication</Heading>
                <Text>If your face matches our records, you will be logged in automatically.</Text>
                <FormControl isRequired>
                    <FormLabel>Upload your photo for authentication</FormLabel>
                    <Input type="file" accept="image/*" onChange={handleImageChange} p={1} />
                </FormControl>
                <Button colorScheme="blue" isLoading={loading} loadingText="Authenticating" onClick={handleSubmit}>
                    {loading ? <Spinner /> : 'Authenticate'}
                </Button>
                <Button variant="link" colorScheme="teal" onClick={handleNavigation}>
                    Go back to Login
                </Button>
                {loading && <Text>Processing...</Text>}
            </VStack>
        </Container>
    );
}

export default FacialAuth;
