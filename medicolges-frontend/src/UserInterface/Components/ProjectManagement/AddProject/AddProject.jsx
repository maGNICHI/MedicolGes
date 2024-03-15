import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Title from "../../../../components/Title/Title";
import IconButton from "../../../../components/Button/IconButton";
import ProjectCard from "../ProjectCard";
import axios from "axios";
import FileInput from "../../../../components/Input/FileInput";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar";
import Footer from "../../Footer";

export default function AddProject() {
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
      }, 5000); // 5 seconds
      navigate("/projects");
    } catch (error) {
      console.error("Error adding project:", error);
      // Handle the error here
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
    <div className="home-section">
      <Navbar />
      <div className="contentUser">
        <div className="container-fluid mt20 mb-5">
          <div className="row pl-10 mb-10">
            <h3 className="info-title pt-20">
              <span>Create New Project</span>
            </h3>
          </div>
          <div className="row pb-24 px-10">
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
              <Row className="mb-6">
                <Col md={4}>
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
                </Col>
                <Col md={4}>
                  <div className="mb-4">
                    <Title
                      secondTitle={"Upload Excel File"}
                      fontSize={"18px"}
                      fontWeight={600}
                      className={"mb-2"}
                    />
                    <FileInput onChange={handleFileChange} />
                  </div>
                </Col>
                <Col md={4}>
                  <ProjectCard project={formData} />
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col xs={6} md={4}>
                  <IconButton
                    className="border-0 w-100"
                    style={{
                      background:
                        "linear-gradient(-45deg, #3615e7 0%, #44a2f6 100%)",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: 600,
                      padding: "8px 16px",
                      borderRadius: "20px",
                    }}
                  >
                    Generate Form
                  </IconButton>
                </Col>
                <Col xs={6} md={4}>
                  <IconButton
                    className="border-0 w-100 mt-3 mt-md-0"
                    style={{
                      background:
                        "linear-gradient(-45deg, #3615e7 0%, #44a2f6 100%)",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: 600,
                      padding: "8px 16px",
                      borderRadius: "20px",
                    }}
                    onClick={addProject}
                  >
                    Add Project
                  </IconButton>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
