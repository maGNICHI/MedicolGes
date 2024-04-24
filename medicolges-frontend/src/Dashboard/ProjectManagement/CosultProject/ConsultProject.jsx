import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import Layout from "../../SuperAdminLayout/Layout";
import Title from "../../../components/Title/Title";
import axios from "axios";
import { NavLink, useLocation, useParams } from "react-router-dom";
import IconButton from "../../../components/Button/IconButton";
import PostList from "../../../UserInterface/Components/Post/PostList";
import Feed from "../../../UserInterface/Components/PostNew/feed/feed";
import Feedback from "../../../UserInterface/Components/ProjectManagement/ConsultProject/Feedback";
import Questionnaire from "../../../UserInterface/Components/Questionnaire/Questionnaire";
import Details from "../../../UserInterface/Components/ProjectManagement/ConsultProject/Details";
import { FaDatabase } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

function ConsultProject({onFollow}) {
  const [selectedName, setSelectedName] = useState("Consult Project");
  const [projectData, setProjectData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [organizationId, setOrganizationId] = useState({});
  const [posts, setPosts] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [showDetails, setShowDetails] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false); // State for showing Feedback component
  const [showPosts, setShowPosts] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [goUp, setGoUp] = useState(false);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [following, setFollowing] = useState(false);
  const location = useLocation();
   const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/project/${id}`
        );
        setProjectData(response.data.success.project);
        setFollowing(projectData?.followers?.includes(user?._id));
        setFollowersCount(response.data.success.project.numberFollowers);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    const fetchOrganization = async () => {
      try {
        if (projectData.organization) {
          const response = await axios.get(
            `http://localhost:5000/api/project/organization/${projectData.organization}`
          );
          setOrganizationId(response.data.success.organization);
        }
      } catch (error) {
        console.error("Error fetching organization data:", error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        // Filter posts related to the project
        const postsRelatedToProject = response.data.filter(
          (post) => post.project === id
        );
        // Set the number of posts related to the project
        setPosts(postsRelatedToProject.length);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    const fetchFeedbacks = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/feedback/project/${id}`
        );
        setFeedbacks(response.data.success.feedback); // Update to set feedbacks from response
        setFeedbackCount(response.data.success.feedback.length);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchData();
    fetchPosts();
    fetchOrganization();
    if (projectData._id) {
      // Add condition to ensure projectData._id is available
      fetchFeedbacks(projectData._id);
    }

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

    onPageScroll();
  }, [id, projectData.organization]);
  const calculateStatistics = () => {
    const statistics = {
      totalRatings: feedbacks.length,
      ratings: [0, 0, 0, 0, 0], // Initialize array for star ratings count
    };

    // Count ratings
    feedbacks.forEach((feedback) => {
      statistics.ratings[feedback.rating - 1]++;
    });

    // Calculate percentages
    statistics.percentages = statistics.ratings.map(
      (count) => (count / statistics.totalRatings) * 100
    );

    return statistics;
  };

  const statistics = calculateStatistics();

  const handleFollow = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/project/${projectData?._id}/follow`,
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
        `http://localhost:5000/api/project/${projectData?._id}/unfollow`,
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


  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const handleDeleteProject = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/project/${id}`);
      setShowConfirmationModal(false);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const downloadFile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/project/download/${projectData._id}`,
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

  const handleUpdateProject = async () => {
    try {
      await axios.put(`http://localhost:5000/api/project/updateProject/${id}`, projectData);
      handleCloseUpdateModal();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
    <Layout selectedName={selectedName}>
      <div className="contentUser">
        <div className="container-fluid mb-5">
          <div className="row pl-10 mb-10">
          <Title
                      title={"Project Details"}
                      fontWeight={600}
                      fontSize={"24px"}
                      className="mb-4"
                    />
          </div>
          <div className="row   g-2">
            <div className="card px-3 col-12 col-md-3"   >
              <Row className="d-flex  justify-content-center mt-5 mb-3">
                <div
                  className="icon"
                  style={{
                    background:
                      "linear-gradient(-45deg, rgb(25, 144, 170) 0%, rgb(138, 194, 187) 100%)",
                    borderRadius: "50%",
                    width: "100px",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ color: "white" }}>
                    <FaDatabase />
                  </span>
                </div>
              </Row>
              <Row>
                <div className="text-center">
                  <h4>{projectData.name}</h4>
                  <p style={{ color: "gray" }}>{organizationId.name}</p>
                </div>
              </Row>
              <Row className="text-center">
                <Col md={4} className="mt-2">
                  <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    {followersCount}
                  </p>
                  <p
                    style={{ fontSize: "14px", color: "gray", marginTop: "0" }}
                  >
                    Followers
                  </p>
                </Col>
                <Col md={4} className="mt-2">
                  <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    {posts}
                  </p>
                  <p
                    style={{ fontSize: "14px", color: "gray", marginTop: "0" }}
                  >
                    Posts
                  </p>
                </Col>
                <Col md={4} className="mt-2">
                  <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    {feedbackCount}
                  </p>
                  <p
                    style={{ fontSize: "14px", color: "gray", marginTop: "0" }}
                  >
                    Reviews
                  </p>
                </Col>
              </Row>
              <hr />
              <Row>
                <div className="mb-6">
                  <h4 className="mb-3">User reviews</h4>
                  <span className="font-14">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <i
                        key={index}
                        className={`fas fa-star ${
                          index <
                          Math.floor(statistics.percentages[4 - index] / 20)
                            ? "fas fa-star text-warning"
                            : "far fa-star text-warning"
                        }`}
                      ></i>
                    ))}
                  </span>
                  <span className="h5">{statistics.totalRatings} out of 5</span>
                  <p className="font-14">
                    {statistics.totalRatings} user ratings
                  </p>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div className="row align-items-center mb-1" key={index}>
                      <div className="col-md-1 col-1 pr-0">
                        <div className="font-12 text-dark">{5 - index}</div>
                      </div>
                      <div className="col-md-9 col-9 pr-2">
                        <div className="progress" style={{ height: "8px" }}>
                          <div
                            className="progress-bar bg-warning"
                            role="progressbar"
                            style={{
                              width: `${statistics.percentages[4 - index]}%`,
                            }}
                            aria-valuenow={statistics.percentages[4 - index]}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                      <div className="col-md-2 col-2">
                        <div className="font-12 text-primary">
                          {isNaN(Math.round(statistics.percentages[4 - index]))
                            ? "0%"
                            : `${Math.round(
                                statistics.percentages[4 - index]
                              )}%`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Row>
            </div>
            <div className="card col-12 col-md-9"  >
              <nav className="navbar navbar-expand-lg d-flex justify-content-between">
                {" "}
                <ul className="navbar-nav">
                  {" "}
                  <li className="nav-item">
                    {" "}
                    <a
                      className="nav-link"
                      href="#details"
                      onClick={() => {
                        setShowDetails(true);
                        setShowFeedback(false);
                        setShowPosts(false);
                      }}
                    >
                      Details
                    </a>{" "}
                  </li>{" "}
                  <li className="nav-item">
                    {" "}
                    <a
                      className="nav-link"
                      href="#posts"
                      onClick={() => {
                        setShowDetails(false);
                        setShowFeedback(false);
                        setShowPosts(true);
                      }}
                    >
                      Posts
                    </a>{" "}
                  </li>{" "}
                  <li className="nav-item">
                    {" "}
                    <a
                      className="nav-link"
                      href="#feedback"
                      onClick={() => {
                        setShowFeedback(true);
                        setShowDetails(false);
                        setShowPosts(false);
                      }}
                    >
                      {" "}
                      {/* Update onClick to show feedback */}
                      Feedback
                    </a>{" "}
                  </li>{" "}
                  {projectData.creator === user._id &&( <li className="nav-item">
                    {" "}
                    <a
                      className="nav-link"
                      href="#Questionnaire"
                      onClick={() => {
                        setShowFeedback(false);
                        setShowDetails(false);
                        setShowPosts(false);
                      }}
                    >
                      {" "}
                      {/* Update onClick to show feedback */}
                      Questionnaire Details
                    </a>{" "}
                  </li>
                  )}
                </ul>
                {!location.pathname.search("consultProject")  &&(following   ? (
                  <IconButton
                    className="border-0 w-100"
                    style={{
                      background:
                        "linear-gradient(-45deg, #ff7e5f 0%, #feb47b 100%)",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: 600,
                      padding: "8px 16px",
                      borderRadius: "20px",
                    }}
                    onClick={handleUnfollow}
                  >
                    Unfollow
                  </IconButton>
                ) : (
                  <IconButton
                    className="border-0 w-100"
                    style={{
                      background:
                        "linear-gradient(-45deg, #1990aa 0%, #8ac2bb 100%)",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: 600,
                      padding: "8px 16px",
                      borderRadius: "20px",
                    }}
                    onClick={handleFollow}
                  >
                    Follow
                  </IconButton>
                ))}
              </nav>
              {/* Conditionally render Details, Posts, or Feedback component based on state */}
              {showDetails ? (
                <Details
                  projectData={projectData}
                  organization={organizationId}
                  setProjectData={setProjectData}
                />
              ) : showPosts ? (
                <Feed inproject={true} projectId={id} />
              ) : showFeedback ? (
                <Feedback projectId={projectData} />
              ) : (
                <Questionnaire formId={projectData.form}/>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={scrollToTop}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>

      {/* Update Project Modal */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formProjectName">
              <Form.Label>Project Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter project name" 
                value={projectData.name || ''} 
                onChange={(e) => setProjectData({ ...projectData, name: e.target.value })} 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProjectDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Enter project description" 
                value={projectData.description || ''} 
                onChange={(e) => setProjectData({ ...projectData, description: e.target.value })} 
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProjectFile">
              <Form.Label>Upload Excel File</Form.Label>
              <Form.Control 
                type="file" 
                onChange={(e) => handleFileChange(e.target.files[0])} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateProject}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this project?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteProject}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default ConsultProject;
