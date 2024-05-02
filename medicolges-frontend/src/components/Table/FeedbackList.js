import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { FaInfoCircle, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Title from "../Title/Title";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";

const FeedbackList = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5); // Set the number of feedback items per page
  const [feedback, setFeedback] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState("");

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleShowDeleteModal = (feedbackId) => {
    setFeedbackToDelete(feedbackId);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/feedback/${feedbackToDelete}`
      );
      getFeedback();
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  const getFeedback = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/feedback/");
      setFeedback(response.data);
    } catch (error) {
      console.log("Error fetching feedback:", error);
    }
  };

  const handleChangePage = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    getFeedback();
  }, []);

  // Calculate indexes for pagination
  const indexOfLastFeedback = page * rowsPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - rowsPerPage;
  const currentFeedback = feedback.slice(indexOfFirstFeedback, indexOfLastFeedback);

  return (
    <>
      <div style={{ overflowX: "auto" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <Title fontWeight={600} title={"Title"} />
              </th>
              <th>
                <Title fontWeight={600} title={"Description"} />
              </th>
              <th>
                <Title fontWeight={600} title={"Rating"} />
              </th>
              <th>
                <Title fontWeight={600} title={"Action"} />
              </th>
            </tr>
          </thead>
          <tbody>
            {currentFeedback.map((row) => 
            row.isDeleted === false &&(
              <tr key={row.id}>
                <td>{row.title}</td>
                <td>{row.description}</td>
                <td>{row.rating}</td>
                <td>
                  <div style={{ display: "flex" }}>
                    <NavLink to={`/feedback/${row.id}`}>
                      <FaInfoCircle color="#0236be" />
                    </NavLink>
                    <FaTrash
                      color="#0236be"
                      onClick={() => handleShowDeleteModal(row._id)}
                      style={{ cursor: "pointer", marginLeft: "10px" }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <Pagination>
          <Pagination.Prev
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 1}
          />
          <Pagination.Item active={page === 1} onClick={() => handleChangePage(1)}>
            {1}
          </Pagination.Item>
          <Pagination.Next
            onClick={() => handleChangePage(page + 1)}
            disabled={currentFeedback.length < rowsPerPage}
          />
        </Pagination>
      </div>
      {/* Delete confirmation modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the feedback?</Modal.Body>
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
};

export default FeedbackList;
