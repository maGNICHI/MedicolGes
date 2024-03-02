import React, { useState } from "react";
import Layout from "../SuperAdminLayout/Layout";
import { Card, Col, Container, Row } from "react-bootstrap";
import Title from "../../components/Title/Title";
import IconButton from "../../components/Button/IconButton";
import { FaPlus } from "react-icons/fa";
import CheckTable from "../../components/Table/UserTable";
import "../Dashboard/Dashboard.css";
import ProjectCard from "../../components/Cards/ProjectCard";

export default function ProjectList() {
  const [selectedName, setSelectedName] = useState("Project Management");

  return (
    <Layout selectedName={selectedName}>
      <Container
        fluid
        className="mt-4 h-screen"
        style={{ overflowY: "auto", maxHeight: "100%", zIndex: 0 }}
      >
        <Row>
          <Card className="card"> {/* Add a different class */}
            <Card.Header style={{ padding: "20px" }}>
              <Row className="align-items-center">
                <Col xs={12} md={10}>
                  <Title title={"Project List"} fontWeight={600} fontSize={"24px"} /> {/* Change the title */}
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
                    <Title title={"Add project"} /> {/* Change the button label */}
                   </IconButton>
                   </Col>
              </Row>
            </Card.Header>
          </Card>
        </Row>
        <Row className="my-5 flex gap-5 mx-5">
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
        </Row>
      </Container>
    </Layout>
  );
}
