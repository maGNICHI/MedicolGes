import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import axios from 'axios';
function AddNewUserModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [gender, setGender] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const toast = useToast();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = { gender, username, firstName, lastName, email, password, role };
      const response = await axios.post('http://localhost:5000/api/user/addUser', user);
      handleClose(); // Close the modal on success
      toast({
        title: 'User added successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('There was an error adding the user:', error.response?.data || error.message);
      toast({
        title: 'Error adding user',
        description: 'Missing fields or existing user',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={handleOpen}>
        Add New Admin
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Admin</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormControl isRequired mt={4}>
                <FormLabel>Gender</FormLabel>
                <Select placeholder="Select gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                </Select>
              </FormControl>
              <FormControl isRequired mt={4}>
                <FormLabel>Username</FormLabel>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
              </FormControl>
              <FormControl isRequired mt={4}>
                <FormLabel>First Name</FormLabel>
                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </FormControl>
              <FormControl isRequired mt={4}>
                <FormLabel>Last Name</FormLabel>
                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </FormControl>
              <FormControl isRequired mt={4}>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl isRequired mt={4}>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <FormControl isRequired mt={4}>
                <FormLabel>Role</FormLabel>
                <Select placeholder="Select role" value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="admin">Admin</option>
                </Select>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Submit
              </Button>
              <Button onClick={handleClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddNewUserModal;
