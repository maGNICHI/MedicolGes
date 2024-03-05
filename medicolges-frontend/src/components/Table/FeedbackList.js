import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Paper,
  Checkbox,
} from "@mui/material";
import { FaInfoCircle, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Title from "../Title/Title";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

const FeedbackList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [feedback, setFeedback] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState("");

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleShowDeleteModal = (feedbackId) => {
    setFeedbackToDelete(feedbackId); // Set the ID of the feedback to delete
    setShowDeleteModal(true); // Show the delete modal
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3001/api/feedback/${feedbackToDelete}`
      );
      setFeedback(feedback.filter((item) => item.id !== feedbackToDelete));
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  const getFeedback = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/feedback/");
      setFeedback(response.data);
    } catch (error) {
      console.log("Error fetching feedback:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getFeedback();
  }, []);

  return (
    <Paper>
      <div style={{ overflowX: "auto", maxWidth: "200px", minWidth: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <Title fontWeight={600} title={"Username"} />
              </TableCell>
              <TableCell>
                <Title fontWeight={600} title={"Title"} />
              </TableCell>
              <TableCell>
                <Title fontWeight={600} title={"Description"} />
              </TableCell>
              <TableCell>
                <Title fontWeight={600} title={"Rating"} />
              </TableCell>
              <TableCell>
                <Title fontWeight={600} title={"Project"} />
              </TableCell>
              <TableCell>
                <Title fontWeight={600} title={"Action"} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedback &&
              feedback
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(
                  (row, index) =>
                    row.isDeleted === false && (
                      <TableRow key={index}>
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell>{row.title}</TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell>{row.rating}</TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                          <div className="flex gap-3">
                            <NavLink>
                              <FaTrash
                                color="#0236be"
                                onClick={() => handleShowDeleteModal(row._id)}
                              />
                            </NavLink>
                            <NavLink>
                              <FaInfoCircle color="#0236be" />
                            </NavLink>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                )}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={feedback ? feedback.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
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
    </Paper>
  );
};

export default FeedbackList;
