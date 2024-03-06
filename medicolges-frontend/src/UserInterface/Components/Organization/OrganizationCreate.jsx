import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  Col,
  Container,
  Row,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import {
  FaPlus,
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaBuilding,
  FaIndustry,
} from "react-icons/fa";
import Navbar from "../Navbar";

function CreateOrganization() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [category, setCategory] = useState("Organization");
  const [type, setType] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!address.trim()) {
      errors.address = "Address is required";
    }

    if (!phoneNumber.trim()) {
      errors.phoneNumber = "Phone Number is required";
    } else if (!/^\d+$/.test(phoneNumber)) {
      errors.phoneNumber = "Phone Number must contain only digits";
    }

    if (!category.trim()) {
      errors.category = "Category is required";
    }

    if (!type.trim()) {
      errors.type = "Type is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await axios.post("http://localhost:8000/api/organization/", {
          name,
          address,
          phoneNumber,
          category,
          type,
        });

        // Redirect or show success message
      } catch (error) {
        console.error("Error creating organization:", error);
        // Handle error
      }
    }
  };

  return (
    <>
      <Navbar />
      <Container fluid className="mt-4 h-screen">
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Card className="card">
              <Card.Header style={{ padding: "20px" }}>
                <Row className="align-items-center">
                  <Col xs={12} md={10}></Col>
                  <Col xs={12} md={2} className="text-md-end mt-3 mt-md-0">
                    <Button
                      variant="primary"
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        padding: "8px 16px",
                        borderRadius: "20px",
                      }}
                    >
                      <FaPlus style={{ marginRight: "8px" }} />
                      Add Organization
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  {Object.keys(errors).length > 0 && (
                    <Alert variant="danger">
                      Please fix the following errors:
                      <ul>
                        {Object.values(errors).map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </Alert>
                  )}
                  <Form.Group>
                    <Form.Label>
                      <FaUser /> Name:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter organization name"
                      className={`rounded-pill ${
                        errors.name ? "is-invalid" : ""
                      }`}
                    />
                    {errors.name && (
                      <Form.Text className="text-danger">
                        {errors.name}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      <FaMapMarkerAlt /> Address:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter organization address"
                      className={`rounded-pill ${
                        errors.address ? "is-invalid" : ""
                      }`}
                    />
                    {errors.address && (
                      <Form.Text className="text-danger">
                        {errors.address}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      <FaPhone /> Phone Number:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter organization phone number"
                      className={`rounded-pill ${
                        errors.phoneNumber ? "is-invalid" : ""
                      }`}
                    />
                    {errors.phoneNumber && (
                      <Form.Text className="text-danger">
                        {errors.phoneNumber}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      <FaBuilding /> Category:
                    </Form.Label>
                    <Form.Control
                      as="select"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="rounded-pill"
                    >
                      <option value="Organization">Organization</option>
                      <option value="Industry">Industry</option>
                      <option value="Establishment">Establishment</option>
                    </Form.Control>
                    {errors.category && (
                      <Form.Text className="text-danger">
                        {errors.category}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      <FaIndustry /> Type:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      placeholder="Enter organization type"
                      className={`rounded-pill ${
                        errors.type ? "is-invalid" : ""
                      }`}
                    />
                    {errors.type && (
                      <Form.Text className="text-danger">
                        {errors.type}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="rounded-pill"
                  >
                    Create
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CreateOrganization;
