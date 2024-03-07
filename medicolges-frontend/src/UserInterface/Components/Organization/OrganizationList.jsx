import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../SuperAdminLayout/Layout";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import Title from "../../components/Title/Title";
import IconButton from "../../components/Button/IconButton";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import "../Dashboard/Dashboard.css";

export default function OrganizationList() {
  const [selectedName, setSelectedName] = useState("Organization Management");
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/organization/"
        );
        setOrganizations(response.data);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    fetchOrganizations();
  }, []);

  const handleEdit = (id) => {
    // Redirect to edit page with the organization ID
    // Example: history.push(`/organizations/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/organization/${id}`);
      // If delete is successful, update organizations state to remove the deleted organization
      setOrganizations(organizations.filter((org) => org._id !== id));
    } catch (error) {
      console.error("Error deleting organization:", error);
    }
  };

  return (
    <Layout selectedName={selectedName}>
      <Container
        fluid
        className="mt-4 h-screen"
        style={{ overflowY: "auto", maxHeight: "100%", zIndex: 0 }}
      >
        <Row>
          <Card className="card">
            {" "}
            {/* Add a different class */}
            <Card.Header style={{ padding: "20px" }}>
              <Row className="align-items-center">
                <Col xs={12} md={10}>
                  <Title
                    title={"Project List"}
                    fontWeight={600}
                    fontSize={"24px"}
                  />{" "}
                  {/* Change the title */}
                </Col>
                <Col xs={12} md={2} className="text-md-end mt-3 mt-md-0">
                  <IconButton
                    className="h-100 border-0"
                    style={{
                      background: "#0ea9f991",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: 600,
                      padding: "8px 16px",
                      borderRadius: "20px",
                    }}
                    startIcon={<FaPlus />}
                  >
                    <Title title={"Add Organization"} />{" "}
                    {/* Change the button label */}
                  </IconButton>
                </Col>
              </Row>
            </Card.Header>
          </Card>
        </Row>
        <Row>
          <Card className="card">
            <Card.Header style={{ padding: "20px" }}>
              <Row className="align-items-center">
                <Col xs={12} md={9}>
                  <Title
                    title={"Organization List"}
                    fontWeight={600}
                    fontSize={"24px"}
                  />
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="p-0">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {organizations.map((organization) => (
                    <tr key={organization._id}>
                      <td>{organization.name}</td>
                      <td>{organization.address}</td>
                      <td>{organization.phoneNumber}</td>
                      <td>{organization.category}</td>
                      <td>{organization.type}</td>
                      <td>
                        <FaEdit
                          style={{ cursor: "pointer", marginRight: "10px" }}
                          onClick={() => handleEdit(organization._id)}
                        />
                        <FaTrash
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(organization._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </Layout>
  );
}
