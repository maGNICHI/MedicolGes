import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  NavLink,
  Row,
} from "react-bootstrap";
import Title from "../../../../components/Title/Title";
import IconButton from "../../../../components/Button/IconButton";
import { FaDownload, FaPlus, FaShareAlt, FaTrash } from "react-icons/fa";
import axios from "axios";
import {
  fetchForm,
  fetchFormById,
} from "../../../../Dashboard/Dashboard/compnents/api";
import { useNavigate } from "react-router-dom";

export default function Details({ projectData, organization }) {
  const [showShareFeedBackModal, setShowShareFeedBackModal] = useState(false);
  const [emails, setEmails] = useState([""]);
  const [form, setForm] = useState({});
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCloseShareFeedBackModal = () => setShowShareFeedBackModal(false);
  const handleShowShareFeedBackModal = () => {
    setEmails([""]);
    setShowShareFeedBackModal(true);
    openFormInBrowser(projectData.form);
  };

  const addEmailInput = () => {
    setEmails([...emails, ""]);
  };

  const removeEmailInput = (index) => {
    const updatedEmails = [...emails];
    updatedEmails.splice(index, 1);
    setEmails(updatedEmails);
  };

  const handleEmailChange = (index, value) => {
    const updatedEmails = [...emails];
    updatedEmails[index] = value;
    setEmails(updatedEmails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5000/api/project/shareProject/${projectData._id}`,
        { emails }
      );
      handleCloseShareFeedBackModal();
    } catch (error) {
      console.error("Error sharing project:", error);
    }
  };

  const downloadFile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/project/download/${projectData.file}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", projectData.file);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const openFormInBrowser = async (formId) => {
    try {
      setLoading(true);
      const formData = await fetchFormById(formId);
      const link = `http://localhost:3000/afficheId/${formId}`;
      setLink(link);
    } catch (error) {
      console.error("Erreur lors de la récupération du formulaire:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
  };

  useEffect(() => {
    fetchForm()
      .then((res) => {
        const forms = res.data;
        const projectForm = forms.find((f) => f._id === projectData.form);
        setForm(projectForm);
      })
      .catch((error) => {
        console.error("Error fetching forms:", error);
      });
  }, [projectData.form]);

  const save = (form) => {
    navigate("/addResponse", {
      state: {
        case: "create",
        formData: {
          _id: form._id,
          name: form.name,
          questions: JSON.parse(form.questions),
        },
      },
    }); // Redirige vers la page ajouterForm
  };

  return (
    <Card className="mt-5 mx-1 px-4 py-3" style={{ background: "#8ac2bb4d" }}>
      <Row>
        <Col md={9} xs={12}>
          <Title
            title={`This Project Is Created Under The Organization "${organization.name}"`}
            fontWeight={600}
            fontSize={"20px"}
            className={"text-center"}
          />
          <br />
          <br />
          <div className="details-item">
            <Title
              title={"This Project Is Created By: "}
              fontWeight={600}
              fontSize={"16px"}
              className="inline-title"
            />
            <p className="inline-content">{projectData.creator}</p>
          </div>
          {projectData.collaboratives && (
            <div className="details-item">
              <Title
                title={"In A Collaboration With: "}
                fontWeight={600}
                fontSize={"16px"}
                className="inline-title"
              />
              <p className="inline-content">{projectData.collaboratives}</p>
            </div>
          )}
          <div className="details-item"></div>
          <div className="details-item">
            <Title
              title={"Address Of The Organization: "}
              fontWeight={600}
              fontSize={"16px"}
              className="inline-title"
            />
            <p className="inline-content">{organization.address}</p>
          </div>
          <div className="details-item">
            <Title
              title={"The Organization Contact: "}
              fontWeight={600}
              fontSize={"16px"}
              className="inline-title"
            />
            <p className="inline-content">{organization.phoneNumber}</p>
          </div>
          <hr />
        </Col>
        <Col md={3} className="d-none d-md-block">
          <img src={organization.image} alt="organization" />
        </Col>
      </Row>
      <Row className="mb-5">
        <div>
          <Title
            title={"Description Of The Project: "}
            fontWeight={600}
            fontSize={"16px"}
            className="inline-title"
          />
          <p className="inline-content">{projectData.description}</p>
        </div>
      </Row>
      <Row className="justify-content-center">
        <Col xs={4} md={4}>
          <IconButton
            className="border-0 w-100"
            style={{
              background: "linear-gradient(-45deg, #1990aa 0%, #8ac2bb 100%)",
              color: "white",
              fontSize: "16px",
              fontWeight: 600,
              padding: "8px 16px",
              borderRadius: "20px",
            }}
            endIcon={<FaDownload />}
            onClick={downloadFile}
          >
            Download Data
          </IconButton>
        </Col>
        <Col xs={4} md={4}>
          <IconButton
            className="border-0 w-100 mt-3 mt-md-0"
            style={{
              background: "linear-gradient(-45deg, #1990aa 0%, #8ac2bb 100%)",
              color: "white",
              fontSize: "16px",
              fontWeight: 600,
              padding: "8px 16px",
              borderRadius: "20px",
            }}
            onClick={() => {
              save(form);
            }}
          >
            Answer Questionnaire
          </IconButton>
        </Col>
        <Col xs={4} md={4}>
          <IconButton
            className="border-0 w-100 mt-3 mt-md-0"
            style={{
              background: "linear-gradient(-45deg, #1990aa 0%, #8ac2bb 100%)",
              color: "white",
              fontSize: "16px",
              fontWeight: 600,
              padding: "8px 16px",
              borderRadius: "20px",
            }}
            startIcon={<FaShareAlt />}
            onClick={handleShowShareFeedBackModal}
          >
            Share Project
          </IconButton>
        </Col>
      </Row>
      <Modal
        show={showShareFeedBackModal}
        onHide={handleCloseShareFeedBackModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Share Project</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {/* Existing User */}
            <Form.Group>
              <Form.Label>If you want to copy the url of the form</Form.Label>
              <p>{link}</p>
              <Button onClick={handleCopy} disabled={copied} className=" -pt-1 mb-1">
                {copied ? "Copié !" : "Copier le lien"}
              </Button>
            </Form.Group>
            <Form.Group controlId="formExistingUser">
              <Form.Label>Choose user</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter an existing user in our web application"
              />
            </Form.Group>
            <hr />
            <p>
              If you want to share the project with an external user, send an
              invitation via email
            </p>
            <Form.Group controlId="formExternalUsers">
              <Form.Label>External Users</Form.Label>
              {emails.map((email, index) => (
                <div key={index} className="d-flex mb-2">
                  <Form.Control
                    type="email"
                    placeholder="Enter Email @gmail.com"
                    className="mr-2"
                    value={email}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                  />
                  {/* Show plus button for last input, delete button for others */}
                  {index === emails.length - 1 ? (
                    <Button
                      onClick={addEmailInput}
                      style={{
                        borderRadius: "50px",
                        background:
                          "linear-gradient(-45deg, #3615e7 0%, #44a2f6 100%)",
                      }}
                    >
                      <FaPlus />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => removeEmailInput(index)}
                      style={{
                        borderRadius: "50px",
                        background:
                          "linear-gradient(-45deg, #3615e7 0%, #44a2f6 100%)",
                      }}
                    >
                      {" "}
                      <FaTrash />{" "}
                    </Button>
                  )}
                </div>
              ))}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseShareFeedBackModal}>
              Cancel
            </Button>
            <Button type="submit" variant="secondary">
              Share
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Card>
  );
}
