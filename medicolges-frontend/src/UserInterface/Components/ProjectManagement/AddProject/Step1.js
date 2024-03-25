import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Title from "../../../../components/Title/Title";
import FileInput from "../../../../components/Input/FileInput";
import { useNavigate } from "react-router-dom";
import ProjectCard from '../ProjectCard'
import axios from "axios";

export default function Step1({ formData, setFormData, onNext }) {
  const [showAlert, setShowAlert] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    description: false,
    organization: false,
  });
  const [organizations, setOrganizations] = useState([]);

  const handleBlur = (field) => {
    setTouched({
      ...touched,
      [field]: true,
    });
  };

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
          <Button type="submit" className="border-0 w-100">
            Next
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
