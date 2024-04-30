import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, FormControl, FormLabel, Input, Image,
  Alert, AlertIcon, VStack, Heading, Text,
  useColorModeValue, Center, Fade
} from '@chakra-ui/react';

const TwoFactorAuthSetup = () => {
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const bg = useColorModeValue('white', 'gray.800');
  const boxShadow = useColorModeValue('0 4px 6px rgba(0, 0, 0, 0.1)', '0 4px 6px rgba(0, 0, 0, 0.9)');

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;

    if (parsedUserInfo && parsedUserInfo.userId) {
      setUserId(parsedUserInfo.userId);
      if (parsedUserInfo.twoFactorEnabled) {
        navigate('/');
      }
    }
  }, [navigate]);

  useEffect(() => {
    const enable2FA = async () => {
      if (userId && !qrCode) {
        try {
          const response = await axios.post('http://localhost:5000/api/user/enable-2FA', { userId });
          setQrCode(response.data.qrcode);
        } catch (err) {
          setError(err.response?.data?.message || 'Could not enable 2FA.');
        }
      }
    };

    enable2FA();
  }, [userId, qrCode]);

  const verifyToken = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/verify-2fa', {
        userId,
        token
      });
      if (response.data.success) {
        const newUserInfo = {
          ...JSON.parse(localStorage.getItem('userInfo')),
          ...response.data.user,
          twoFactorEnabled: true
        };

        localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
        navigate('/');
      } else {
        setError('Failed to verify 2FA token.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error verifying 2FA token.');
    }
  };

  return (
    <Center minH="100vh" p={4}>
      <Fade in={true} transition={{ enter: { duration: 0.5 } }}>
        <VStack
          spacing={5}
          align="center"
          p={8}
          backgroundColor={bg}
          boxShadow={boxShadow}
          borderRadius="lg"
          backdropFilter="blur(10px)"
        >
          <Heading as="h3" size="lg">Set Up Two-Factor Authentication</Heading>
          
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
          {qrCode ? (
            <>
              <Text fontSize="md">Scan this QR code with your 2FA Google authentication App to enable two-factor authentication for your account.</Text>
              <Image src="/google.webp" alt="Google Authenticator" boxSize="70px" mb={1} /> <Image src={qrCode} alt="2FA QR Code" boxSize="200px" objectFit="cover" borderRadius="full" />
              <FormControl id="token" isRequired>
                <FormLabel>Enter your 2FA token from the Google App</FormLabel>
                <Input
                  placeholder="Enter token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)
                }/>
              </FormControl>
              <Button colorScheme="blue" onClick={verifyToken} mt={4}>
                Verify Token
              </Button>
            </>
          ) : (
            <Text>Loading QR code...</Text>
          )}
        </VStack>
      </Fade>
    </Center>
  );
};

export default TwoFactorAuthSetup;
