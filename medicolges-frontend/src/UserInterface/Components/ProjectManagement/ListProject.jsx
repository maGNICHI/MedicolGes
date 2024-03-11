import React, { useEffect, useState } from "react";
import "./ListProject.css";
import Navbar from "../Navbar";
import { FaSearch } from "react-icons/fa";
import ProjectCard from "./ProjectCard";
import axios from "axios";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import Title from "../../../components/Title/Title";
import FileInput from "../../../components/Input/FileInput";
import IconButton from "../../../components/Button/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";

export default function ListProject() {
  const [projects, setProjects] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(""); // State to track selected theme
  const navigate=useNavigate();

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => navigate("/projects/add");

  const [goUp, setGoUp] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    organization: "",
    file: null, // Add image field to formData state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    // Set the image file in formData
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const addProject = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("organization", formData.organization);
      formDataToSend.append("file", formData.file);

      const response = await axios.post(
        "http://localhost:5000/api/project/addProject",
        formDataToSend
      );
      console.log(response.data);
      handleCloseAddModal();
      window.location.reload();
    } catch (error) {
      console.error("Error adding project:", error);
      // Handle the error here, such as displaying a toast or error message to the user
    }
  };

  const getProjects = async () => {
    try {
      const data = await axios.get("http://localhost:5000/api/project/");
      console.log(data.data);
      setProjects(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    getProjects();
    const onPageScroll = () => {
      if (window.scrollY > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  // Function to handle theme selection
  const handleThemeSelection = (theme) => {
    setSelectedTheme(theme);
  };

  return (
    <div className="home-section">
      <Navbar />
      <div className="contentUser" style={{ height: "100%" }}>
        <div className="container-fluid mb-5">
          <div className="row pt-20 mb-10">
            <div className="col-md-7 col-xs-12">
              <h3 className="info-title ml-10">
                <span>Our Projects</span>
              </h3>
            </div>
            <div className="col-md-2 col-xs-6">
              <button
                className="button type1"
                onClick={handleShowAddModal}
              >
                <span className="btn-txt">Add New Project</span>
              </button>
            </div>
            <div className="col-md-2 col-xs-6">
              <div className="input-wrapper">
                <input
                  type="text"
                  name="text"
                  className="input"
                  placeholder="search.."
                />
                <FaSearch
                  className="search-icon -ml-12"
                  color="white"
                  style={{ zIndex: 2 }}
                />
              </div>
            </div>
          </div>
          <div className="row pb-24">
            {projects.map(
              (item) =>
                item.isDeleted === false && (
                  <Col key={item._id} xs={12} md={4} className="mb-3">
                    <ProjectCard project={item} theme={selectedTheme} /> {/* Pass selected theme as prop */}
                  </Col>
                )
            )}
          </div>
        </div>
      </div>

      <div
        onClick={scrollToTop}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
      <Footer />
    </div>
  );
}
