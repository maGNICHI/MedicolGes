import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Title from '../../components/Title/Title';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
 
function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
     
    <Container fluid className="p-3 my-5 d-flex align-items-center justify-content-center">
      <Row>
        <Col xs={12} md={5} className='d-flex align-items-center order-md-1 order-2'>
          <Form className="mb-4 w-100 ">
            <div className='mb-3 text-center'>
             <Title title={"Welcome To MediColGes Application Web"} fontSize={"40px"} fontWeight={900} color={"blue"} />
            </div>
            <div className="mb-2">
              <Title secondTitle={"Username"} fontSize={"16px"} fontWeight={600} />
              <Form.Control
                placeholder="Username"
                className="rounded-pill"
              />
            </div>
            <div className="mb-2">
              <Title secondTitle={"FirstName"} fontSize={"16px"} fontWeight={600} />
              <Form.Control
                placeholder="FirstName"
                className="rounded-pill"
              />
            </div>
            <div className="mb-2">
              <Title secondTitle={"LastName"} fontSize={"16px"} fontWeight={600} />
              <Form.Control
                placeholder="LastName"
                className="rounded-pill"
              />
            </div>
            <div className="mb-2">
              <Title secondTitle={"Email address"} fontSize={"16px"} fontWeight={600} />
              <Form.Control
                type="email"
                placeholder="Enter email"
                className="rounded-pill"
              />
            </div>
            <div className="mb-2">
              <Title secondTitle={"Password"} fontSize={"16px"} fontWeight={600} />
              <div className="d-flex align-items-center">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
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
              <div className="mb-2">
              <Title secondTitle={"Role"} fontSize={"16px"} fontWeight={600} />
              <Form.Select className="rounded-pill">
                <option>Coordinator Member</option>
                <option>Participative Member</option>
                <option>Patient</option>
              </Form.Select>
            </div>
            </div>
            <div className="d-flex justify-content-between mx-2 mb-2">
              <Form.Check
                type="checkbox"
                label="Accept Conditions"
                id="flexCheckDefault"
              />
            </div>
            <div className="d-flex justify-content-between mx-2 mb-2">
              <Form.Label>If you already have an account click here to:</Form.Label>
              <NavLink to="/login">Log in</NavLink>
            </div>
            <Button className="mb-4 w-100" size="lg">
              Sign up
            </Button>
          </Form>
        </Col>
        <Col xs={12} md={7} className="order-md-2 order-1">
          <img
            src={process.env.PUBLIC_URL + "/images/vectors/Online Doctor-rafiki.png"}
            className="img-fluid d-none d-md-block"
            alt="Phone image"
          />
        </Col>
      </Row>
    </Container>
  
  );
}

export default Signup;
