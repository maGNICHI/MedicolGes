import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Card, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaUserTag } from 'react-icons/fa';
import './profile.css'; // Update with your styling

import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is included
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    oldPassword: '',
    role: '',
    
    profilePic: '', // Assuming you have a picture URL in your user details
  });
  const [profilePic, setProfilePic] = useState(null);
 

  // State to manage the preview of the profile picture
  const [profilePicPreview, setProfilePicPreview] = useState(userDetails.pic || '/avatar.jpg');

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setProfilePic(e.target.files[0]);
    }
  };
  
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
        setUserDetails({ ...response.data, password: '', cPassword: '', oldPassword: '' });
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
  
    const formData = new FormData();
    formData.append('username', userDetails.username);
    formData.append('firstName', userDetails.firstName);
    formData.append('lastName', userDetails.lastName);
    formData.append('email', userDetails.email);
    formData.append('role', userDetails.role);
    formData.append('password', userDetails.password);
    formData.append('pfp', profilePic); // Ensure this matches the backend expected key
  if (userDetails.password==userDetails.cPassword){
    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      const response = await axios.put(`http://localhost:5000/api/user/profile/${userDetails._id}`, formData, config);
      toast.success('Profile updated successfully.');
      // Update the state to reflect the new picture URL from the response if necessary
      setUserDetails({ ...userDetails, pic: response.data.pic });
    } catch (error) {
      toast.error('Failed to update profile: ' + (error.response?.data?.message || error.message));
    }}else {
      toast.error('Insert Password correctly')
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
          
 
              <div className="d-flex align-items-center justify-content-center" style={{ height: '1vh' }}> {/* Ensuring full height */}
  <div className="custom-file-upload">
    <label htmlFor="file-upload" className="upload-icon">
      <i className="fas fa-camera fa-2x"></i>
    </label>
    <input
      id="file-upload"
      type="file"
      className="rounded-pill d-none"
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          setProfilePic(file);
          const reader = new FileReader();
          reader.onloadend = () => {
            setProfilePicPreview(reader.result);
          };
          reader.readAsDataURL(file);
        }
      }}
    />
  </div>
</div>



            <Card.Body>
           


  <Card.Body>
  <Form.Group controlId="profilePic">
  <Form.Label>Update Profile Picture</Form.Label>
              </Form.Group>
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
  <Button variant="primary" type="submit" onClick={handleSubmit} className="mt-3">
Update Profile
</Button>
              {/* Implement functionality to change picture if necessary */}
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
            <Card.Text>Welcome !  <Card.Title>{userDetails.username}</Card.Title></Card.Text>
     

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
                <Form.Label>First Name</Form.Label>
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
                <Form.Label>Last  Name</Form.Label>
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

</Card>

</Col>
</Row>
</motion.div>
 
</>
);
};

export default ProfileScreen;
