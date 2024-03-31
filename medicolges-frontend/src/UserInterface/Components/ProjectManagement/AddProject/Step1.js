import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Badge } from "react-bootstrap";
import Title from "../../../../components/Title/Title";
import FileInput from "../../../../components/Input/FileInput";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../ProjectCard";
import axios from "axios";
import { FaArrowRight, FaTimes } from "react-icons/fa";
import IconButton from "../../../../components/Button/IconButton";

export default function Step1({ formDataProject, setformDataProject, onNext }) {
  const [touched, setTouched] = useState({
    name: false,
    description: false,
    organization: false,
  });
  const [organizations, setOrganizations] = useState([]);
  const [collaborativeInput, setCollaborativeInput] = useState("");
  const [selectedCollaborators, setSelectedCollaborators] = useState([]);
  const [selectedCollaboratorsId, setSelectedCollaboratorsId] = useState([]);
  const [collaboratives, setCollaboratives] = useState([]);
  const navigate = useNavigate();

  const handleBlur = (field) => {
    setTouched({
      ...touched,
      [field]: true,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformDataProject((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setformDataProject({
      ...formDataProject,
      file: e.target.files[0],
    });
  };

  const handleAddCollaborator = (collaborator, collaboratorId) => {
    if (!selectedCollaborators.includes(collaborator)) {
      setSelectedCollaborators([...selectedCollaborators, collaborator]);
      setSelectedCollaboratorsId([...selectedCollaboratorsId, collaboratorId]);
      setformDataProject((prevData) => ({
        ...prevData,
        collaboratives: Array.isArray(prevData.collaboratives)
          ? [...prevData.collaboratives, collaboratorId]
          : [collaboratorId],
      }));
      setCollaborativeInput("");
    }
  };

  const handleRemoveCollaborator = (collaborator, collaboratorId) => {
    const updatedCollaborators = selectedCollaborators.filter(
      (item) => item !== collaborator
    );
    const updatedCollaboratorsId = selectedCollaboratorsId.filter(
      (item) => item !== collaboratorId
    );
    setSelectedCollaborators(updatedCollaborators);
    setSelectedCollaboratorsId(updatedCollaboratorsId);

    // Update formDataProject to remove the collaborator's ID
    setformDataProject((prevData) => ({
      ...prevData,
      collaboratives: updatedCollaboratorsId,
    }));
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

    const fetchCollaboratives = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/getCollaborative"
        );
        setCollaboratives(response.data);
      } catch (error) {
        console.error("Error fetching collaborators:", error);
      }
    };

    fetchOrganizations();
    fetchCollaboratives();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    onNext(); // Call the onNext function passed from the parent component
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
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
                value={formDataProject.name}
                onChange={handleChange}
                onBlur={() => handleBlur("name")}
                required
                isInvalid={touched.name && formDataProject.name === ""}
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
                value={formDataProject.description}
                onChange={handleChange}
                onBlur={() => handleBlur("description")}
                required
                isInvalid={
                  touched.description && formDataProject.description === ""
                }
              />
              <Form.Control.Feedback type="invalid">
                Description is required.
              </Form.Control.Feedback>
            </div>
            <div className="mb-4">
              <Title
                secondTitle={"Collaborators"}
                fontSize={"18px"}
                fontWeight={600}
                className={"mb-2"}
              />
              <div className="mb-2">
                {selectedCollaborators.map((collaborator, index) => (
                  <Badge
                    key={index}
                    bg="secondary"
                    text="white"
                    style={{
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      marginRight: "5px",
                    }}
                  >
                    <span>{collaborator}</span>
                    <FaTimes
                      className="ms-1"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleRemoveCollaborator(
                          collaborator,
                          selectedCollaboratorsId[index]
                        )
                      }
                    />
                  </Badge>
                ))}
              </div>

              <Form.Control
                type="text"
                placeholder="Add Collaborators"
                className="rounded-pill mb-2"
                value={collaborativeInput}
                onChange={(e) => setCollaborativeInput(e.target.value)}
              />

              {collaborativeInput !== "" && (
                <div className="mt-2">
                  {collaboratives
                    .filter((collaborative) =>
                      collaborative.username
                        .toLowerCase()
                        .includes(collaborativeInput.toLowerCase())
                    )
                    .map(
                      (collaborative) =>
                        collaborative.isDeleted === false && (
                          <Badge
                            key={collaborative._id}
                            bg="primary"
                            text="white"
                            className="me-2 mb-2"
                            onClick={() =>
                              handleAddCollaborator(
                                collaborative.username,
                                collaborative._id
                              )
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {collaborative.username}
                          </Badge>
                        )
                    )}
                </div>
              )}
            </div>
          </Col>
          <Col md={4}>
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
                value={formDataProject.organization}
                onChange={handleChange}
                onBlur={() => handleBlur("organization")}
                style={{ borderRadius: "50px" }}
                required
                isInvalid={
                  touched.organization && formDataProject.organization === ""
                }
              >
                <option value="" hidden>
                  Select an organization
                </option>
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
          </Col>
          <Col
            md={4}
            className="d-flex justify-content-center justify-items-center justify-elements-center align-items-center"
          >
            <ProjectCard project={formDataProject} />
          </Col>
        </Row>
        <Row>
          <div
            class="flex"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <IconButton
              className="border-0 w-100"
              style={{
                background: `linear-gradient(-45deg, #1990aa 0%, #8ac2bb 100%)`,
                color: "white",
                fontSize: "16px",
                fontWeight: 600,
                padding: "8px 16px",
                borderRadius: "20px",
              }}
              onClick={onNext}
            >
              Next
            </IconButton>
          </div>
        </Row>
      </Form>
    </div>
  );
}
