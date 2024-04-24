import React, { useState } from "react";
import { Col, Modal, Button } from 'react-bootstrap';
import { FaArrowRight, FaDatabase, FaInfoCircle, FaTrash } from "react-icons/fa";
import axios from "axios";
import { NavLink } from "react-router-dom";
 import { DeleteIcon } from "@chakra-ui/icons";
 import { IconButton } from '@chakra-ui/react'

export default function ProjectCard({ project, onFollow }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/project/${project._id}`);
      handleCloseDeleteModal();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [following, setFollowing] = useState(
    project.followers && project.followers.includes(user?._id)
  );
  const [followersCount, setFollowersCount] = useState(project.numberFollowers);

  const truncateDescription = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  };

  const handleFollow = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/project/${project._id}/follow`,
        {
          userId: user._id,
        }
      );
      setFollowing(true);
      setFollowersCount((prevCount) => prevCount + 1);
      onFollow(response.data.project);
    } catch (error) {
      console.error("Error following project:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/project/${project._id}/unfollow`,
        {
          data: {
            userId: user._id,
          },
        }
      );
      setFollowing(false);
      setFollowersCount((prevCount) => Math.max(0, prevCount - 1));
      onFollow(response.data.project);
    } catch (error) {
      console.error("Error unfollowing project:", error);
    }
  };

  return (
    < >
     <tr>
      <th>{project.name}</th>
      <td>{project.description}</td>
      <td>{followersCount}</td>
      <td>
        <div className="d-flex justify-content-start">
                             <NavLink to={`/consultProject/${project._id}`}>
                              <FaInfoCircle color="#0236be" />
                            </NavLink>
                            <FaTrash
                              color="#0236be"
                              onClick={handleShowDeleteModal}
                              style={{ cursor: "pointer", marginLeft: "10px" }}
                            />
       
        </div>
          </td>
    </tr>
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
