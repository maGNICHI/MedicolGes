import { useState } from "react"
import { useSignup } from "./useSignup"
// import Roles from "../components/Roles"
import {   InputGroup  } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link ,useNavigate} from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import FormContainer from "./FormContainer";
const SignupScreen = () => {  

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    const Role ={Patient:'Patient', Participative_Member:'Participative_Member' ,
  Coordinator_Member:'Coordinator_Member'}
 
  const {signup, error, isLoading} = useSignup()
   
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
    }
    try {
        await signup(name,email, password,role);
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.errors[0]?.message || err?.error);
      }
  }
   
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
    <Row className="w-100">
        <Col md={6}>
            <h1>Register</h1>
            <Form onSubmit={handleSubmit}>
                {/* Form Groups for name, email, password, confirmPassword, and role */}
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name here..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

      <Form.Group className="my-2" controlId="email">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group className="my-2" controlId="password">
        <Form.Label>Password</Form.Label>
        <InputGroup>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>
         </InputGroup>
      </Form.Group>

      <Form.Group className="my-2" controlId="confirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Re-enter password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>

     


      <Form.Group className="my-2" controlId="role">
<Form.Label>Role</Form.Label>
<Form.Control
  as="select"
  value={role}
  onChange={(e) => setRole(e.target.value)}
>
  
  <option value={Role.Participative_Member}>Participative Member</option>
  <option value={Role.Coordinator_Member}>Coordinator Member</option>
  <option value={Role.Patient}>Patient</option>
</Form.Control>
</Form.Group>


       {/* <Form.Group className="my-2" controlId="role">
        <Form.Label>Role</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter role here..."
          value={role}
          onChange={(e) => setRole(e.target.value)}
        ></Form.Control>
      </Form.Group>  */}


<Button type="submit" variant="primary" className="mt-3">Sign Up</Button>
                    </Form>
                    <Row className="py-3">
                        <Col>
                            Already have an account? <Link to={`/login`}>Login</Link>
                        </Col>
                    </Row>
                </Col>
                <Col md={6} className="d-none d-md-block">
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                        className="img-fluid"
                        alt="Phone image"
                    />
                </Col>
            </Row>
        </Container>
  )
}

export default SignupScreen