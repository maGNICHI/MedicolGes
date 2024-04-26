import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  Col,
  Container,
  Row,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import {
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaBuilding,
  FaIndustry,
} from "react-icons/fa"; // Importing necessary icons
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

function CreateOrganization() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [category, setCategory] = useState("Organization");
  const [type, setType] = useState("");
  const [otherCategory, setOtherCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [otherType, setOtherType] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!address.trim()) {
      errors.address = "Address is required";
    }

    if (!phoneNumber.trim()) {
      errors.phoneNumber = "Phone Number is required";
    } else if (!/^\d+$/.test(phoneNumber)) {
      errors.phoneNumber = "Phone Number must contain only digits";
    }

    if (!type.trim()) {
      errors.type = "Type is required";
    }

    if (category === "Other" && !otherCategory.trim()) {
      errors.otherCategory = "Other Category is required";
    }

    if (type === "other" && !otherType.trim()) {
      errors.otherType = "Other Type is required";
    }
    setErrors(errors);
    console.log( Object.keys(errors).length );
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("🚀 ~ handleSubmit ~ validateForm:", validateForm())
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("address", address);
        formData.append("phoneNumber", phoneNumber);
        formData.append("category", otherCategory || category);
        formData.append("type", otherType || type);

        for (const image of selectedImages) {
          formData.append("media", image);
        }

        await axios.post("http://localhost:5000/api/organization/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        navigate('/organizationShow');
      } catch (error) {
        console.error("Error creating organization:", error);
      }
    }
  };

  const handleImageChange = (e) => {
    setSelectedImages([...e.target.files]);
  };

  return (
    <>
      <Navbar />
      <Container fluid className="mt-24 h-screen">
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Card className="card">
              <Card.Body>
                <h2 class=" text-2xl font-bold text-gray-800 mb-4">
                  Create Organization
                </h2>
                <Form onSubmit={handleSubmit}>
                  {Object.keys(errors).length > 0 && (
                    <Alert variant="danger">
                      Please fix the following errors:
                      <ul>
                        {Object.values(errors).map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </Alert>
                  )}
                  <Form.Group >
                    <Form.Label className="d-flex align-items-center pt-3" >
                      <FaUser className="me-2"/> Name:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter organization name"
                      className={`rounded-pill ${
                        errors.name ? "is-invalid" : ""
                      }`}
                    />
                    {errors.name && (
                      <Form.Text className="text-danger">
                        {errors.name}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="d-flex align-items-center pt-3">
                      <FaMapMarkerAlt className="me-2"/> Address:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter organization address"
                      className={`rounded-pill ${
                        errors.address ? "is-invalid" : ""
                      }`}
                    />
                    {errors.address && (
                      <Form.Text className="text-danger">
                        {errors.address}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="d-flex align-items-center pt-3">
                      <FaPhone  className="me-2" /> Phone Number:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter organization phone number"
                      className={`rounded-pill ${
                        errors.phoneNumber ? "is-invalid" : ""
                      }`}
                    />
                    {errors.phoneNumber && (
                      <Form.Text className="text-danger">
                        {errors.phoneNumber}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="d-flex align-items-center pt-3">
                      <FaBuilding className="me-2"/> Category:
                    </Form.Label>
                    <Form.Control
                      as="select"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="rounded-pill"
                    >
                      <option value="Organization">Organization</option>
                      <option value="Industry">Industry</option>
                      <option value="Establishment">Establishment</option>
                      <option value="Other">Other</option>
                    </Form.Control>
                    {/* Render input for other category if category is Other */}
                    {category === "Other" && (
                      <Form.Control
                        type="text"
                        value={otherCategory}
                        onChange={(e) => setOtherCategory(e.target.value)}
                        placeholder="Enter other category"
                        className={`rounded-pill mt-2 ${
                          errors.otherCategory ? "is-invalid" : ""
                        }`}
                      />
                    )}
                    {/* Display error message if other category is invalid */}
                    {errors.otherCategory && category === "Other" && (
                      <Form.Text className="text-danger">
                        {errors.otherCategory}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="d-flex align-items-center pt-3">
                      <FaIndustry className="me-2 "/> Type:
                    </Form.Label>
                    <Form.Control
                      as="select"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="rounded-pill"
                    >
                      <option value="">choose</option>
                      <option value="hospitals">Hospitals</option>
                      <option value="clinics">Clinics</option>
                      <option value="diagnostic centers">
                        Diagnostic Centers
                      </option>
                      <option value="laboratoiries">Laboratories</option>
                      <option value="medical organizations">
                        Medical Organizations
                      </option>
                      <option value="other">Other</option>
                    </Form.Control>
                    {/* Render input for other type if type is Other */}
                    {type === "other" && (
                      <Form.Control
                        type="text"
                        value={otherType}
                        onChange={(e) => setOtherType(e.target.value)}
                        placeholder="Enter other type"
                        className={`rounded-pill mt-2 ${
                          errors.otherType ? "is-invalid" : ""
                        }`}
                      />
                    )}
                    {/* Display error message if other type is invalid */}
                    {errors.otherType && type === "other" && (
                      <Form.Text className="text-danger">
                        {errors.otherType}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group >
                    <Form.Label className="d-flex align-items-center pt-3">
                      Upload Images:{" "}
                      {/* Ajouter une étiquette pour les images */}
                    </Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*" // Accepter uniquement les fichiers image
                      onChange={handleImageChange}
                      multiple // Permettre la sélection de plusieurs fichiers
                    />
                  </Form.Group>
                  <div className="d-flex">
                  <div className="ms-auto">
                    <button
                    className="btn-create mt-3"
                       type="submit"
                    >
                      Create
                    </button>
                  </div>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CreateOrganization;
