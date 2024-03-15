import React, { useState } from 'react';
import './ProjectCard.css';
import IconButton from '../Button/IconButton';
import { Col, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

export default function ProjectCard({ project }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/project/${project._id}`);
      handleCloseDeleteModal();
      window.location.reload();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  };

  return (
    <>
      <Col xs={12} className="project-card"> {/* Remove md={4} */}
        <div className="project-top-section">
          <div className="project-border"></div>
          <div className="project-icons">
            <div className="project-logo"></div>
          </div>
        </div>
        <div className="project-bottom-section">
          <span className="project-title">{project.name}</span>
          <div className="project-row row1">
            <div className="project-item">
              <span className="project-big-text">Description</span>
              <span className="project-regular-text inline-content">{truncateDescription(project.description, 350)}</span>
            </div>
          </div>
          <div className="project-row row1">
            <div className="project-item">
              <span className="project-big-text"><NavLink
                    to={`/consultProject/${project._id}`}
                    style={{ textDecoration: "none" }}
                  >Click Here To Consult Project </NavLink></span>
            </div>
            <div className="project-item">
              <span className="project-big-text">{project.numberFollowers}</span>
              <span className="project-regular-text">Followers</span>
            </div>
          </div>
          <div className="project-row row2">
            <div className="project-item flex justify-items-center justify-content-center">
              <span>
                <IconButton
                  style={{ background: "linear-gradient(45deg, rgb(4, 159, 187) 0%, rgb(80, 246, 255) 100%)", color: "white" }}
                  onClick={handleShowDeleteModal}
                >
                  Delete
                </IconButton>
              </span>
            </div>
          </div>
        </div>
      </Col>

      {/* Delete confirmation modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the project?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
