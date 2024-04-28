  import React, { useState } from "react";
  import { Link, NavLink, useNavigate } from "react-router-dom";
  import { Form, Button, Row, Col, Container, InputGroup } from "react-bootstrap";
  import Title from "../components/Title/Title";
  import { useSignup } from "./useSignup";
  import { toast } from "react-toastify";
  import axios from 'axios';

import VerificationModal from './Email';

  const SignupScreen = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [gender, setGender] = useState("Mr");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    
    const [showCertification, setShowCertification] = useState(false);
    const [certification, setCertification] = useState("");
    //const [certificate, setCertificate] = useState(null);
    const [avatar, setAvatar] = useState(null);
  
    const handleGenderChange = (e) => {
      setGender(e.target.value);
      
      if (avatar === null) {
        setSelectedAvatar(
          e.target.value === "Mr"
            ? process.env.PUBLIC_URL + "/images/avatar/maleuseravatar.jpg"
            : process.env.PUBLIC_URL + "/images/avatar/useravatar.jpg"
        );
      }
    };
    const Role = {
      
      "Patient": 'Patient',
      "Participative_Member": 'participative_member',
      "Coordinator_Member": 'Coordinator_Member',
      "Professionnal (account must be veryfied after signup)": 'Professionnal',
      "initiator (account must be veryfied after signup)" :"initiator"
    };
    
    const { signup, error, isLoading } = useSignup();

    
    const handleAvatarChange = (e) => {
      const file = e.target.files[0]; // Get the selected file
      const reader = new FileReader(); // Create a new FileReader object
    
      // Define what should happen when the FileReader finishes loading the file
      reader.onloadend = () => {
        setSelectedAvatar(reader.result); // Update the state with the selected avatar image
        setAvatar(file); // Set the selected avatar file in the state
      };
    
      // If a file is selected, start reading it as a data URL
      if (file) {
        reader.readAsDataURL(file);
      }
    };
  
    
    const [selectedAvatar, setSelectedAvatar] = useState(
      process.env.PUBLIC_URL + "/images/avatar/maleuseravatar.jpg"
    );
    
     

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      // First, check if all fields are filled including the avatar
      if (!avatar || !gender || !username || !firstName || !lastName || !email || !password || !role) {
        toast.error("Please fill in all the fields and select an avatar picture.");
        return;
      }
    
      // Next, check if the password is at least 6 characters long
      if (password.length < 6) {
        toast.error('Password must be at least 6 characters long.');
        return;
      }
    
      // Then, check if the passwords match
      if (password !== confirmPassword) {
        toast.error('Passwords do not match.');
        return;
      }
    
      try {
        const formData = new FormData();
        formData.append("pfp", avatar);
    
        const user = {
          gender,
          username,
          firstName,
          lastName,
          email,
          password,
          role,
        };
    
        // Convert user object to form data
        Object.keys(user).forEach((key) => {
          formData.append(key, user[key]);
        });
    
        if (certification) {
          formData.append("certification", certification);
        }
    
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
    
        const response = await axios.post("http://localhost:5000/api/user", formData, config);
        console.log("User registered successfully:", response.data);
        navigate("/verify-email");
      } catch (error) {
        toast.error(error.response.data.message || "Error registering user");
      }
    };
    
    
    
    // const handleCertificateChange = (e) => {
    //   setCertificate(e.target.files[0]); // Set the selected file
    // };
    const handleCertificateChange = (e) => {
      const file = e.target.files[0];
      setCertification(file);
    };
    return (
      <>
      <Container
      className="signup-screen d-flex align-items-center justify-content-center">
      
        <Row className="justify-content-center w-100">
          <Col lg={10} xl={8} className="signup-container shadow">
            <Row  >
              <Col  md={6} className="signup-form-col">
              {/* <Title
                    title={"Welcome To CoMediC Application Web"}
                    fontSize={"40px"}
                    fontWeight={900}
                    color={"#1990aa"}
                  /> */}
              </Col>
            </Row>
            <Row>
              <Col
                xs={12}
                md={6}
                className="d-flex align-items-center justify-content-center"
              >
                <Form className="signup-form"  onSubmit={handleSubmit}>
                {/* Form fields */}
                <div className="text-center mb-2">
                    <Title
                      secondTitle={"If You Want To Upload A Profile Picture"}
                      fontSize={"16px"}
                      fontWeight={600}
                    />
                  </div>
                  <div className="d-flex justify-content-center mb-4">
                    <div
                      className="rounded-circle overflow-hidden"
                      style={{
                        width: "100px",
                        height: "100px",
                        border: "1px solid #ced4da",
                        cursor: "pointer",
                        position: "relative",
                      }}
                    >
                      <img
                        src={selectedAvatar}
                        alt="Profile"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <input
                        type="file"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          opacity: 0,
                          cursor: "pointer",
                        }}
                        onChange={handleAvatarChange}
                        name="pfp" // Name attribute for profile picture
                      />
                    </div>
                  </div>
                
                  
                    {/* <Form.Group className="mb-3" controlId="gender">
      <Title secondTitle={"gender"} fontSize={"16px"} fontWeight={600} />
      <Form.Control
        type="text"
        placeholder="Enter first gender"
        className="rounded-pill"
        value={gender} // Ensure you have a corresponding useState for this
        onChange={(e) => setGender(e.target.value)} // And an update function
      />
    </Form.Group> */}
    <Col md={3} xs={12}>
                      <div className="mb-2">
                        <Title
                          secondTitle={"Gender"}
                          fontSize={"16px"}
                          fontWeight={600}
                        />
                        <Form.Select controlId="gender"
                          className="rounded-pill"
                          value={gender}
                          onChange={handleGenderChange}
                          
                          name="gender" // Add name attribute to identify the field
                        >
                          <option value="Mr">Mr</option>
                          <option value="Mrs">Mrs</option>
                        </Form.Select>
                      </div>
                    </Col>

                    <Form.Group className="mb-3" controlId="username">
      <Title secondTitle={"username"} fontSize={"16px"} fontWeight={600} />
      <Form.Control
        type="text"
        placeholder="Enter first name"
        className="rounded-pill"
        value={username} // Ensure you have a corresponding useState for this
        onChange={(e) => setUsername(e.target.value)} // And an update function
      />
    </Form.Group>




                  {/* <Form.Group className="mb-3" controlId="name">
      <Title secondTitle={"Name"} fontSize={"16px"} fontWeight={600} />
      <Form.Control
        type="text"
        placeholder="Enter name here..."
        className="rounded-pill"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Form.Group> */}

    {/* First Name */}
    <Form.Group className="mb-3" controlId="firstName">
      <Title secondTitle={"First Name"} fontSize={"16px"} fontWeight={600} />
      <Form.Control
        type="text"
        placeholder="Enter first name"
        className="rounded-pill"
        value={firstName} // Ensure you have a corresponding useState for this
        onChange={(e) => setFirstName(e.target.value)} // And an update function
      />
    </Form.Group>

    {/* Last Name */}
    <Form.Group className="mb-3" controlId="lastName">
      <Title secondTitle={"Last Name"} fontSize={"16px"} fontWeight={600} />
      <Form.Control
        type="text"
        placeholder="Enter last name"
        className="rounded-pill"
        value={lastName} // Ensure you have a corresponding useState for this
        onChange={(e) => setLastName(e.target.value)} // And an update function
      />
    </Form.Group>

 
                  {/* Email */}
                  <Form.Group className="my-2" controlId="email">
                    <Title secondTitle={"Email address"} fontSize={"16px"} fontWeight={600} />
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      className="rounded-pill"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  {/* Password */}
                  <Form.Group className="my-2" controlId="password">
                    <Title secondTitle={"Password"} fontSize={"16px"} fontWeight={600} />
                    <InputGroup>
                      <Form.Control
                        type="password"
                        className="rounded-pill"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>

                  {/* Confirm Password */}
                  <Form.Group className="my-2" controlId="confirmPassword">
                    <Title secondTitle={"Confirm Password"} fontSize={"16px"} fontWeight={600} />
                    <Form.Control
                      type="password"
                      placeholder="Re-enter password"
                      className="rounded-pill"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>

                  {/* Role Selection */}
                  <Form.Group className="my-2" controlId="role">
                    <Title secondTitle={"Role"} fontSize={"16px"} fontWeight={600} />
                    <Form.Select 
    value={role} 
    onChange={(e) => setRole(e.target.value)}
    name="role"
  >
    {Object.keys(Role).map((key) => (
      <option key={key} value={Role[key]}>
        {key}
      </option>
    ))}
  </Form.Select>
                  </Form.Group>

                  { (role === "Professionnal"   || role === "initiator")&& (

    
                <Form.Group className="mb-3" controlId="certification"> 
                  <Form.Label>Please upload Your Certification to be verified</Form.Label>
                  
                  <Form.Control type="file" onChange={handleCertificateChange} />
                </Form.Group>
              )}
                  

                  <div className="d-flex justify-content-between mx-2 mb-2">
                    <Form.Check
                      type="checkbox"
                      label="Accept Conditions"
                      id="flexCheckDefault"
                    />
                  </div>

                  <Button
                    className="mb-4 w-100"
                    style={{ background: "#1990aa", border: "none" }}
                    size="lg"
                    type="submit" // Set type to submit for form submission
                  >
                    Sign up
                  </Button>
                </Form>
              </Col>
              <Col md={6} className="d-flex flex-column justify-content-center align-items-center">
    <img 
      src={process.env.PUBLIC_URL + "/images/vectors/sign up.gif"} 
      alt="Sign up visual" 
      className="img-fluid my-3 signup-image" // Use the "signup-image" class
    />
    <NavLink to="/login" className="already-member-link">I am already a member</NavLink>
  </Col>


            </Row>
            
          </Col>
        </Row>
      </Container>
       
      </>
    );
  };

  export default SignupScreen;
