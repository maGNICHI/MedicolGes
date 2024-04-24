import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Card, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaUserTag } from 'react-icons/fa';
import './profile.css'; // Update with your styling
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
 import Navbar from '../../UserInterface/Components/Navbar'
const ProfileScreen = () => {
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    _id: '',
    username: '',
    firstName:'',
    lastName:'',
    email: '',
    password: '',
    cPassword: '',
    role: '',
    picture: '', // Assuming you have a picture URL in your user details
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const userId = user?._id;
    if (!userId) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }

    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/user/profile/${userId}`);
        setUserDetails({ ...response.data, password: '' }); // Assuming response contains user data
      } catch (error) {
        toast.error("Failed to fetch profile: " + error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userDetails.password !== userDetails.cPassword) {
      toast.error("Please insert password correctly");
      return; // Stop the form submission
    }

    setLoading(true);
    const userId = userDetails._id;

    try {
      const { _id, cPassword, ...updateData } = userDetails;
      await axios.put(`http://localhost:5000/api/user/profile/${userId}`, updateData, {
        headers: { 'Content-Type': 'application/json' },
      });

      toast.success('Profile updated successfully.');
    } catch (error) {
      toast.error('Failed to update profile: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar></Navbar>
    <motion.div
      // className="update-profile-container"
      initial={{ opacity:2, y: -50 }}
      animate={{ opacity: 10, y: 0 }}
      transition={{ duration: 1 }}
      style={{ maxWidth: "80%", margin: "0 auto", padding: "100px" }}
    >

      
      <Row>
        <Col md={3}>
          <Card>
            <Card.Img variant="top" src={userDetails.pic || '/avatar.jpg'} />
            <Card.Body>
            <Card.Text>Welcome !</Card.Text>

              <Card.Title>{userDetails.username}</Card.Title>
              
              {/* Implement functionality to change picture if necessary */}
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Personal Information</Card.Title>
              <Form.Group controlId="username">
                <Form.Label>Name</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaUser /></InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="username"
                    value={userDetails.username}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userDetails.email}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="firstName">
                <Form.Label>first Name</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="Email"
                    value={userDetails.firstName}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="lastName">
                <Form.Label>last  Name</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="lastName"
                    value={userDetails.lastName}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </Form.Group>
            </Card.Body>
          </Card>



          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Change Password</Card.Title>
               

              <Form.Group controlId="password">
<Form.Label>Password</Form.Label>
<InputGroup>
<InputGroup.Text><FaLock /></InputGroup.Text>
<Form.Control
type="password"
name="password"
placeholder="New Password"
value={userDetails.password}
onChange={handleInputChange}
/>
</InputGroup>
</Form.Group>
 
<Form.Group controlId="cPassword">
<Form.Label>Confirm Password</Form.Label>
<InputGroup>
<InputGroup.Text><FaLock /></InputGroup.Text>
<Form.Control
type="password"
name="cPassword"
placeholder="Confirm New Password"
value={userDetails.cPassword}
onChange={handleInputChange}
/>
</InputGroup>
</Form.Group>
</Card.Body>
</Card>

<Card>
<Card.Body>
<Card.Title>Role</Card.Title>
<Form.Group controlId="role">
<InputGroup>
<InputGroup.Text><FaUserTag /></InputGroup.Text>
<Form.Control
as="select"
name="role"
value={userDetails.role}
onChange={handleInputChange}
>
<option value="">Select Role</option>
<option value="Patient">Patient</option>
<option value="participative_member">Participative Member</option>
<option value="Coordinator_Member">Coordinator Member</option>

</Form.Control>
</InputGroup>
</Form.Group>
</Card.Body>
</Card>
<Button variant="primary" type="submit" onClick={handleSubmit} className="mt-3">
Update Profile
</Button>
</Col>
</Row>
</motion.div>
 
</>
);
};

export default ProfileScreen;