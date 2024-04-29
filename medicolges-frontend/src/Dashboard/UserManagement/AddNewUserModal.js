// import React, { useState } from 'react';
// import {
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalCloseButton,
//   ModalBody,
//   ModalFooter,
//   FormControl,
//   FormLabel,
//   Input,
//   Select,
//   useToast,
//   useColorModeValue
// } from '@chakra-ui/react';
// import { AddIcon } from '@chakra-ui/icons';
// import axios from 'axios';

// function AddNewUserModal() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [gender, setGender] = useState('');
//   const [username, setUsername] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');
//   const toast = useToast();

//   const formBackgroundColor = useColorModeValue('gray.100', 'gray.700');
//   const modalBgColor = useColorModeValue('white', 'gray.800');

//   const handleOpen = () => setIsOpen(true);
//   const handleClose = () => setIsOpen(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const user = { gender, username, firstName, lastName, email, password, role };
//       const response = await axios.post('http://localhost:5000/api/user/addUser', user);
//       handleClose();
//       toast({
//         title: 'User added successfully!',
//         status: 'success',
//         duration: 5000,
//         isClosable: true,
//       });
//     } catch (error) {
//       console.error('There was an error adding the user:', error.response?.data || error.message);
//       toast({
//         title: 'Error adding user',
//         description: 'Missing fields or existing user',
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   };

//   return (
//     <>
//       <Button
//         leftIcon={<AddIcon />}
//         colorScheme="teal"
//         size="md"
//         height="48px"
//         width="200px"
//         onClick={handleOpen}
//         shadow="md"
//         _hover={{ bg: 'teal.600' }}
//       >
//         Add New Admin
//       </Button>
//       <Modal isOpen={isOpen} onClose={handleClose} size="lg" motionPreset="scale">
//         <ModalOverlay />
//         <ModalContent bg={modalBgColor} shadow="xl" borderRadius="lg">
//           <ModalHeader fontSize="2xl" fontWeight="bold">Add New Admin</ModalHeader>
//           <ModalCloseButton />
//           <form onSubmit={handleSubmit}>
//             <ModalBody pb={6}>
//               <FormControl id="gender" isRequired mt={4}>
//                 <FormLabel fontWeight="bold">Gender</FormLabel>
//                 <Select
//                   placeholder="Select gender"
//                   value={gender}
//                   onChange={(e) => setGender(e.target.value)}
//                   bg={formBackgroundColor}
//                 >
//                   <option value="Mr">Mr</option>
//                   <option value="Mrs">Mrs</option>
//                 </Select>
//               </FormControl>
//               <FormControl id="username" isRequired mt={4}>
//                 <FormLabel fontWeight="bold">Username</FormLabel>
//                 <Input
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   bg={formBackgroundColor}
//                 />
//               </FormControl>
//               <FormControl id="firstName" isRequired mt={4}>
//                 <FormLabel fontWeight="bold">First Name</FormLabel>
//                 <Input
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   bg={formBackgroundColor}
//                 />
//               </FormControl>
//               <FormControl id="lastName" isRequired mt={4}>
//                 <FormLabel fontWeight="bold">Last Name</FormLabel>
//                 <Input
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   bg={formBackgroundColor}
//                 />
//               </FormControl>
//               <FormControl id="email" isRequired mt={4}>
//                 <FormLabel fontWeight="bold">Email</FormLabel>
//                 <Input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   bg={formBackgroundColor}
//                 />
//               </FormControl>
//               <FormControl id="password" isRequired mt={4}>
//                 <FormLabel fontWeight="bold">Password</FormLabel>
//                 <Input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   bg={formBackgroundColor}
//                 />
//               </FormControl>
//               <FormControl id="role" isRequired mt={4}>
//                 <FormLabel fontWeight="bold">Role</FormLabel>
//                 <Select
//                   placeholder="Select role"
//                   value={role}
//                   onChange={(e) => setRole(e.target.value)}
//                   bg={formBackgroundColor}
//                 >
//                   <option value="admin">Admin</option>
//                 </Select>
//               </FormControl>
//             </ModalBody>
//             <ModalFooter>
//               <Button
//                 colorScheme="teal"
//                 mr={3}
//                 type="submit"
//                 width="full"
//                 fontWeight="bold"
//                 _hover={{ bg: 'teal.600' }}
//               >
//                 Submit
//               </Button>
//               <Button onClick={handleClose} fontWeight="bold" variant="outline">
//                 Cancel
//               </Button>
//             </ModalFooter>
//           </form>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }

// export default AddNewUserModal;
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
  InputGroup,
  InputLeftElement,
  Select,
  Badge,
  Tooltip,
  useToast,
  useColorModeValue,
  useDisclosure,
  Fade
} from '@chakra-ui/react';
import { AddIcon, EmailIcon, LockIcon, InfoIcon, AtSignIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import axios from 'axios';

function AddNewUserModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [gender, setGender] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const toast = useToast();

  const formBackgroundColor = useColorModeValue('gray.100', 'gray.700');
  const modalBgColor = useColorModeValue('white', 'gray.800');
  const inputTextColor = useColorModeValue('teal.800', 'teal.100');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = { gender, username, firstName, lastName, email, password, role };
      const response = await axios.post('http://localhost:5000/api/user/addUser', user);
      onClose();
      toast({
        title: 'User added successfully!',
        description: `The user ${username} has been added.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('There was an error adding the user:', error.response?.data || error.message);
      toast({
        title: 'Error adding user',
        description: 'Please check the fields and try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        colorScheme="teal"
        size="md"
        height="48px"
        width="200px"
        onClick={onOpen}
        shadow="lg"
        _hover={{ bgGradient: 'linear(to-r, teal.500, green.500)' }}
      >
        Add New Admin
      </Button>
      <Fade in={isOpen}>
        <Modal isOpen={isOpen} onClose={onClose} size="lg" motionPreset="scale" isCentered>
          <ModalOverlay />
          <ModalContent bgGradient="linear(to-b, gray.300, gray.600)" shadow="2xl" borderRadius="md">
            <ModalHeader fontSize="2xl" fontWeight="bold">Add New Admin</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit}>
              <ModalBody pb={6}>
                <FormControl id="gender" isRequired mt={4}>
                  <FormLabel fontWeight="bold">Gender</FormLabel>
                  <Select
                    placeholder="Select gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    bg={formBackgroundColor}
                    icon={<InfoIcon />}
                  >
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                  </Select>
                </FormControl>
                <Tooltip label="Username must be unique" fontSize="md" hasArrow placement="right">
                  <FormControl id="username" isRequired mt={4}>
                    <FormLabel fontWeight="bold">Username</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" children={<AtSignIcon color="gray.500" />} />
                      <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        bg={formBackgroundColor}
                        color={inputTextColor}
                      />
                    </InputGroup>
                  </FormControl>
                </Tooltip>
                <FormControl id="firstName" isRequired mt={4}>
                  <FormLabel fontWeight="bold">First Name</FormLabel>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    bg={formBackgroundColor}
                    color={inputTextColor}
                  />
                </FormControl>
                <FormControl id="lastName" isRequired mt={4}>
                  <FormLabel fontWeight="bold">Last Name</FormLabel>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    bg={formBackgroundColor}
                    color={inputTextColor}
                  />
                </FormControl>
                <Tooltip label="Enter a valid email address" fontSize="md" hasArrow placement="right">
                  <FormControl id="email" isRequired mt={4}>
                    <FormLabel fontWeight="bold">Email</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" children={<EmailIcon color="gray.500" />} />
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        bg={formBackgroundColor}
                        color={inputTextColor}
                      />
                    </InputGroup>
                  </FormControl>
                </Tooltip>
                <FormControl id="password" isRequired mt={4}>
                  <FormLabel fontWeight="bold">Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" children={<LockIcon color="gray.500" />} />
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      bg={formBackgroundColor}
                      color={inputTextColor}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl id="role" isRequired mt={4}>
                  <FormLabel fontWeight="bold">Role</FormLabel>
                  <Select
                    placeholder="Select role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    bg={formBackgroundColor}
                    icon={<InfoIcon />}
                  >
                    <option value="admin">Admin</option>
                  </Select>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="teal"
                  mr={3}
                  type="submit"
                  width="full"
                  fontWeight="bold"
                  _hover={{ bgGradient: 'linear(to-r, teal.600, green.600)' }}
                >
                  Submit
                </Button>
                <Button onClick={onClose} fontWeight="bold" variant="outline">
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Fade>
    </>
  );
}

export default AddNewUserModal;
