import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import "../../Dashboard/Dashboard.css";
import Layout from "../../SuperAdminLayout/Layout";
import Title from "../../../components/Title/Title";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import IconButton from "../../../components/Button/IconButton";
import { FaPlus, FaFileDownload } from "react-icons/fa";

function ConsultProject() {
  const [selectedName, setSelectedName] = useState("Consult Project");
  const [projectData, setProjectData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/project/${id}`
        );
        setProjectData(response.data.success.project);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchData();
  }, [id]);

  const downloadFileAtURL = (url) => {
    const fileName = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };
  

  return (
    <Layout selectedName={selectedName}>
      <Container fluid className="mt-4 h-screen">
        <Row className="mb-4">
          <Col md={12}>
            <Card className="card h-screen">
              <Card.Body className="project-details-body">
                <Title
                  title={"Project Details"}
                  fontWeight={600}
                  fontSize={"24px"}
                  className="mb-4"
                />
                <hr className="mb-4" />
                <Row className="mb-3">
                  <Col md={2}>
                    <Title
                      title={"Name: "}
                      fontWeight={600}
                      fontSize={"20px"}
                      className="mr-2"
                    />
                  </Col>
                  <Col md={10}>{projectData.name}</Col>
                </Row>
                <Row>
                  <Col md={2}>
                    <Title
                      title={"Description: "}
                      fontWeight={600}
                      fontSize={"20px"}
                      className="mr-2"
                    />
                  </Col>
                  <Col md={10}>{projectData.description}</Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={2} xs={12}>
            <Card className="card text-center justify-content-center">
              <Card.Body>
                <Title
                  title={
                    "If you want to add a questionnaire for your patients in this project"
                  }
                  fontWeight={600}
                  fontSize={"16px"}
                />
                <IconButton
                  className={"my-3"}
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
                  Add Questionnaire
                </IconButton>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8} xs={12}>
            <Card>
              <Card.Body className="project-details-body">
                <Title
                  title={"Project Feed"}
                  fontWeight={600}
                  fontSize={"24px"}
                  className="mb-4"
                />
                <hr />
              </Card.Body>
            </Card>
          </Col>
          <Col md={2} xs={12}>
            <Card className="card text-center justify-content-center">
              <Card.Body>
                <Title
                  title={
                    "If you want to export the data file of this project click here."
                  }
                  fontWeight={600}
                  fontSize={"16px"}
                />
                <IconButton
                  className={"my-3"}
                  style={{
                    background:
                      "linear-gradient(45deg, rgb(4, 159, 187) 0%, rgb(80, 246, 255) 100%)",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: 600,
                    padding: "8px 16px",
                    borderRadius: "20px",
                  }}
                  onClick={() => { downloadFileAtURL(projectData.file); }}
                  startIcon={<FaFileDownload />}
                >
                  Export Data File
                </IconButton>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default ConsultProject;
