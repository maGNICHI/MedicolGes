import React, { useEffect, useState } from "react";
import "./ListProject.css";
import Navbar from "../Navbar";
import { FaPlus, FaSearch } from "react-icons/fa";
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
  const navigate = useNavigate();
  const handleShowAddModal = () => navigate("/projects/add");
  const [searchTerm, setSearchTerm] = useState("");
  const [goUp, setGoUp] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

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

  const handleChange = (e) => {
    setSearchTerm(e.target.value); // Update search term state
  };

  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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

  // Filter projects based on search term
  const filteredProjects = projects.filter((project) => {
    return (
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Calculate indexes for pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  // Generate pagination items
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredProjects.length / projectsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className="home-section">
      <Navbar />
      <div className="contentUser" style={{ height: "100%" }}>
        <div className="container-fluid mb-5">
          <div className="row pt-10 mb-10">
            <div className="col-md-7 col-xs-12">
              <h3 className="info-title ml-10">
                <span>Our Projects</span>
              </h3>
            </div>
            <div className="col-md-2 col-xs-5 mt-3">
              <div className="input-wrapper">
                <input
                  type="text"
                  name="text"
                  className="input"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleChange}
                />
                <FaSearch
                  className="search-icon -ml-12"
                  color="white"
                  style={{ zIndex: 2 }}
                />
              </div>
            </div>
            <div className="col-md-2 col-xs-7 mt-3">
              <IconButton
                className="border-0 w-100"
                style={{
                  background: `linear-gradient(-45deg, #1990aa 0%, #8ac2bb 100%)`,
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 600,
                  padding: "8px 16px",
                  borderRadius: "20px",
                }}
                onClick={handleShowAddModal}
                startIcon={<FaPlus />}
              >
                Add New Project
              </IconButton>
            </div>
          </div>
          <div className="row pb-24">
            {currentProjects.map((item) => (
              <Col key={item._id} xs={12} md={4} className="mb-3">
                <ProjectCard project={item} />
              </Col>
            ))}
          </div>
          <div className="pagination-container">
            <ul className="pagination">
              {pageNumbers.map((number) => (
                <li
                  key={number}
                  className={`page-item ${
                    number === currentPage ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePaginate(number)}
                  >
                    {number}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div onClick={scrollToTop}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
      <Footer />
    </div>
  );
}
