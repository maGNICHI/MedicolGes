import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { deleteForm } from "../../../../Dashboard/Dashboard/compnents/api";
import { useNavigate } from "react-router-dom";

export default function Step3({ formDataProject, onNext }) {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  const addProject = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/project/addProject",
        formDataProject
      );
      console.log(response.data);
      onNext(); // Call the onNext function passed from the parent component
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
