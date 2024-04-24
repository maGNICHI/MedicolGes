import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Pagination, Form } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaSearch, FaPlus } from "react-icons/fa";
import "./style.css";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";

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
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
    <div className="home-section">
      <Navbar />
      <div className="contentUser" style={{ height: "100%" }}>
        <div className="container-fluid mb-5">
          <div className="row pt-10 mb-10">
            <div className="col-md-7 col-xs-12">
              <h3 className="info-title ml-10">
                <span>Our Projects</span>
              </h3>
            </div>
            <div className="col-md-2 col-xs-5 my-3 mr-4">
              <div className="input-wrapper">
                <input
                  type="text"
                  name="text"
                  className="input"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleChange}
                />
                <FaSearch
                  className="search-icon -ml-12"
                  color="white"
                  style={{ zIndex: 2 }}
                />
              </div>
            </div>
            <div className="col-md-2 col-xs-7 mt-3">
              <IconButton
                className="border-0 w-100"
                style={{
                  background: `linear-gradient(-45deg, #1990aa 0%, #8ac2bb 100%)`,
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 600,
                  padding: "8px 16px",
                  borderRadius: "20px",
                }}
                onClick={() => {navigate('/organizationFront')}}
                startIcon={<FaPlus />}
              >
                Add New Organization
              </IconButton>
            </div>
          </div>
          <div className="row pt-10 mb-10">
            {currentOrganizations.map((organization, index) => (
              <Col key={index} md={4} xs={12}>
                <OrganizationCard organization={organization} />
              </Col>
            ))}
          </div>
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
        </div>
      </div>
    </div>
  );
}

export default OrganizationList;
