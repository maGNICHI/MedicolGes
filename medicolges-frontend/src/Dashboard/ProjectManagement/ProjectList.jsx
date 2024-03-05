import React, { useEffect, useState } from "react";
import Layout from "../SuperAdminLayout/Layout";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../../components/Title/Title";
import IconButton from "../../components/Button/IconButton";
import { FaPlus } from "react-icons/fa";
import ProjectCard from "../../components/Cards/ProjectCard";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function ProjectList() {
  const [selectedName, setSelectedName] = useState("Project Management");
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    try {
      const data = await axios.get("http://localhost:3001/api/project/");
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
    <Layout selectedName={selectedName}>
      <Container
        fluid
        className="mt-4 h-screen"
        style={{ overflow: "auto", maxHeight: "100%", zIndex: 0 }} // Set overflow to hidden
      >
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
        <Row className="my-5 flex gap-5 mx-5">
          {projects.map(
            (item) =>
              item.isDeleted === false && (
                <ProjectCard  key={item.id} project={item} />
              )
          )}
        </Row>
      </Container>
    </Layout>
  );
}
