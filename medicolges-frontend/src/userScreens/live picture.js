import React, { useState } from 'react';
import Webcam from 'react-webcam';
import {
  Button,
  useToast,
  Box,
  Flex,
  Image,
  VStack,
  Heading,
  Container,
  Text,
  Spinner
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function FacialAuthLive() {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

    const handleLogin = async () => {
        if (!imgSrc) {
            toast({
                title: 'Error',
                description: 'No image captured.',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top'
            });
            return;
        }

        setLoading(true);
        const blob = await fetch(imgSrc).then(r => r.blob());
        const formData = new FormData();
        formData.append('image', blob, 'capture.jpg');

        try {
            const response = await fetch('http://localhost:5000/api/user/face', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data.match && data.login_result && data.login_result.token) {
                localStorage.setItem('userInfo', JSON.stringify(data.login_result));
                toast({
                    title: 'Authentication Successful',
                    description: 'You are now logged in.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'top'
                });
                navigate('/');
            } else {
                toast({
                    title: 'Authentication Failed',
                    description: 'No matching face found.',
                    status: 'warning',
                    duration: 5000,
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
                duration: 5000,
                isClosable: true,
                position: 'top'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container centerContent p={4}>
            <VStack spacing={8} w="full" maxW="lg" p={5} boxShadow="md" borderRadius="lg" bg="gray.50">
                <Heading size="lg" color="teal.400">Facial Authentication</Heading>
                <Text>If your face matches our records, you will be logged in automatically.</Text>
                <Box position="relative" boxShadow="xl" borderRadius="lg" overflow="hidden">
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        style={{ width: '100%', height: 'auto' }}
                        videoConstraints={{
                            width: 1280,
                            height: 720,
                            facingMode: "user"
                        }}
                    />
                    <Button position="absolute" bottom="3" right="3" colorScheme="purple" onClick={capture}>
                        Capture Photo
                    </Button>
                </Box>
                {imgSrc && (
                    <Image
                        src={imgSrc}
                        alt="Captured"
                        boxSize="100%"
                        objectFit="cover"
                        borderRadius="lg"
                    />
                )}
                <Button colorScheme="blue" w="full" onClick={handleLogin} isLoading={loading} loadingText="Authenticating">
                    Authenticate
                </Button>
            </VStack>
        </Container>
    );
}

export default FacialAuthLive;
