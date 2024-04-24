import React, { useEffect, useState } from "react";
import Layout from "../SuperAdminLayout/Layout";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../../components/Title/Title";
import IconButton from "../../components/Button/IconButton";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "../Dashboard.css";
import ProjectCard from "./ProjectCard";

export default function ProjectList() {
  const [selectedName, setSelectedName] = useState("Project Management");
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
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

  const handleShowAddModal = () => navigate("/addProject");

  return (
    <Layout
      selectedName={selectedName}
      style={{height: "100%" }}
     >
      <Container fluid className="mt-4 card shadow-lg p-3 " style={{ height: "100%" }}>
        {/* Adjust the height accordingly */}
        <Row className="align-items-center" style={{ padding: "20px" }}>
          <Col xs={12} md={10}>
            <Title
              title={"Project List"}
              fontWeight={600}
              fontSize={"24px"}
            />
          </Col>
           
        </Row>
        <Row>
                <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
          {currentProjects.map(
            (item) =>
              item.isDeleted === false && (
                   <ProjectCard key={item._id} project={item} />
         
                
                   
                
                
              )
            )}
            </tbody>
          </table>
        </Row>
        <div className="pagination-container d-flex justify-content-center">
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
