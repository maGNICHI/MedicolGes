import React, { useEffect, useState } from "react";
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
    file: null,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    description: false,
    organization: false,
  });
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleBlur = (field) => {
    setTouched({
      ...touched,
      [field]: true,
    });
  };

  const addProject = async () => {
    try {
      if (!formData.name || !formData.description || !formData.organization) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("organization", formData.organization);
      formDataToSend.append("file", formData.file);

      const response = await axios.post(
        "http://localhost:5000/api/project/addProject",
        formDataToSend
      );
      console.log(response.data);
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 5000); 
      navigate("/projectList");
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/organization/"
        );
        setOrganizations(response.data);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    fetchOrganizations();
  }, []);

  return (
    <Layout selectedName={selectedName}>
      <Container fluid className="my-8" style={{ height: "screen" }}>
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
                {showAlert && (
                  <div className="alert alert-danger" role="alert">
                    Please fill in all required fields.
                  </div>
                )}
                {showNotification && (
                  <div className="alert alert-success" role="alert">
                    Project added successfully.
                  </div>
                )}
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
                      onBlur={() => handleBlur("name")}
                      required
                      isInvalid={touched.name && formData.name === ""}
                    />
                    <Form.Control.Feedback type="invalid">
                      Project name is required.
                    </Form.Control.Feedback>
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
                      onBlur={() => handleBlur("description")}
                      required
                      isInvalid={
                        touched.description && formData.description === ""
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      Description is required.
                    </Form.Control.Feedback>
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
                      onBlur={() => handleBlur("organization")}
                      style={{ borderRadius: "50px" }}
                      required
                      isInvalid={
                        touched.organization && formData.organization === ""
                      }
                    >
                      {/* Conditionally render "Select an organization" option */}
                      {formData.organization === "" && (
                        <option value="" disabled hidden>
                          Select an organization
                        </option>
                      )}
                      {/* Render organization options */}
                      {organizations.map((organization) => (
                        <option key={organization._id} value={organization._id}>
                          {organization.name}
                        </option>
                      ))}
                    </Form.Select>

                    <Form.Control.Feedback type="invalid">
                      Please select an organization.
                    </Form.Control.Feedback>
                  </div>
                  <div className="mb-4">
                    <Title
                      secondTitle={"Upload Excel File"}
                      fontSize={"18px"}
                      fontWeight={600}
                      className={"mb-2"}
                    />
                    <FileInput onChange={handleFileChange} />
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
