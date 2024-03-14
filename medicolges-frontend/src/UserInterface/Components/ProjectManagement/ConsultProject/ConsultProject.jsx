import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { FaDatabase } from "react-icons/fa";
import IconButton from "../../../../components/Button/IconButton";
import Details from "./Details";
import CreatePost from "../../Post/CreatePost";
import Feedback from "./Feedback";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ConsultProject({ onFollow }) {
  const [selectedName, setSelectedName] = useState("Consult Project");
  const [projectData, setProjectData] = useState({});
  const [organizationId, setOrganizationId] = useState({});
  const [posts, setPosts] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [showDetails, setShowDetails] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false); // State for showing Feedback component
  const { id } = useParams();
  const [goUp, setGoUp] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/project/${id}`
        );
        setProjectData(response.data.success.project);
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
        setPosts(response.data.length);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
    fetchPosts();
    fetchOrganization();
    
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

  const handleFollow = async () => {
    try {
      setIsFollowing(true);
      setFollowersCount((prevCount) => prevCount + 1);
      const response = await axios.post(
        `http://localhost:5000/api/project/${projectData._id}/follow`,
        {
          userId: "65ee427a26afa5d7eaddcc67",
        }
      );
      onFollow(projectData);
    } catch (error) {
      console.error("Error following project:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      setIsFollowing(false);
      setFollowersCount((prevCount) => prevCount - 1);
      const response = await axios.delete(
        `http://localhost:5000/api/project/${projectData._id}/unfollow`,
        {
          userId: "65ee427a26afa5d7eaddcc67",
        }
      );
      onFollow(projectData);
    } catch (error) {
      console.error("Error unfollowing project:", error);
    }
  };

  return (
    <div className="home-section">
      <Navbar />
      <div className="contentUser">
        <div className="container-fluid mt20 mb-5">
          <div className="row pl-10 mb-10">
            <h3 className="info-title pt-20">
              <span>"{projectData.name}" Project Details:</span>
            </h3>
          </div>
          <div className="row pb-24 px-10">
            <Col md={3} xs={12}>
              <Row className="d-flex justify-content-center mt-5 mb-3">
                <div
                  className="icon"
                  style={{
                    background: "linear-gradient(-45deg, #3615e7, #44a2f6)",
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
                <Col md={6} className="mt-2">
                  <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    {followersCount}
                  </p>
                  <p
                    style={{ fontSize: "14px", color: "gray", marginTop: "0" }}
                  >
                    Followers
                  </p>
                </Col>
                <Col md={6} className="mt-2">
                  <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    {posts}
                  </p>
                  <p
                    style={{ fontSize: "14px", color: "gray", marginTop: "0" }}
                  >
                    Posts
                  </p>
                </Col>
              </Row>
              <hr />
              <Row>
              </Row>
            </Col>
            <Col md={9} xs={12}>
              <nav className="navbar navbar-expand-lg d-flex justify-content-between">
                {" "}
                <ul className="navbar-nav">
                  {" "}
                  <li className="nav-item">
                    {" "}
                    <a className="nav-link" href="#details" onClick={() => {setShowDetails(true); setShowFeedback(false)}}>
                      Details
                    </a>{" "}
                  </li>{" "}
                  <li className="nav-item">
                    {" "}
                    <a className="nav-link" href="#posts" onClick={() => {setShowDetails(false);setShowFeedback(false)}}>
                      Posts
                    </a>{" "}
                  </li>{" "}
                  <li className="nav-item">
                    {" "}
                    <a className="nav-link" href="#feedback" onClick={() => {setShowFeedback(true); setShowDetails(false)}}> {/* Update onClick to show feedback */}
                      Feedback
                    </a>{" "}
                  </li>{" "}
                </ul>
                {isFollowing ? (
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
                        "linear-gradient(-45deg, #3615e7 0%, #44a2f6 100%)",
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
                )}
              </nav>
              {/* Conditionally render Details, Posts, or Feedback component based on state */}
              {showDetails ? (
                <Details projectData={projectData} organization={organizationId} />
              ) : showFeedback ? (
                <Feedback /> // Show Feedback component
              ) : (
                <CreatePost />
              )}
            </Col>
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
