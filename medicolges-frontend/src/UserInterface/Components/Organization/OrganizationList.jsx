import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Pagination, Form } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "./style.css";
import Navbar from "../Navbar";

function OrganizationCard({ organization }) {
  return (
    <Card className="organization-card">
      {organization.image && (
        <div className="card-image-container">
          <Card.Img
            style={{ objectFit: "cover" }}
            variant="top"
            src={organization.image[0]}
            className="card-image"
          />
        </div>
      )}
      <Card.Body>
        <div className="content">
          <Card.Title
            style={{
              fontWeight: "bold ",
              fontStyle: "italic",
            }}
            className="title"
          >
            {organization.name}
          </Card.Title>
          <div className="organization-details">
            <Card.Text>
             
              <strong>Address:</strong> {organization.address} <br />
              <strong>Phone Number:</strong> {organization.phoneNumber} <br />
              <strong>Category:</strong> {organization.category} <br />
              <strong>Type:</strong> {organization.type} <br />
            </Card.Text>
            <ul className="social-icons">
              <li>
                <a href="#" className="social-link">
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                  <FaTwitter />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

function OrganizationList() {
  const [organizations, setOrganizations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const organizationsPerPage = 3;

  useEffect(() => {
    async function fetchOrganizations() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/organization/"
        );
        setOrganizations(response.data);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    }

    fetchOrganizations();
  }, []);

  const indexOfLastOrganization = currentPage * organizationsPerPage;
  const indexOfFirstOrganization =
    indexOfLastOrganization - organizationsPerPage;
  const filteredOrganizations = organizations.filter((organization) =>
    organization.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentOrganizations = filteredOrganizations.slice(
    indexOfFirstOrganization,
    indexOfLastOrganization
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      <Container fluid className="mt-24">
        <Form className="mb-3" style={{ textAlign: "right" }}>
          <Form.Control
            type="text"
            placeholder="Search by organization name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              borderRadius: "20px",
              border: "2px solid #ced4da",
              padding: "5px 10px",
              fontSize: "14px",
              width: "250px",
              marginLeft: "1200px",
            }}
          />
        </Form>

        <Row xs={1} md={2} lg={3} className="g-4">
          {currentOrganizations.map((organization, index) => (
            <Col key={index}>
              <OrganizationCard organization={organization} />
            </Col>
          ))}
        </Row>
        <Pagination className="mt-4" style={{ color: "#9dcbc1" }}>
          {Array.from({
            length: Math.ceil(
              filteredOrganizations.length / organizationsPerPage
            ),
          }).map((_, index) => (
            <Pagination.Item
              key={index + 1}
              onClick={() => paginate(index + 1)}
              active={index + 1 === currentPage}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>
    </>
  );
}

export default OrganizationList;
