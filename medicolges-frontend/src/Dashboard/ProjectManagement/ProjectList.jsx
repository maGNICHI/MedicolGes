import React, { useEffect, useState } from "react";
import Layout from "../SuperAdminLayout/Layout";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../../components/Title/Title";
import IconButton from "../../components/Button/IconButton";
import { FaPlus } from "react-icons/fa";
import ProjectCard from "../../components/Cards/ProjectCard";
import axios from "axios";
import { NavLink } from "react-router-dom";
import '../Dashboard.css'

export default function ProjectList() {
  const [selectedName, setSelectedName] = useState("Project Management");
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    try {
      const data = await axios.get("http://localhost:5000/api/project/");
      console.log(data.data);
      setProjects(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <Layout selectedName={selectedName} style={{backgroundColor: `#a3bee3 !important`, height: "screen"}}>
      <Container fluid className="mt-4" style={{ height: "screen" }}>
        {/* Adjust the height accordingly */}
        <Row className="align-items-center" style={{ padding: "20px" }}>
          <Col xs={12} md={10}>
            <Title title={"Project List"} fontWeight={600} fontSize={"24px"} />
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
          {projects.map(
            (item) =>
              item.isDeleted === false && (
                <Col key={item._id} xs={12} md={4} className="mb-3">
                  <NavLink
                    to={`/consultProject/${item._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <ProjectCard project={item} />
                  </NavLink>
                </Col>
              )
          )}
        </Row>
      </Container>
    </Layout>
  );
}
