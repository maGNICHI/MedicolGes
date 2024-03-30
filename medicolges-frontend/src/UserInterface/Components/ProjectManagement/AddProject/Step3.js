import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { deleteForm } from "../../../../Dashboard/Dashboard/compnents/api";
import { useNavigate } from "react-router-dom";

export default function Step3({ formDataProject, onNext }) {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  const addProject = async () => {
    try {
      const formData = new FormData();
      formData.append("name", formDataProject.name);
      formData.append("description", formDataProject.description);
      formData.append("organization", formDataProject.organization);
      formData.append("file", formDataProject.file); // Append the file to FormData
      formData.append("form", formDataProject.form);

      const response = await axios.post(
        "http://localhost:5000/api/project/addProject",
        formData, // Send FormData instead of formDataProject directly
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
          },
        }
      );
      console.log(response.data);
      onNext();
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };
  const handleDeleteForm = (id) => {
    deleteForm(id)
      .then(response => {
        console.log(response.data); // Afficher le message de suppression
        // Mettre à jour l'état local en supprimant le formulaire avec l'ID donné
        setForms(forms.filter(form => form._id !== id));
        navigate('/projects');

      })
      .catch(error => {
        console.error(error);
        // Gérer les erreurs si nécessaire
      });
  };

  return (
    <div>
      <h2>Step 3</h2>
      <p>Are you sure you want to create the project?</p>
      <Button variant="primary" className="me-3" onClick={addProject}>
        Finish
      </Button>
      <Button variant="secondary" onClick={() => handleDeleteForm(formDataProject.form)}>
        Cancel
      </Button>
    </div>
  );
}
