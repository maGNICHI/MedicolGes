import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container, InputGroup, FormControl } from "react-bootstrap";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from "react-toastify";
import { useLogin } from "./useLogin"

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login, error, isLoading } = useLogin();
    const [showPassword, setShowPassword] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
     
     
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Row>
                <Col md={6} className="d-none d-md-block">
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                        className="img-fluid"
                        alt="Phone image"
                    />
                </Col>
                <Col md={6}>
                    <h3 style={{ color: 'blue' }}>Welcome To MediColGes Application Web</h3>
                    <h2>Sign In</h2>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                                <FormControl
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <InputGroup.Text>
                                    <Button variant="outline-secondary" onClick={togglePasswordVisibility} style={{ border: "none",    }}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </Button>
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                        <Button type="submit" variant="primary">
                            Sign In
                        </Button>
                    </Form>
                    <Row className="py-3">
                        <Col>
                            New? <Link to={`/signup`}>Register</Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginScreen;
