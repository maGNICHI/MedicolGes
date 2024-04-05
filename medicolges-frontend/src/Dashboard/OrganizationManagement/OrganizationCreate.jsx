import React, { useState } from "react";
import axios from "axios";
import { Card, Col, Container, Row, Form, Button } from "react-bootstrap";
import Layout from "../SuperAdminLayout/Layout";
import Title from "../../components/Title/Title";
import { FaPlus } from "react-icons/fa";
import "../Dashboard/Dashboard.css";
import '../Dashboard.css'

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
        await axios.post("http://localhost:5000/api/organization/", {
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
    <Layout selectedName="Organization Management">
      <Container
        fluid
        className="mt-4 h-screen"
        style={{ overflowY: "auto", maxHeight: "100%", zIndex: 0 }}
      >
        <Row>
          <Card className="card">
            <Card.Header style={{ padding: "20px" }}>
              <Row className="align-items-center">
                <Col xs={12} md={10}>
                  <Title
                    title={"Create Organization"}
                    fontWeight={600}
                    fontSize={"24px"}
                  />
                </Col>
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
                <Form.Group>
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter organization name"
                  />
                  {errors.name && (
                    <Form.Text className="text-danger">{errors.name}</Form.Text>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Address:</Form.Label>
                  <Form.Control
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter organization address"
                  />
                  {errors.address && (
                    <Form.Text className="text-danger">
                      {errors.address}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Phone Number:</Form.Label>
                  <Form.Control
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter organization phone number"
                  />
                  {errors.phoneNumber && (
                    <Form.Text className="text-danger">
                      {errors.phoneNumber}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Category:</Form.Label>
                  <Form.Control
                    as="select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
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
                  <Form.Label>Type:</Form.Label>
                  <Form.Control
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder="Enter organization type"
                  />
                  {errors.type && (
                    <Form.Text className="text-danger">{errors.type}</Form.Text>
                  )}
                </Form.Group>
                <Button variant="primary" type="submit">
                  Create
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </Layout>
  );
}

export default CreateOrganization;
