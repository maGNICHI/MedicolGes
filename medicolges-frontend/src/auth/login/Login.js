import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Title from '../../components/Title/Title';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container fluid className="p-3 my-5 d-flex align-items-center justify-content-center">
      <Row>
        <Col xs={12} md={7} className="order-md-1 order-2">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid d-none d-md-block"
            alt="Phone image"
          />
        </Col>
        <Col xs={12} md={5} className='d-flex align-items-center order-md-2 order-1'>
          <Form className="mb-4 w-100">
            <div className='mb-5 text-center'>
             <Title title={"Welcome To MediColGes Application Web"} fontSize={"40px"} fontWeight={900} color={"blue"} />
            </div>
            <div className="mb-4">
              <Title secondTitle={"Email address"} fontSize={"20px"} fontWeight={600} />
              <Form.Control
                type="email"
                placeholder="Enter email"
                size="lg"
                className="rounded-pill"
              />
            </div>
            <div className="mb-4">
              <Title secondTitle={"Password"} fontSize={"20px"} fontWeight={600} />
              <div className="d-flex align-items-center">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  size="lg"
                  className="rounded-pill"
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
              <Form.Check
                type="checkbox"
                label="Remember me"
                id="flexCheckDefault"
              />
              <a href="!#">Forgot password?</a>
            </div>
            <div className="d-flex justify-content-between mx-4 mb-4">
              <Form.Label>If you don't have an account, create a new one here:</Form.Label>
              <NavLink to="/signup">Sign up</NavLink>
            </div>
            <Button className="mb-4 w-100" size="lg">
              Sign in
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
