import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { deleteForm } from "../../../../Dashboard/Dashboard/compnents/api";
import { useNavigate } from "react-router-dom";
import IconButton from "../../../../components/Button/IconButton";

export default function Step3({ formDataProject, onNext }) {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  const addProject = async (e) => {
    e.preventDefault(); // Prevent default form submission

    console.log("🚀 ~ addProject ~ formDataProject:", formDataProject)
    try {
      const formData = new FormData();
      formData.append('name', formDataProject.name);
      formData.append('description', formDataProject.description);
      formData.append('creator', formDataProject.creator);
      formData.append('organization', formDataProject.organization);
      formData.append('form', formDataProject.form);
      formData.append('file', formDataProject.file);
      const response = await axios.post(
        "http://localhost:5000/api/project/addProject" 
        , formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      console.log(response.data);
      navigate(`/projects/consult/${response.data.success.project._id}`) // Call the onNext function passed from the parent component
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleDeleteForm = (id) => {
    deleteForm(id)
      .then((response) => {
        console.log(response.data); // Afficher le message de suppression
        // Mettre à jour l'état local en supprimant le formulaire avec l'ID donné
        setForms(forms.filter((form) => form._id !== id));
        navigate("/projects");
      })
      .catch((error) => {
        console.error(error);
        // Gérer les erreurs si nécessaire
      });
  };

  return (
    <Container className="card shadow-lg p-3">
      <Row className="text-center  d-flex justify-items-center justify-content-center justify-elements-center">
        <p>
          Are you sure you want to create this project called "
          {formDataProject.name}"?
        </p>
      </Row>
      <Row className="d-flex justify-items-center justify-content-center justify-elements-center">
        <Col md={1}>
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
              onClick={() => handleDeleteForm(formDataProject.form)}
            >
              Cancel
            </IconButton>
          </div>
        </Col>
        <Col md={1}>
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
              onClick={addProject}
            >
              Finish
            </IconButton>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
