import React, { useEffect, useState } from "react";
import { Table, Pagination, Button, Modal, Form } from "react-bootstrap"; // Import Form from react-bootstrap
import { FaInfoCircle, FaPen, FaShower, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Title from "../Title/Title";
import axios from "axios";

const OrganizationTable = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [organizations, setOrganizations] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [organizationToDelete, setOrganizationToDelete] = useState("");

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleShowDeleteModal = (organizationId) => {
    setOrganizationToDelete(organizationId); // Set the ID of the organization to delete
    setShowDeleteModal(true); // Show the delete modal
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/organization/${organizationToDelete}`
      );
      setOrganizations(organizations.filter((org) => org.id !== organizationToDelete));
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting organization:", error);
    }
  };

  const handleChangePage = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
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
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>
              <Title fontWeight={600} title={"Name"} />
            </th>
            <th>
              <Title fontWeight={600} title={"Address"} />
            </th>
            <th>
              <Title fontWeight={600} title={"Phone Number"} />
            </th>
            <th>
              <Title fontWeight={600} title={"Category"} />
            </th>
            <th>
              <Title fontWeight={600} title={"Type"} />
            </th>
            <th>
              <Title fontWeight={600} title={"Action"} />
            </th>
          </tr>
        </thead>
        <tbody>
          {organizations &&
            organizations
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((organization, index) => (
                <tr key={index}>
                  <td>
                    <Form.Check type="checkbox" /> {/* Use Form.Check for checkbox */}
                  </td>
                  <td>{organization.name}</td>
                  <td>{organization.address}</td>
                  <td>{organization.phoneNumber}</td>
                  <td>{organization.category}</td>
                  <td>{organization.type}</td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <NavLink>
                        <FaTrash
                          color="#0236be"
                          onClick={() => handleShowDeleteModal(organization.id)}
                        />
                      </NavLink>
                      <NavLink className={"mx-4"}>
                        <FaPen color="#0236be" />
                      </NavLink>
                      <NavLink>
                        <FaInfoCircle color="#0236be" />
                      </NavLink>
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center mt-3">
        <Pagination>
          <Pagination.Prev />
          <Pagination.Item>{page}</Pagination.Item>
          <Pagination.Next />
        </Pagination>
      </div>
      {/* Delete confirmation modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the organization?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrganizationTable;
