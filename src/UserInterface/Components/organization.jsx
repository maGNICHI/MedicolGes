import React, { useState } from "react";
import axios from "axios";
import "../Dashboard/Dashboard.css";
function CreateOrganization() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [category, setCategory] = useState("Organization");
  const [type, setType] = useState("");
  const [errors, setErrors] = useState({});

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

    if (!category.trim()) {
      errors.category = "Category is required";
    }

    if (!type.trim()) {
      errors.type = "Type is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await axios.post("http://localhost:8000/api/organization/", {
          name,
          address,
          phoneNumber,
          category,
          type,
        });

        // Redirect or show success message
      } catch (error) {
        console.error("Error creating organization:", error);
        // Handle error
      }
    }
  };

  return (
    <div className="create-organization-container">
      <h2>Create Organization</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter organization name"
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter organization address"
          />
          {errors.address && (
            <div className="error-message">{errors.address}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter organization phone number"
          />
          {errors.phoneNumber && (
            <div className="error-message">{errors.phoneNumber}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Organization">Organization</option>
            <option value="Industry">Industry</option>
            <option value="Establishment">Establishment</option>
          </select>
          {errors.category && (
            <div className="error-message">{errors.category}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Enter organization type"
          />
          {errors.type && <div className="error-message">{errors.type}</div>}
        </div>
        <button type="submit" className="create-btn">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateOrganization;
