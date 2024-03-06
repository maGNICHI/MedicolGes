import React, { useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import "../../Dashboard/Dashboard.css";
import axios from "axios";
import Layout from "../../SuperAdminLayout/Layout";
import Title from "../../../components/Title/Title";
import IconButton from "../../../components/Button/IconButton";
import FileInput from "../../../components/Input/FileInput";
import ProjectCard from "../../../components/Cards/ProjectCard";
import { useNavigate } from "react-router-dom";

export default function AddProject() {
  const [selectedName, setSelectedName] = useState("Project Management");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    organization: "",
    file: null, // Add image field to formData state
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    // Set the image file in formData
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const addProject = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("organization", formData.organization);
      formDataToSend.append("file", formData.file);
  
      const response = await axios.post("http://localhost:5000/api/project/addProject", formDataToSend);
      console.log(response.data);
      navigate("/projectList");
    } catch (error) {
      console.error("Error adding project:", error);
      // Handle the error here, such as displaying a toast or error message to the user
    }
  };
  

  return (
    <Layout selectedName={selectedName}>
      <Container
        fluid
        className="my-8 h-screen"
        style={{ overflow: "auto", maxHeight: "150%", zIndex: 0 }}
      >
        <Card className="card mx-3 -mr-3">
          <Card.Body
            style={{
              backgroundColor: "#ffffffa9",
              padding: "30px",
              borderRadius: "20px",
            }}
          >
            <Row className="align-items-center mb-2">
              <Col xs={12} md={12}>
                <Title
                  title={"Project List"}
                  fontWeight={600}
                  fontSize={"24px"}
                />
                <hr />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form>
                  <div className="mb-4">
                    <Title
                      secondTitle={"Name"}
                      fontSize={"18px"}
                      fontWeight={600}
                      className={"mb-2"}
                    />
                    <Form.Control
                      type="text"
                      placeholder="Enter Project Name"
                      className="rounded-pill"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <Title
                      secondTitle={"Description"}
                      fontSize={"18px"}
                      fontWeight={600}
                      className={"mb-2"}
                    />
                    <Form.Control
                      as="textarea"
                      placeholder="Enter a Description"
                      className="rounded-pill"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <Title
                      secondTitle={"Upload Excel File"}
                      fontSize={"18px"}
                      fontWeight={600}
                      className={"mb-2"}
                    />
                    <FileInput onChange={handleFileChange} /> {/* Pass handleFileChange function */}
                  </div>
                  <div className="mb-4">
                    <Title
                      secondTitle={"Organization"}
                      fontSize={"18px"}
                      fontWeight={600}
                      className={"mb-2"}
                    />
                    <Form.Select
                      placeholder="Select an Organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                    >
                      <option></option>
                    </Form.Select>
                  </div>

                  <div className="d-flex justify-content-between">
                    <IconButton
                      className="border-0"
                      style={{
                        background:
                          "linear-gradient(45deg, rgb(4, 159, 187) 0%, rgb(80, 246, 255) 100%)",
                        color: "white",
                        fontSize: "16px",
                        fontWeight: 600,
                        padding: "8px 16px",
                        borderRadius: "20px",
                      }}
                      size="lg"
                    >
                      Generate Form
                    </IconButton>

                    <IconButton
                      className="border-0"
                      style={{
                        background:
                          "linear-gradient(45deg, rgb(4, 159, 187) 0%, rgb(80, 246, 255) 100%)",
                        color: "white",
                        fontSize: "16px",
                        fontWeight: 600,
                        padding: "8px 16px",
                        borderRadius: "20px",
                      }}
                      size="lg"
                      onClick={addProject} // Pass the function itself, not the result of calling it
                    >
                      Add Project
                    </IconButton>
                  </div>
                </Form>
              </Col>
              <Col xs={12} md={6}>
                <ProjectCard project={formData} />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
}
