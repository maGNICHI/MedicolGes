import React, { useState } from 'react'
import { Button, Col, Form, Row, Modal  } from 'react-bootstrap'
import Title from '../Title/Title'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../Redux/SignUp/SignupActions'

export default function AddUser() {
    const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedGender, setSelectedGender] = useState("Mr");
  const [selectedAvatar, setSelectedAvatar] = useState(
    process.env.PUBLIC_URL + "/images/avatar/maleuseravatar.jpg"
  );
  const [selectedRole, setSelectedRole] = useState("Patient");
  const [showCertification, setShowCertification] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [certification, setCertification] = useState(null);
  const navigate = useNavigate();

  const handleCertificationChange = (event) => {
    const file = event.target.files[0];
    setCertification(file);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    if (avatar === null) {
      setSelectedAvatar(
        event.target.value === "Mr"
          ? process.env.PUBLIC_URL + "/images/avatar/maleuseravatar.jpg"
          : process.env.PUBLIC_URL + "/images/avatar/useravatar.jpg"
      );
    }
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    setShowCertification(event.target.value === "participative_member");
  };
  const handleClose = (event) => {
   
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedAvatar(reader.result);
      setAvatar(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    if (avatar) {
      formData.append("pfp", avatar);
    }
    if (certification) {
      formData.append("certification", certification);
    }

    try {
      let result = await dispatch(registerUser(formData));
      console.log("🚀 ~ handleSubmit ~ result:", result)
      console.log("Registration successful");
       
      // Redirect or perform any other action upon successful registration
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle error (e.g., display error message to the user)
    }
  };

  
  return (
    <>
       <Modal.Body> 
       <Row className="d-flex align-items-center justify-content-center w-100">
        <Col md={9} style={{ backgroundColor: "white", borderRadius: "20px" }}>
            <Row className="px-4">
               
                <Col
                xs={12}
                md={12}
                className="d-flex align-items-center justify-content-center order-md-1 order-2"
                >
                <Form className="mb-4 w-100" onSubmit={handleSubmit}>
                    {/* Upload profile picture */}
                    <div className="text-center mb-2">
                        <p>If You Want To Upload A Profile Picture</p>
                   
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
                    {/* Gender selection */}
                    <Row className="mb-2">
                    <Col md={3} xs={12}>
                        <div className="mb-2">
                        <p>Gender</p>
                        <Form.Select
                            className="rounded-pill"
                            value={selectedGender}
                            onChange={handleGenderChange}
                            name="gender" // Add name attribute to identify the field
                        >
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                        </Form.Select>
                        </div>
                    </Col>
                    {/* Username */}
                    <Col md={9} xs={12}>
                        <div className="mb-2">
                         <p>Username</p>
                        <Form.Control
                            placeholder="Username"
                            className="rounded-pill"
                            name="username" // Add name attribute to identify the field
                        />
                        </div>
                    </Col>
                    </Row>
                    {/* First name and last name */}
                    <Row className="mb-2">
                    <Col md={6} xs={12}>
                        <div className="mb-2">
                        <p>FirstName</p>

                
                        <Form.Control
                            placeholder="FirstName"
                            className="rounded-pill"
                            name="firstName" // Add name attribute to identify the field
                        />
                        </div>
                    </Col>
                    <Col md={6} xs={12}>
                        <div className="mb-2">
                        <p>LastName</p>

                      
                        <Form.Control
                            placeholder="LastName"
                            className="rounded-pill"
                            name="lastName" // Add name attribute to identify the field
                        />
                        </div>
                    </Col>
                    </Row>
                    {/* Email */}
                    <div className="mb-2">
                    <p>Email address</p>
 
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        className="rounded-pill"
                        name="email" // Add name attribute to identify the field
                    />
                    </div>
                    {/* Password */}
                    <div className="mb-2">
                        <p>Password</p>
                 
                    <div className="d-flex align-items-center">
                        <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="rounded-pill"
                        name="password" // Add
                        />
                        <Button
                        variant="light"
                        onClick={togglePasswordVisibility}
                        style={{ border: "none", background: "transparent" }}
                        >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                    </div>
                    </div>
                    {/* Role selection */}
                    <div className="mb-2">
                        <p>Role</p>
            
                    <Form.Select
                        className="rounded-pill"
                        value={selectedRole}
                        onChange={handleRoleChange}
                        name="role" // Add name attribute to identify the field
                    >
                        <option value="Patient">Patient</option>
                        <option value="participative_member">Professional</option>
                    </Form.Select>
                    </div>
                    {showCertification && (
                    <div className="mb-2">
                        <p className='font-bold	'>Upload Certification that proves that you are in the medical field</p>
                        <Title
                        secondTitle={
                            "Upload Certification that proves that you are in the medical field"
                        }
                        fontSize={"16px"}
                        fontWeight={600}
                        />
                        <Form.Control
                        required
                        type="file"
                        className="rounded-pill" // Add name attribute to identify the field
                        onChange={handleCertificationChange}
                        />
                    </div>
                    )}
                    <div className="d-flex w-100 justify-content-between">
            <div>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </div>
            <div>
                <Button variant="primary" 
                    style={{ background: "#1990aa", border: "none" }}
                    type="submit" 
                   >
                    Add User
                </Button>
            </div>
        </div>
                </Form>
                </Col>
               
            </Row>
        </Col>
    </Row> 
        </Modal.Body>
    
  
    </>
  )
}
