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
  Spinner,
  Fade,
  useColorModeValue,
  IconButton,
  AspectRatio,
  ScaleFade,
  Progress,
  Badge
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { CameraIcon } from '@heroicons/react/solid';

function FacialAuthLive() {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();
    const bgColor = useColorModeValue('white', 'gray.700');
    const textColor = useColorModeValue('gray.600', 'gray.200');
    const buttonColor = useColorModeValue('teal.500', 'teal.300');

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
        <ScaleFade in={true}>
            <Container centerContent p={4}>
                <VStack spacing={8} w="full" maxW="lg" p={5} boxShadow="2xl" borderRadius="lg" bg={bgColor}>
                    <Heading size="xl" color={buttonColor}>Facial Authentication</Heading>
                    <Text fontSize="md" color={textColor}>
                        If your face matches our records, you will be logged in automatically.
                    </Text>
                    <AspectRatio ratio={16 / 9} w="full">
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
                            <IconButton
                                aria-label="Capture photo"
                                icon={<CameraIcon />}
                                position="absolute"
                                bottom="3"
                                right="3"
                                colorScheme="purple"
                                onClick={capture}
                                size="lg"
                            />
                        </Box>
                    </AspectRatio>
                    {imgSrc && (
                        <Image
                            src={imgSrc}
                            alt="Captured"
                            boxSize="100%"
                            objectFit="cover"
                            borderRadius="lg"
                        />
                    )}
                    <Button colorScheme="purple" w="full" onClick={handleLogin} isLoading={loading} loadingText="Authenticating" size="lg">
                        Authenticate
                    </Button>
                    {loading && <Progress size="xs" isIndeterminate colorScheme="blue" w="full"/>}
                    {!loading && imgSrc && <Badge colorScheme="green" p={2} borderRadius="full" m={2}>Photo Captured</Badge>}
                </VStack>
            </Container>
        </ScaleFade>
    );
}

export default FacialAuthLive;
