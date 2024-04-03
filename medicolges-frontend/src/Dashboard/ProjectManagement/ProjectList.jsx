import React, { useEffect, useState } from "react";
import Layout from "../SuperAdminLayout/Layout";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../../components/Title/Title";
import IconButton from "../../components/Button/IconButton";
import { FaPlus } from "react-icons/fa";
import ProjectCard from "../../components/Cards/ProjectCard";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "../Dashboard.css";

export default function ProjectList() {
  const [selectedName, setSelectedName] = useState("Project Management");
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const getProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/project/");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  // Calculate indexes for pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  // Generate pagination items
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(projects.length / projectsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  // Function to handle pagination
  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout
      selectedName={selectedName}
      style={{height: "100%" }}
    >
      <Container fluid className="mt-4" style={{ height: "100%" }}>
        {/* Adjust the height accordingly */}
        <Row className="align-items-center" style={{ padding: "20px" }}>
          <Col xs={12} md={10}>
            <Title
              title={"Project List"}
              fontWeight={600}
              fontSize={"24px"}
            />
          </Col>
          <Col xs={12} md={2} className="text-md-end mt-3 mt-md-0">
            <NavLink style={{ textDecoration: "none" }} to="/addProject">
              <IconButton
                className="h-100 border-0"
                style={{
                  background:
                    "linear-gradient(45deg, rgb(4, 159, 187) 0%, rgb(80, 246, 255) 100%)",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 600,
                  padding: "8px 16px",
                  borderRadius: "20px",
                }}
                startIcon={<FaPlus />}
              >
                <Title title={"Add project"} />
              </IconButton>
            </NavLink>
          </Col>
        </Row>
        <Row>
          {currentProjects.map(
            (item) =>
              item.isDeleted === false && (
                <Col key={item._id} xs={12} md={4} className="mb-3">
                  <ProjectCard project={item} />
                </Col>
              )
          )}
        </Row>
        <div className="pagination-container">
          <ul className="pagination">
            {pageNumbers.map((number) => (
              <li
                key={number}
                className={`page-item ${
                  number === currentPage ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePaginate(number)}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Layout>
  );
}
