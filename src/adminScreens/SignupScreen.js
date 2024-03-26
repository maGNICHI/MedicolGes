import { useState } from "react"
import { useSignup } from "./useSignup"
// import Roles from "../components/Roles"
 
import { Link ,useNavigate} from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import FormContainer from "./FormContainer";

const AdminSignup = () => {  

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [adminRegistrationKey, setadminRegistrationKey] = useState("");

    const navigate = useNavigate();
     
   
  const {signup, error, isLoading} = useSignup()
 
   
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match :( ");
    } else {
      try {
        await signup(name, email, password, adminRegistrationKey);
        navigate("/Dashboard");
      } catch (err) {
        // Assuming the error handling structure is correct, but make sure
        // the path to the error message aligns with the actual error object's structure
        toast.error(err?.response?.data?.errors[0]?.message || err.message || "An error occurred.");
      }
    }
    }
  
   
  return (
    <FormContainer>
       <h2 style={{ color: 'blue' }}>Welcome To MediColGes </h2>
    <h2>Register Admin </h2>

    <Form onSubmit={handleSubmit}>
      <Form.Group className="my-2" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name here..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Form.Control>
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
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>
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

      <Form.Group className="my-2" controlId="adminRegistrationKey">
        <Form.Label>code </Form.Label>
        <Form.Control
          type="password"
          placeholder="entre code "
          value={adminRegistrationKey}
          onChange={(e) => setadminRegistrationKey(e.target.value)}
        ></Form.Control>
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


      <Button type="submit" variant="primary" className="mt-3">
        {" "}
        Sign Up{" "}
      </Button>
    </Form>

    <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
             className="img-fluid d-none d-md-block"
             alt="Phone image"
           />

    <Row className="py-3">
      <Col>
        {" "}
        Already have an account? <Link to={`/admin`}>Login</Link>
      </Col>
    </Row>
  </FormContainer>
  )
}

export default AdminSignup