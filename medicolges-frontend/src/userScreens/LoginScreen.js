import React, { useState } from "react";
import { Link, useNavigate, NavLink ,navigate} from "react-router-dom";
import { Form, Button, Row, Col, Container, InputGroup, FormControl } from "react-bootstrap";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from "react-toastify";
import { useLogin } from "./useLogin";
import Title from "../components/Title/Title";
import './LoginScreen.css'; // Assuming you have a CSS file for styles

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login, error, isLoading } = useLogin();
    const [showPassword, setShowPassword] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (isLoading) return; // Prevents form resubmission while loading
    
        try {
            const result = await login(email, password);
            // Assuming login() updates localStorage upon success and returns a truthy value on success.
            if (result) {
                const user = JSON.parse(localStorage.getItem('userInfo'));
                if ( user.role === "super admin") {
                    navigate('/Dashboard'); // Redirect super admin to Dashboard
                } else {
                    navigate('/'); // Redirect other users to home
                }
            } else {
                // Consider setting an error state here for user feedback
                console.log('Login failed or user info not set in localStorage.');
            }
        } catch (error) {
            // Error handling, could be network issue, server error, etc.
            console.error('An error occurred during login:', error);
            // Consider using a state to show the error to the user
        }
    };
    
    

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
     
    return (
      <section className="login-section vh-100"> 
        <Container fluid className="h-100">
            <Row className="justify-content-center align-items-center h-100">
                <Col xs={12} md={8} lg={6} className="login-container shadow">
                    <Row>
                        <Col md={6} className="login-image-col d-flex justify-content-center align-items-center">
                            <img
                              src={process.env.PUBLIC_URL + "/images/vectors/Mobile login.gif"}
                              alt="Mobile login"
                              className="img-fluid login-image"
                            /> 
                        </Col>
                        <Col md={6} className="d-flex flex-column justify-content-center">
                            <div className="mb-4 text-center">
                                <Title
                                  title={"Welcome To CoMediC Application Web"}
                                  fontSize={"30px"}
                                  fontWeight={900}
                                  color={"#1990aa"}
                                />
                            </div>
                            <Form onSubmit={submitHandler} className="w-100 px-3">
                                <Form.Group className="mb-3" controlId="email">
                                    <Title secondTitle={"Email address"} fontSize={"16px"} fontWeight={600} />
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        className="rounded-pill form-input"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>
                                
                                <Form.Group className="mb-3" controlId="password">
                                    <Title secondTitle={"Password"} fontSize={"16px"} fontWeight={600} />
                                    <InputGroup>
                                        <FormControl
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter password"
                                            className="rounded-pill form-input"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <InputGroup.Text className="password-toggle">
                                            <Button variant="outline-secondary" onClick={togglePasswordVisibility} className="toggle-btn">
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </Button>
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <Form.Check type="checkbox" label="Remember me" id="flexCheckDefault" />
                                    <NavLink to="/forgot-password" className="forgot-password-link">
                                        Forgot password?
                                    </NavLink>
                                </div>
                                <Button className="mb-4 w-100 border-0" style={{background:"#1990aa"}} size="lg" type="submit">
                    Sign in
                  </Button>
                                <div className="text-center mt-3">
                                    New? <NavLink to={`/signup`} className="signup-link">Register</NavLink>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
      </section>
    );
};

export default LoginScreen;
