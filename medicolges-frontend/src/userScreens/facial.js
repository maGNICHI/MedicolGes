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
  Container,
  Fade,
  ScaleFade,
  Progress,
  useColorModeValue,
  Image
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

function FacialAuth() {
    const [image, setImage] = useState(null);
    const [previewSrc, setPreviewSrc] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();
    const bgColor = useColorModeValue('white', 'gray.700');
    const buttonColor = useColorModeValue('blue.500', 'blue.300');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewSrc(reader.result);
        };
        reader.readAsDataURL(file);
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
                // Store user info including user_id in localStorage
                const userInfo = {
                    token: data.login_result.token,
                    user_id: data.user_id, // Ensure this matches the key from your backend
                    ...data.login_result
                };
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                navigate('/qr');
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
        <ScaleFade in={true}>
            <Container centerContent p={4}>
                <VStack spacing={8} w="full" maxW="lg" p={5} boxShadow="2xl" borderRadius="lg" bg={bgColor}>
                    <Heading size="lg" color="teal.400">Facial Authentication</Heading>
                    <Text>If your face matches our records, you will be logged in automatically.</Text>
                    <FormControl isRequired>
                        <FormLabel>Upload your photo for authentication</FormLabel>
                        <Input type="file" accept="image/*" onChange={handleImageChange} p={1} />
                        {previewSrc && (
                            <Box mt={4} boxShadow="sm" borderRadius="md">
                                <Image src={previewSrc} alt="Preview" borderRadius="md" />
                            </Box>
                        )}
                    </FormControl>
                    <Button colorScheme="blue" isLoading={loading} loadingText="Authenticating" onClick={handleSubmit} leftIcon={<ArrowBackIcon />}>
                        Authenticate
                    </Button>
                    <Button variant="link" colorScheme="teal" onClick={handleNavigation}>
                        Go back to Login
                    </Button>
                    {loading && (
                        <Progress size="xs" isIndeterminate colorScheme="blue" w="full"/>
                    )}
                </VStack>
            </Container>
        </ScaleFade>
    );
}

export default FacialAuth;
