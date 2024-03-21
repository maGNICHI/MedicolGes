import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

// import { useDispatch, useSelector } from "react-redux";
// import { useLoginMutation } from "../slices/userApiSlice";
// import { setCredentials } from "../slices/authSlice";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import FormContainer from "./FormContainer";
import { toast } from "react-toastify";
import { useLogin } from "./useLogin"
// import Loader from "../../components/Loader";
 

const AdminLoginScreen = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
   
  const {login, error, isLoading} = useLogin()

  const submitHandler = async (e) => {
    e.preventDefault()

     await login(email, password)
    navigate("/Dashboard");
  }

  const [showPassword, setShowPassword] = useState(false);
   //const { userInfo } = useSelector((state) => state.auth);

  


  // const [login, { isLoading }] = useLoginMutation();
  
  // const submitHandler = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const responseFromApiCall = await login({ email, password }).unwrap();

  //     dispatch(setCredentials({ ...responseFromApiCall }));

  //     navigate("/");
  //   } catch (err) {
  //     toast.error(err?.data?.errors[0]?.message || err?.error);
  //   }
  // };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <FormContainer  >
       <h3 style={{ color: 'blue' }}>Welcome To MediColGes Application Web</h3>

      <h2>Sign In</h2>
  
      <Form onSubmit={submitHandler}>
     
        <Form.Group  className="my-2" controlId="email">
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
         type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>

<Button
                  variant="light"
                  onClick={togglePasswordVisibility}
                  style={{ border: "none", background: "transparent" }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
        </Form.Group> 

        <Button type="submit" variant="primary" className="mt-3">
          {" "}
          Sign In{" "}
        </Button>
      </Form> 
      <Col xs={12} md={7} className="order-md-1 order-2">
           <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
             className="img-fluid d-none d-md-block"
             alt="Phone image"
           />
         </Col>
      {/* {isLoading && (
        <>
          {" "}
          <Loader />{" "}
        </>
      )} */}

      <Row className="py-3">
        <Col>
          {" "}
          New ? <Link to={`/newadmin`}>Register</Link>
        </Col>
      </Row>

    </FormContainer>
  );
};

export default AdminLoginScreen;
