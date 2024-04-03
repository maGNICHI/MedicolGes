import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Card, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaUserTag } from 'react-icons/fa';
import './profile.css'; // Make sure this path is correct
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const AdminProfileScreen = () => {
  const [loading, setLoading] = useState(false);
  const [adminDetails, setAdminDetails] = useState({
    _id: '',

    username: '',
    firstName:'',
    lastName:'',
    email: '',
    password: '',
     
  });

  useEffect(() => {
    // Assuming you have a similar setup for admin authentication
    const admin = JSON.parse(localStorage.getItem('userInfo'));
    const adminId = admin?._id;
    if (!adminId) {
      toast.error("Admin ID is missing. Please log in again.");
      return;
    }

    const fetchAdminDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/user/profile/${adminId}`);
        setAdminDetails({ ...response.data, password: '' }); // Assuming response contains admin data
      } catch (error) {
        toast.error("Failed to fetch profile: " + error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const adminId = adminDetails._id;

    try {
      const { _id, ...updateData } = adminDetails;
      await axios.put(`http://localhost:5000/api/user/profile/${adminId}`, updateData, {
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
    <motion.div
      className="update-profile-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={adminDetails.pic || '/avatar.jpg'} />
            <Card.Body>
            <Card.Text>Welcome !</Card.Text>
              <Card.Title>{adminDetails.username}</Card.Title>
              
              {/* Implement functionality to change picture if necessary */}
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Personal Information</Card.Title>
              <Form.Group controlId="username">
                <Form.Label>user name</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaUser /></InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="username"
                    value={adminDetails.username}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="firstName">
                <Form.Label>first Name</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaUser /></InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="firstName"
                    value={adminDetails.firstName}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="lastName">
                <Form.Label>last Name</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaUser /></InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="lastName"
                    value={adminDetails.lastName}
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
                    value={adminDetails.email}
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
value={adminDetails.password}
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
value={adminDetails.cPassword}
onChange={handleInputChange}
/>
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
);
};
export default AdminProfileScreen;
