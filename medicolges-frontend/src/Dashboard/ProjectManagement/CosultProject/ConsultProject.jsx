import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import Layout from "../../SuperAdminLayout/Layout";
import Title from "../../../components/Title/Title";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import IconButton from "../../../components/Button/IconButton";
import PostList from "../../../UserInterface/Components/Post/PostList";

function ConsultProject() {
  const [selectedName, setSelectedName] = useState("Consult Project");
  const [projectData, setProjectData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/project/${id}`
        );
        setProjectData(response.data.success.project);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const handleDeleteProject = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/project/${id}`);
      setShowConfirmationModal(false);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const downloadFile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/project/download/${projectData.file}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", projectData.file);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleUpdateProject = async () => {
    try {
      await axios.put(`http://localhost:5000/api/project/updateProject/${id}`, projectData);
      handleCloseUpdateModal();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <Layout selectedName={selectedName}>
      <Container fluid className="mt-4">
        <Row className="mb-4">
          <Col md={12}>
            <Card className="card h-screen">
              <Card.Body className="project-details-body">
                <Row className="align-items-center">
                  <Col xs={12} md={7}>
                    <Title
                      title={"Project Details"}
                      fontWeight={600}
                      fontSize={"24px"}
                      className="mb-4"
                    />
                  </Col>
                  <Col xs={12} md={3} className="text-md-end mt-3 mt-md-0">
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
                      onClick={() => setShowUpdateModal(true)}
                    >
                      <Title title={"Update Project"} />
                    </IconButton>
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
                      onClick={() => setShowConfirmationModal(true)}
                    >
                      <Title title={"Delete Project"} />
                    </IconButton>
                  </Col>
                </Row>
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <>
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
                  </>
                )}
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
                <NavLink to="/formGeneration" style={{ textDecoration: "none" }}>
                  <IconButton>
                    Add Questionnaire
                  </IconButton>
                </NavLink>
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
                <IconButton onClick={downloadFile}>
                  Export Data File
                </IconButton>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8} xs={12}>
            <PostList />
          </Col>
        </Row>
      </Container>

      {/* Update Project Modal */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formProjectName">
              <Form.Label>Project Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter project name" 
                value={projectData.name || ''} 
                onChange={(e) => setProjectData({ ...projectData, name: e.target.value })} 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProjectDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Enter project description" 
                value={projectData.description || ''} 
                onChange={(e) => setProjectData({ ...projectData, description: e.target.value })} 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProjectFile">
              <Form.Label>Upload Excel File</Form.Label>
              <Form.Control 
                type="file" 
                onChange={(e) => handleFileChange(e.target.files[0])} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateProject}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this project?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteProject}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default ConsultProject;
