import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Title from "../../components/Title/Title";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Login/LoginActions";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
import { Link, VStack ,useColorModeValue } from '@chakra-ui/react';
import { NavLink as RouterNavLink } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const loginState = useSelector(state => state.login);
  const linkColor = useColorModeValue('teal.500', 'teal.200');
  const hoverColor = useColorModeValue('teal.600', 'teal.300');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <section className="vh-100 d-flex align-items-center justify-content-center">
      <Container fluid>
        <Row className="justify-content-center">
          <Col md={8} style={{ backgroundColor: "white", borderRadius: "20px" }}>
            <Row className="py-10 px-4">
              <Col xs={12} md={6} className="order-md-1 order-2 d-flex flex-column justify-content-center align-items-center">
                <img
                  src={process.env.PUBLIC_URL + "/images/vectors/Mobile login.gif"}
                  className="img-fluid d-none d-md-block"
                  alt="Phone image"
                />
                 <VStack spacing={3} align="center">
      <Link
        as={RouterNavLink}
        to="/signup"
        color={linkColor}
        fontSize="lg"
        fontWeight="bold"
        _hover={{ color: hoverColor, textDecoration: "underline" }}
        p={2}
      >
       Don't have an account ?
      </Link>

      <Link
        as={RouterNavLink}
        to="/verify-email"
        color={linkColor}
        fontSize="lg"
        fontWeight="bold"
        _hover={{ color: hoverColor, textDecoration: "underline" }}
        p={2}
      >
        Verify email
      </Link>
    </VStack>

              </Col>
              <Col xs={12} md={6} className="order-md-2 order-1 d-flex align-items-center">
                <Form className="mb-4 w-100" onSubmit={handleLogin}>
                  <div className="mb-5 text-center">
                    <Title
                      title={"Welcome To CoMediC Application Web"}
                      fontSize={"30px"}
                      fontWeight={900}
                      color={"#1990aa"}
                    />
                  </div>
                  <div className="mb-4">
                    <Title
                      secondTitle={"Email address"}
                      fontSize={"16px"}
                      fontWeight={600}
                    />
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      className="rounded-pill"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <Title
                      secondTitle={"Password"}
                      fontSize={"16px"}
                      fontWeight={600}
                    />
                    <div className="d-flex align-items-center">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="rounded-pill"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                  <div className="d-flex justify-content-between mx-4 mb-4">
                     
                    {/* <a href="!#" color="#8ac2bb">Forgot password?</a> */}
                    <Link
        as={RouterLink}
        to="/forgot-password"
        color="teal.500"
        fontSize="lg"
        fontWeight="bold"
        _hover={{ color: "teal.600", textDecoration: "underline" }}
        mt="3"
      >
       Forgot Password
      </Link>
                  
                  </div>
                  <Button className="mb-4 w-100 border-0" style={{background:"#1990aa"}} size="lg" type="submit">
                    Sign in
                  </Button>
                  <VStack spacing={4} align="center">
      <Link
        as={RouterLink}
        to="/face"
        color="teal.500"
        fontSize="lg"
        fontWeight="bold"
        _hover={{ color: "teal.600", textDecoration: "underline" }}
        mt="3"
      >
        Facial authentication (upload)
      </Link>
      <Link
        as={RouterLink}
        to="/faceauth"
        color="teal.500"
        fontSize="lg"
        fontWeight="bold"
        _hover={{ color: "teal.600", textDecoration: "underline" }}
        mt="3"
      >
        Facial authentication
      </Link>
    </VStack>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Login;
