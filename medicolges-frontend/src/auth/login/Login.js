import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Title from "../../components/Title/Title";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Login/LoginActions";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const loginState = useSelector(state => state.login);
 

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
                <NavLink to="/signup" className="mt-3" color="#8ac2bb">I am not a member</NavLink>
               
                <NavLink to="/verify-email" className="mt-3" color="#8ac2bb">verify email</NavLink>
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
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                      id="flexCheckDefault"
                    />
                    {/* <a href="!#" color="#8ac2bb">Forgot password?</a> */}
                    <NavLink to="/forgot-password" className="mt-3" color="#8ac2bb">forgot password</NavLink>
                  </div>
                  <Button className="mb-4 w-100 border-0" style={{background:"#1990aa"}} size="lg" type="submit">
                    Sign in
                  </Button>
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
